import OpenAI from "openai"
import { getImageUrlFromDrive } from "@/services/googleapi"
import Pet from "@/models/pet"
import { connectToDatabase, collections } from "@/services/db"
import { NextRequest } from "next/server"
import { Filter, AggregationCursor } from "mongodb"

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
})

export async function GET(req: NextRequest) {
   await connectToDatabase()

   const col = collections.pets;
   if (!col) return new Response('No collection found', { status: 500 });

   let params = req.nextUrl.searchParams;

   let type = params.get('type');
   let gender = params.get('gender');

   let breedsParam = params.get('breeds');
   let breeds: string[] = breedsParam ? breedsParam.split(',') : [];

   let colorsParam = params.get('colors');
   let colors: string[] = colorsParam ? colorsParam.split(',') : [];


   let ageParams = params.get('age');
   let age: string[] = ageParams ? ageParams.split(',') : [];

   let sizeParams = params.get('size');
   let size: string[] = sizeParams ? sizeParams.split(',') : [];

   let collation = { locale: 'pt', strength: 2 }

   console.log(breeds)
   console.log(colors)
   console.log(age)
   console.log(size)

   const weights = {
      breeds: 4,
      colors: 3,
      age: 2,
      sizes: 1
   };

   let pipeline = [
      {
         $addFields: {
            countBreeds: { $size: { $setIntersection: ["$breeds", breeds] } },
            countColors: { $size: { $setIntersection: ["$colors", colors] } },
            countAge: { $size: { $setIntersection: ["$age", age] } },
            matchingType: { $eq: ["$type", type] },
            matchingGender: { $eq: ["$gender", gender] },
            // countSize: { $size: { $setIntersection: ["$size", size] } },
            nonMatchingTagsCount: {
               $size: {
                  $setDifference: ["$breeds", breeds]
               }
            },
            hasMuttTag: {
               $cond: {
                  if: { $in: ["Sem raça definida", "$breeds"] },
                  then: 1,
                  else: 0
               }
            },
         }
      },
      {
         $addFields: {
            combinedScore: {
               $add: [
                  { $multiply: ["$countBreeds", weights.breeds] },
                  { $multiply: ["$countColors", weights.colors] },
                  { $multiply: ["$countAge", weights.age] },
                  // { $multiply: ["$countSize", weights.sizes] },
               ]
            }
         }
      },
      {
         $sort: {
            // matchingTypes: -1,
            // countColors: -1,
            // matchingGender: -1,
            // countAge: -1,
            // nonMatchingTagsCount: 1,
            // hasMuttTag: 1,
            // countBreeds: -1,
            // // countSize: -1,
            combinedScore: -1
         }
      },
   ]


   const pets = await collections.pets?.aggregate(pipeline, { collation }).toArray()
   return new Response(JSON.stringify(pets))
}

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