import { NextRequest } from "next/server";
import { IParams } from "../pet/route";
const baseUrl = 'https://encontreja-ai.vercel.app/api/'

// const baseUrl = 'http://localhost:3000/api/'
export const maxDuration = 30;

interface IMainParams extends IParams {
   [key: string]: string | undefined;

   img?: string;
   pageSize?: string;
   pageNumber?: string;
}

export async function GET(req: NextRequest) {
   let params = exportParams(req.nextUrl.searchParams);
   let { img, pageSize, pageNumber } = params;
   let decodedImage = decodeURIComponent(img as string)
   
   console.log(`decodedImage: ${decodedImage}`)
   
   const aiUrl = `${baseUrl}analisar?img=${decodedImage}`
   const response = await fetch(aiUrl)
   const pet = await response.json()
   
   console.log(`pet from ai: ${JSON.stringify(pet)}`)
   
   const query = queryString({ type: pet.type, age: pet.age, breeds: pet.breeds, colors: pet.colors, size: pet.size, pageSize, pageNumber })
   
   console.log(`query: ${query}`)
   
   const petsUrl = `${baseUrl}/pet?${query}`

   console.log('======================')
   console.log(`petsUrl: ${petsUrl}`)
   console.log('======================')

   const petsResponse = await fetch(petsUrl)
   const pets = await petsResponse.json()
   let res = {
      query: pet,
      pets: pets
   }
   return new Response(JSON.stringify(res), { status: 200 });
};

function exportParams(params: URLSearchParams): IMainParams {
   let obj: IMainParams = {};

   params.forEach((value, key) => {
      obj[key] = value;
   });

   return obj;
}

const queryString = (params: Object) => Object.entries(params)
   .map(([key, value]) => {
      if(!value) return undefined;
      if (Array.isArray(value)) {
         return `${key}=${value.join(',')}`
      }
      return `${key}=${value}`;
   })
   .join('&');