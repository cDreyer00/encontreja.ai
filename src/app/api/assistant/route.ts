import { NextRequest } from "next/server";

import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({
   apiKey
})

const imageUrlRegex = new RegExp('^https?://.*\.(jpg|jpeg|png)$');

const prompt = `
   Você é um assistente classificador, seu objectivo é receber imagens de pets e extrair informações para ajudar seus donos a encontra-los.
   Ao receber a imagem, voce deve extrair informações como qual é o tipo do pet, raça, cores, idade aparente e observações adicionais relevantes.
   Para facilitar a comunicação, você deve responder com um objeto JSON contendo as informações extraídas de forma simplificada, priorizando usar palavras únicas ao invés de frases.
   raça, cor e idade podem ter mais de uma opção, nesse caso, você deve retornar um array com as opções.
   raças mistas devem conter "vira-lata" como uma das opções e junto a raça original que o animal se assemelha.
   
   exemplo de resposta:
   {
      "pet": "cachorro",
      "raca": ["vira-lata", "labrador"]
      "cores": ["preto", "branco"],
      "idade": "jovem",
      "observacoes": "coleira marrom, mancha branca no peito"
   }
`


export async function ExtractPetInfos(imageUrl: string): Promise<string> {
   if (!imageUrlRegex.test(imageUrl)) {
      return 'Invalid image URL'
   }

   const result = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
         {
            role: 'assistant',
            content: prompt
         },
         {
            role: 'user',
            content: [
               {
                  type: 'image_url',
                  image_url: { url: imageUrl }
               },
            ]
         }
      ]
   })

   const res = result.choices[0].message.content
   if (!res) return 'No response from the AI model';
   return res;
}

export async function GET(req: NextRequest) {
   const image = req.nextUrl.searchParams.get('image');
   if (!image) {
      return new Response('Missing image URL', { status: 400 });
   }

   const infos = await ExtractPetInfos(image);
   return new Response(infos);
}