import { NextRequest } from "next/server";
const baseUrl = 'https://encontreja-ai.vercel.app/api/'
// const baseUrl = 'http://localhost:3000/api/'

export async function GET(req: NextRequest) {
   const image = req.nextUrl.searchParams.get('img');
   let decodedImage = decodeURIComponent(image as string)
   
   console.log(`decodedImage: ${decodedImage}`)
   
   const aiUrl = `${baseUrl}analisar?img=${decodedImage}`
   const response = await fetch(aiUrl)
   const pet = await response.json()
   
   console.log(`pet from ai: ${JSON.stringify(pet)}`)
   
   const query = queryString({ type: pet.type, age: pet.age, breeds: pet.breeds, colors: pet.colors }) as string
   
   console.log(`query: ${query}`)
   
   const petsUrl = `${baseUrl}/pet?${query}`

   console.log('======================')
   console.log(`petsUrl: ${petsUrl}`)
   console.log('======================')

   const petsResponse = await fetch(petsUrl)
   const pets = await petsResponse.json()
   let res = {
      filter: pet,
      pets: pets
   }
   return new Response(JSON.stringify(res), { status: 200 });
};

const queryString = (params: Object) => Object.entries(params)
   .map(([key, value]) => {
      if (Array.isArray(value)) {
         return `${key}=${value.join(',')}`
      }
      return `${key}=${value}`;
   })
   .join('&');