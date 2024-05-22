import { NextRequest } from "next/server";
import { Filter, ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";

import Pet, { fixPet } from "@/models/pet";

// let submitImgUrl = "http://localhost:3000/api/image"
let submitImgUrl = "https://encontreja-ai.vercel.app/api/image"

export async function GET(req: NextRequest): Promise<Response> {
   if (!collections.temp)
      await connectToDatabase()

   const col = collections.temp;
   if (!col) {
      console.error('Error connecting to database');
      return new Response('Internal server error', { status: 500 });
   }

   let params = req.nextUrl.searchParams;

   let type = params.get('type') ?? null;
   let gender = params.get('gender') ?? null;

   let breedsParam = params.get('breeds');
   let breeds: string[] = breedsParam ? breedsParam.split(',') : [];

   let colorsParam = params.get('colors');
   let colors: string[] = colorsParam ? colorsParam.split(',') : [];


   let ageParams = params.get('age');
   let age: string[] = ageParams ? ageParams.split(',') : [];

   let sizeParams = params.get('size');
   let size: string[] = sizeParams ? sizeParams.split(',') : [];

   let collation = { locale: 'pt', strength: 2 }

   const weights = {
      breeds: 4,
      colors: 3,
      age: 2,
      sizes: 1
   };

   let matchingType = type ? { $match: { type: type } } : { $match: {} }

   let pipeline = [
      matchingType,
      {
         $addFields: {
            countBreeds: { $size: { $setIntersection: ["$breeds", breeds] } },
            countColors: { $size: { $setIntersection: ["$colors", colors] } },
            countAge: { $size: { $setIntersection: ["$age", age] } },
            // countSize: { $size: { $setIntersection: ["$size", size] } },
            nonMatchingTagsCount: {
               $size: {
                  $setDifference: ["$breeds", breeds]
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
                  // { $multiply: ["$countSize", weights.sizes] },
               ]
            }
         }
      },
      {
         $sort: {
            // matchingTypes: -1,
            // countColors: -1,
            // matchingGender: -1,
            // countAge: -1,
            // nonMatchingTagsCount: 1,
            // hasMuttTag: 1,
            // countBreeds: -1,
            // // countSize: -1,
            combinedScore: -1
         }
      },
   ]


   const pets = await collections.pets?.aggregate(pipeline, { collation }).toArray()
   return new Response(JSON.stringify(pets), { status: 200 });

   // let params = req.nextUrl.searchParams;
   // try {
   //    const filter = getPetFilterFromParams(params);
   //    const amount: number = params.has('amount') ? parseInt(params.get('amount') as string) : 0;
   //    const result = await searchPets(filter, amount);
   //    console.log(result);
   //    return new Response(JSON.stringify(result), { status: 200 });
   // }
   // catch (error) {
   //    console.error(error);
   //    return new Response("An error occurred", { status: 500 });
   // }
}

export async function POST(req: NextRequest): Promise<Response> {
   try {
      const data = await req.json();
      const isArray = Array.isArray(data);

      let updateUrl = data.updateUrl

      if (isArray) {
         const pets = data as Pet[];
         pets.forEach((p) => {
            if (p.imgUrl === undefined)
               throw new Error('Missing imgUrl in one or more pets');
         });
         pets.forEach((p) => p = fixPet(p));
         await insertManyPets(pets, updateUrl);
         return new Response(JSON.stringify(pets), { status: 201 });
      }

      if (data.imgUrl === undefined)
         throw new Error('Missing imgUrl in pet');

      let pet = fixPet(data);
      await insertOnePet(pet, updateUrl);
      return new Response(JSON.stringify(pet), { status: 201 });
   } catch (error) {
      console.error(error);
      return new Response("An error occurred: " + error, { status: 500 });
   }
}

export async function DELETE(req: NextRequest): Promise<Response> {
   return new Response("Not implemented", { status: 501 });
}

async function insertOnePet(pet: Pet, updateImg: boolean = true): Promise<void> {
   if (!collections.temp)
      await connectToDatabase();

   if (updateImg)
      pet = await updatePetImage(pet);

   await collections.temp?.insertOne(pet);
}

async function insertManyPets(pets: Pet[], updateImg: boolean = true): Promise<void> {
   if (!collections.temp)
      await connectToDatabase();

   if (!updateImg) {
      for (let pet of pets) {
         pet = await updatePetImage(pet);
      }
   }

   await collections.temp?.insertMany(pets);
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