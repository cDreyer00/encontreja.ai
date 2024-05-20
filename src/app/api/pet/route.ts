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

      const date = new Date();

      if (isArray) {
         const pets = data as Pet[];
         pets.forEach(pet => pet.createdAt = date);
         await insertManyPets(pets);
         return new Response(JSON.stringify(pets), { status: 201 });
      }

      const pet = data as Pet;
      pet.createdAt = date;
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

async function searchPets(filter: Filter<Pet>, amount: number = 0): Promise<Pet[]> {
   if (!collections.pets)
      await connectToDatabase();

   if (amount < 0)
      return await collections.pets!.find(filter).collation({ strength: 2, locale: 'pt' }).toArray();
   else
      return await collections.pets!.find(filter).collation({ strength: 2, locale: 'pt' }).limit(amount).toArray();
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

function getPetFilter(pet: Pet): Filter<Pet> {
   const cleanFilter = Object.entries(pet).reduce((acc: Filter<Pet>, [key, value]) => {
      if (typeof value === 'string') {
         acc[key] = { $regex: new RegExp(value, 'i') }; // Busca de texto aproximada (case-insensitive)
      } else {
         acc[key] = { $in: value }; // Multi seleção
      }
      return acc;
   }, {} as Pet);

   // Remover campos vazios do filtro
   Object.keys(cleanFilter).forEach((key) => (cleanFilter[key as keyof Pet] == undefined) && delete cleanFilter[key as keyof Pet]);

   return cleanFilter;
}

function getPetFilterFromParams(params: URLSearchParams): Filter<Pet> {
   const pet = {} as Pet;
   if (params.has('type')) {
      pet.type = params.get('type') as string;
   }

   if (params.has('size')) {
      pet.size = params.getAll('size');
   }

   if (params.has('age')) {
      pet.age = params.getAll('age');
   }

   if (params.has('breeds')) {
      pet.breeds = params.getAll('breeds');
   }
   if (params.has('colors')) {
      pet.colors = params.getAll('colors');
   }

   if (params.has('location')) {
      pet.location = params.get('location') as string;
   }

   if (params.has('observations')) {
      pet.observations = params.get('observations') as string;
   }

   const petFilter = getPetFilter(pet);
   return petFilter;
}