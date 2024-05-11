import OpenAI from "openai"

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
})

// export async function GET() {

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
// }

export async function GET() {
   await submitImageToImgbb()
   return new Response('Hello World!')
}

export async function POST() {
   return new Response('Hello World!')
}

async function submitImageToImgbb() {
   const apiKey = '187ff376e1ea89f898c252a97fe5648a';
   const apiUrl = 'https://api.imgbb.com/1/upload';

   const img = `https://drive.google.com/file/d/1KeJErH_sZjiX-ZcLeZ6cppAm1sl4rtiI/view`

   const formData = new FormData();
   formData.append('image', img);
   formData.append('key', apiKey);

   try {
      const response = await fetch(apiUrl, {
         method: 'POST',
         body: formData,
      });

      if (!response.ok) {
         throw new Error('Failed to upload image');
      }

      const jsonResponse = await response.json();
      return jsonResponse.data.url;
   } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
   }
}