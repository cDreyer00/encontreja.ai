import OpenAI from "openai"
import { getImageUrlFromDrive } from "@/services/googleapi"
import Pet from "@/models/pet"
import { connectToDatabase, collections } from "@/services/db"
import { NextRequest } from "next/server"

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
})

export async function GET(req: NextRequest) {
   // if(!param) return new Response('No param')

   // const param = req.nextUrl.searchParams.get('q');
   // let params = param.split('%')
   // console.log(params)

   // const result = await openai.chat.completions.create({
   //    model: 'gpt-4-vision-preview',
   //    messages: [
   //       {
   //          role: 'user',
   //          content: [
   //             {
   //                type: 'image_url',
   //                image_url: { url: 'https://i.ibb.co/MsHhydY/image.png' }
   //             },
   //             {
   //                type: 'text',
   //                text: 'create a code for nextjs with tailwindcss that matches the design sent in the image above'
   //             }
   //          ]
   //       }
   //    ]
   // })

   // const res = result.choices[0].message.content;
   // return new Response(res)
   return new Response('aa')
}

export async function POST() {
   return new Response('Hello World!')
}