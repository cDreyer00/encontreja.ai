import { NextRequest } from "next/server";
import { Filter, ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";
import Pet from "@/models/pet";

export async function GET(req: NextRequest): Promise<Response> {
   try {
      await connectToDatabase();

      const params = req.nextUrl.searchParams

      const petInfosFilter = {
         type: params.getAll('type'),
         breeds: params.getAll('breeds'),
         colors: params.getAll('colors'),
         ages: params.getAll('ages'),
      };

      const filterPredicate: Filter<Pet> = {
         type: { $not: { $in: ['gato'] } },
      };

      var result = await collections.pets?.find(filterPredicate).toArray();
      return new Response(JSON.stringify(result));
   }
   catch (error) {
      console.error(error);
      return new Response("An error occurred", { status: 500 });
   }
}

export async function POST(req: NextRequest): Promise<Response> {
   // const pet = new Pet('gato', 'indefinido', ['adulto', 'idoso'], ['indefinido', 'siames'], '4', 'http');
   const data = await req.json();
   const pet: Pet = data.pet
   
   console.log("backend");
   console.log(pet);
   await connectToDatabase();

   // await collections.pets?.deleteMany();
   await collections.pets?.insertOne(pet);

   return new Response('ok');
}