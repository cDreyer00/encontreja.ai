import { NextRequest } from "next/server";
import { ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";
import Pet from "@/models/pet";

export async function GET(req: NextRequest): Promise<Response> {
   try {
      await connectToDatabase();
      const filterPredicate: StrictFilter<Pet> = { _id: new ObjectId("663d783b4a65f784cafec98a") };
      var result = await collections.pets?.find().toArray();
      console.log(result);
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
   
   console.log(pet);

   await collections.pets?.insertOne(pet);

   return new Response('ok');
}