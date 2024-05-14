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
   raças mistas devem conter "se raça definida" como uma das opções e junto a raça original que o animal se assemelha.
   resposta lower case, ou seja, TUDO MINUSCULO
   
   exemplo de resposta:
   {
      "type": "cachorro",
      "breeds": ["sem raça definida", "labrador"]
      "colors": ["preto", "branco"],
      "age": ["filhote"],
      "size": ["pequeno", "medio"],
      "observations": "coleira marrom, mancha branca no peito"
   }


   informações de cores, idade e raças:
   cores:[
      'Preto',
      'Branco',
      'Marrom',
      'Bege',
      'Amarelo',
      'Caramelo',
      'Cinza',
      'Rajado',
      'Laranja',
   ]

   raças: [
      'Sem raça definida',
      'Beagle',
      'Border collie',
      'Boxer',
      'Bulldog francês',
      'Bulldog inglês',
      'Cavalier king',
      'Chihuahua',
      'Cocker spaniel',
      'Doberman',
      'Golden retriever',
      'Husky siberiano',
      'Labrador retriever',
      'Lhasa',
      'Maltese',
      'Pastor alemão',
      'Pinscher',
      'Pit bull',
      'Poodle',
      'Pug',
      'Rottweiler',
      'Salsicha (Dachshund)',
      'Shih tzu',
      'Yorkshire',
   ]

   idade: [
      'Filhote',
      'Adulto',
      'Idoso',
   ]

   tamanhos: [
      'Mini',
      'Pequeno',
      'Médio',
      'Grande',
      'Gigante',
   ]
`

const prompt2 = `
   Você é um assistente classificador, seu objectivo é receber imagens de pets e extrair informações para ajudar seus donos a encontra-los.
   Ao receber a imagem, voce deve extrair informações fisicas, como a cor, raça aparente,
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

export async function GET(req: NextRequest) {
   const image = req.nextUrl.searchParams.get('img');
   if (!image) {
      return new Response('Missing image URL', { status: 400 });
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
                  image_url: { url: image }
               },
            ]
         }
      ]
   })

   const infos = result.choices[0].message.content as string
   if (!infos) return new Response(infos, { status: 400 });

   // extract only json from string
   let json = infos.match(/\{.*\}/s)
   if (!json) return new Response(infos, { status: 400 });
   console.log(json[0])
   return new Response(json[0], { status: 200 });
}

