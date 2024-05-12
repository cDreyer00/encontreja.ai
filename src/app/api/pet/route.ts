import { NextRequest } from "next/server";
import { Filter, ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";
import Pet from "@/models/pet";

export async function GET(req: NextRequest): Promise<Response> {
   try {
      await connectToDatabase();

      const params = req.nextUrl.searchParams;

      const petFilter = {} as StrictFilter<Pet>;

      if (params.has('type')) {
         petFilter.type = params.get('type') as string;
      }

      if (params.has('size')) {
         petFilter.size = params.getAll('size');
      }

      if (params.has('age')) {
         petFilter.age = params.getAll('age');
      }

      if (params.has('breed')) {
         petFilter.breeds = params.getAll('breed');
      }

      var result =
         await collections
            .pets?.find(petFilter)
            .collation({ strength: 2 , locale: 'pt'})
            .limit(30)
            .toArray();

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