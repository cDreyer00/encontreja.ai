import { NextRequest } from "next/server";
import { Filter, ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";
import Pet from "@/models/pet";

export async function GET(req: NextRequest): Promise<Response> {
   let params = req.nextUrl.searchParams;
   try {
      const filter = getPetFilterFromParams(params);
      const amount: number = params.has('amount') ? parseInt(params.get('amount') as string) : 0;
      const result = await searchPets(filter, amount);
      console.log(result);
      return new Response(JSON.stringify(result), { status: 200 });
   }
   catch (error) {
      console.error(error);
      return new Response("An error occurred", { status: 500 });
   }
}

export async function POST(req: NextRequest): Promise<Response> {
   try {
      const data = await req.json();
      const isArray = Array.isArray(data);

      if (isArray) {
         const pets = data as Pet[];
         await insertManyPets(pets);
         return new Response(JSON.stringify(pets), { status: 201 });
      }

      const pet = data as Pet;
      await insertOnePet(pet);
      return new Response(JSON.stringify(pet), { status: 201 });
   } catch (error) {
      console.error(error);
      return new Response("An error occurred", { status: 500 });
   }
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