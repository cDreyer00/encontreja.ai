import OpenAI from "openai"

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
})

export async function GET() {

   const result = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
         {
            role: 'user',
            content: [
               {
                  type: 'image_url',
                  image_url: { url: 'https://i.ibb.co/MsHhydY/image.png' }
               },
               {
                  type: 'text',
                  text: 'create a code for nextjs with tailwindcss that matches the design sent in the image above'
               }
            ]
         }
      ]
   })

   const res = result.choices[0].message.content;
   return new Response(res)
}

export async function POST() {
   return new Response('Hello World!')
}