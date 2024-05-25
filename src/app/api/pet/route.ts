import { NextRequest } from "next/server";
import { Filter, ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";

import Pet, { fixPet } from "@/models/pet";

// let submitImgUrl = "http://localhost:3000/api/image"
let submitImgUrl = "https://encontreja-ai.vercel.app/api/image"

export async function GET(req: NextRequest): Promise<Response> {
   if (!collections.pets)
      await connectToDatabase()

   const col = collections.pets;
   if (!col) {
      console.error('Error connecting to database');
      return new Response('Internal server error', { status: 500 });
   }

   let params = req.nextUrl.searchParams;
   let pet = mountPet(params);

   console.log(pet)

   let pipeline = weightsPipeline(pet);
   let collation = { locale: 'pt', strength: 2 }

   const pets = await col?.aggregate(pipeline, { collation }).toArray()
   return new Response(JSON.stringify(pets), { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
   try {
      const data = await req.json();
      const isArray = Array.isArray(data);

      if (isArray) {
         const pets = data as Pet[];
         pets.forEach((p) => {
            if (p.imgUrl === undefined)
               throw new Error('Missing imgUrl in one or more pets');
         });
         pets.forEach((p) => p = fixPet(p));
         await insertManyPets(pets);
         return new Response(JSON.stringify(pets), { status: 201 });
      }

      if (data.imgUrl === undefined)
         throw new Error('Missing imgUrl in pet');

      let pet = fixPet(data);
      await insertOnePet(pet);
      return new Response(JSON.stringify(pet), { status: 201 });
   } catch (error) {
      console.error(error);
      return new Response("An error occurred: " + error, { status: 500 });
   }
}

export async function DELETE(req: NextRequest): Promise<Response> {
   return new Response("Not implemented", { status: 501 });
}

async function insertOnePet(pet: Pet): Promise<void> {
   if (!collections.lab)
      await connectToDatabase();

   pet = await updatePetImage(pet);

   await collections.lab?.insertOne(pet);
}

async function insertManyPets(pets: Pet[]): Promise<void> {
   if (!collections.lab)
      await connectToDatabase();

   for (let pet of pets) {
      pet = await updatePetImage(pet);
   }

   await collections.lab?.insertMany(pets);
}

async function updatePetImage(pet: Pet) {
   let dogImgsDbFolderId = '15JrJPxhehgRqtF__GuHtAWGd0atJH5_EfR3pVyMHXd8-INhlMsiWujNW_r0qCdsYNzyBf_dE';
   let catImgsDbFolderId = '1mO0QHnMX8HanFElrvh3CoOv9Ey2f0PO39Y0RqQp4M_QPBpltFyFLkKuGMfpo3bF-0GBZ_QbY';

   let folder = pet.type === 'cachorro' ? dogImgsDbFolderId : catImgsDbFolderId;
   console.log(pet)
   let newImg = await fetch(submitImgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imgUrl: pet.imgUrl, folderId: folder })
   });

   if (!newImg.ok) {
      throw new Error('Failed to submit image: ' + newImg.statusText);
   }

   let imgData = await newImg.json();
   pet.imgUrl = imgData.imgUrl;

   return pet;
}

function mountPet(params: URLSearchParams): Pet {
   let pet = new Pet();

   pet.type = params.get('type') as string ?? null;
   pet.gender = params.get('gender') as string ?? null;

   let breedsParam = params.get('breeds');
   let breeds: string[] = breedsParam ? breedsParam.split(',') : [];
   pet.breeds = breeds;

   let colorsParam = params.get('colors');
   let colors: string[] = colorsParam ? colorsParam.split(',') : [];
   pet.colors = colors;

   let ageParams = params.get('age');
   let age: string[] = ageParams ? ageParams.split(',') : [];
   pet.age = age;

   let sizeParams = params.get('size');
   let size: string[] = sizeParams ? sizeParams.split(',') : [];
   pet.size = size;

   let observations = params.get('observations') as string ?? null;
   pet.observations = observations;

   return pet;
}

const weightsPipeline = (pet: Pet) => {
   const weights = {
      breeds: 4,
      colors: 3,
      age: 2,
      sizes: 1
   };

   let matchingType = pet.type ? { $match: { type: pet.type } } : { $match: {} }

   let pipeline = [
      matchingType,
      {
         $addFields: {
            countBreeds: { $size: { $setIntersection: ["$breeds", pet.breeds] } },
            countColors: { $size: { $setIntersection: ["$colors", pet.colors] } },
            countAge: { $size: { $setIntersection: ["$age", pet.age] } },
            countSize: { $size: { $setIntersection: ["$size", pet.size] } },
            nonMatchingTagsCount: {
               $size: {
                  $setDifference: ["$breeds", pet.breeds]
               }
            },
            hasMuttTag: {
               $cond: {
                  if: { $in: ["Sem raça definida", "$breeds"] },
                  then: 1,
                  else: 0
               }
            },
         }
      },
      {
         $addFields: {
            combinedScore: {
               $add: [
                  { $multiply: ["$countBreeds", weights.breeds] },
                  { $multiply: ["$countColors", weights.colors] },
                  { $multiply: ["$countAge", weights.age] },
                  { $multiply: ["$countSize", weights.sizes] },
                  { $multiply: ["$nonMatchingTagsCount", -1] },
                  { $multiply: ["$hasMuttTag", 2] },
               ]
            }
         }
      },
      {
         $sort: {

            combinedScore: -1
         }
      },
   ]

   return pipeline;
}

const labPipeline = (pet: Pet) => {
   const weights = {
      breeds: 4,
      colors: 4,
      age: 2,
      sizes: 1
   };

   let matchingType = pet.type ? { $match: { type: pet.type } } : { $match: {} }

   let pipeline = [
      matchingType,
      {
         $addFields: {
            countBreeds: { $size: { $setIntersection: ["$breeds", pet.breeds] } },
            countColors: { $size: { $setIntersection: ["$colors", pet.colors] } },
            countAge: { $size: { $setIntersection: ["$age", pet.age] } },
            countSize: { $size: { $setIntersection: ["$size", pet.size] } },
         }
      },
      {
         $addFields: {
            combinedScore: {
               $add: [
                  { $multiply: ["$countBreeds", weights.breeds] },
                  { $multiply: ["$countColors", weights.colors] },
                  { $multiply: ["$countAge", weights.age] },
                  { $multiply: ["$countSize", weights.sizes] },
               ]
            }
         }
      },
      {
         $sort: {

            combinedScore: -1
         }
      },
   ]

   return pipeline;
}