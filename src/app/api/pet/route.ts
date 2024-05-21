import { NextRequest } from "next/server";
import { Filter, ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";

import Pet from "@/models/pet";

export async function GET(req: NextRequest): Promise<Response> {
   if (!collections.pets)
      await connectToDatabase()

   const col = collections.pets;
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

   console.log('type:', type);
   console.log('breeds:', breeds);
   console.log('colors:', colors);
   console.log('age:', age);
   console.log('size:', size);


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
   return new Response(JSON.stringify(pets))

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
      console.log(`register pet: ${data}`)
      console.log(data)

      const date = new Date();

      const isStrNullOrEmpty = (str: any) => str === null || str === undefined || str === '';
      const isArr = (check: any) => Array.isArray(check);
      const fixPet = (pet: Pet) => {
         pet.createdAt = date;

         pet.breeds = validateArr(pet.breeds);
         pet.colors = validateArr(pet.colors);
         pet.age = validateArr(pet.age, 'indefinido');
         pet.size = validateArr(pet.size, 'indefinido');

         return pet;
      }

      if (isArray) {
         const pets = data as Pet[];
         pets.forEach(fixPet);
         await insertManyPets(pets);
         return new Response(JSON.stringify(pets), { status: 201 });
      }

      const pet = data as Pet;
      fixPet(pet);
      await insertOnePet(pet);
      return new Response(JSON.stringify(pet), { status: 201 });
   } catch (error) {
      console.error(error);
      return new Response("An error occurred", { status: 500 });
   }
}

export async function DELETE(req: NextRequest): Promise<Response> {
   return new Response("Not implemented", { status: 501 });
}

async function insertOnePet(pet: Pet): Promise<void> {
   if (!collections.pets)
      await connectToDatabase();

   await collections.pets?.insertOne(pet);
}

async function insertManyPets(pets: Pet[]): Promise<void> {
   if (!collections.pets)
      await connectToDatabase();

   await collections.pets?.insertMany(pets);
}

function validateArr(arr: any, defaultValueIfEmpty: string | undefined = undefined) {
   // if is array, return it
   if (Array.isArray(arr))
      return arr;

   // if is string, return it as array of single element
   if (typeof arr === 'string')
      return [arr]

   if (defaultValueIfEmpty === undefined)
      return [];

   return [defaultValueIfEmpty];
}