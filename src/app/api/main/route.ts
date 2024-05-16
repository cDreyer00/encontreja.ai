import { NextRequest } from "next/server";
const baseUrl = 'https://encontreja-ai.vercel.app/api/'

export async function GET(req: NextRequest) {
   const image = req.nextUrl.searchParams.get('img');
   const aiUrl = `${baseUrl}ai?img=${image}`
   const response = await fetch(aiUrl)
   const pet = await response.json()

   const query = queryString({ type: pet.type, age: [pet.age], breeds: pet.breeds, colors: pet.colors })
   const petsUrl = `${baseUrl}pet?${query}`
   const petsResponse = await fetch(petsUrl)
   const pets = await petsResponse.json()
   return new Response(JSON.stringify(pets), { status: 200 });
};


const queryString = (params: Object) => Object.entries(params)
   .map(([key, value]) => {
      // If the value is an array, serialize it
      if (Array.isArray(value)) {
         return value.map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
      }
      // Otherwise, encode key and value normally
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
   })
   .join('&');