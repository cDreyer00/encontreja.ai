import { NextRequest } from "next/server";
import { usersCollection } from "@/services/db";
import User, { mountUser } from "@/models/user";


export async function GET(req: NextRequest): Promise<Response> {
   let collection = await usersCollection();
   const users = await collection.find().toArray();
   return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
   let collection = await usersCollection();

   let user = await req.json()
   user = mountUser(user);

   if (!validateUser(user)) {
      return new Response("Invalid user data", { status: 400 });
   }

   await collection.insertOne(user);
   user = await collection.findOne({ _id: user._id });
   return new Response(JSON.stringify(user), { status: 201 });
}

function validateUser(user: any): boolean {
   return user && user.name && user.petId && (user.phone || user.email);
}