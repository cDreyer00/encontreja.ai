import OpenAI from "openai"
import { getImageUrlFromDrive } from "@/services/googleapi"
import Pet from "@/models/pet"
import { connectToDatabase, collections } from "@/services/db"
import { NextRequest } from "next/server"
import { Filter, AggregationCursor } from "mongodb"

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
})

// export async function GET(req: NextRequest) {
//    const result = await openai.chat.completions.create({
//       model: 'gpt-4-vision-preview',
//       messages: [
//          {
//             role: 'user',
//             content: [
//                {
//                   type: 'image_url',
//                   image_url: { url: 'https://i.ibb.co/MsHhydY/image.png' }
//                },
//                {
//                   type: 'text',
//                   text: 'create a code for nextjs with tailwindcss that matches the design sent in the image above'
//                }
//             ]
//          }
//       ]
//    })

//    const res = result.choices[0].message.content;
//    return new Response(res)
//    return new Response('aa')
// }

export async function POST() {
   return new Response('Hello World!')
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

async function searchPets(filter: Filter<Pet>, aggregation: AggregationCursor<Pet>, amount: number = 0): Promise<Pet[]> {
   if (!collections.pets)
      await connectToDatabase();

   if (amount <= 0)
      return collections.pets!.find(filter).collation({ strength: 2, locale: 'pt' }).toArray();
   else
      return await collections.pets!.find(filter).collation({ strength: 2, locale: 'pt' }).limit(amount).toArray();
}