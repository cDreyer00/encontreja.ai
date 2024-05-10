import { NextRequest } from "next/server";
import { collections, connectToDatabase } from "@/services/db";

export async function GET(req: NextRequest): Promise<Response> {
   await connectToDatabase();
   var result = collections.pets?.find({});
   return new Response(JSON.stringify(result));
}

export async function POST(req: NextRequest): Promise<Response> {
   const body = await req.json();
   return new Response(body);
}