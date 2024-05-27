import { NextRequest } from "next/server";

import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY


const imageUrlRegex = new RegExp('^https?://.*\.(jpg|jpeg|png)$');

const prompt = `
   - Você é um assistente classificador, seu objectivo é receber imagens de pets e extrair informações para ajudar seus donos a encontra-los.
   - Ao receber a imagem, voce deve extrair informações como qual é o tipo do pet, raça, cores, idade aparente e observações adicionais relevantes.
   - Para facilitar a comunicação, você deve responder com um objeto JSON contendo as informações extraídas de forma simplificada, priorizando usar palavras únicas ao invés de frases.
   - raça, cor e idade podem ter mais de uma opção, nesse caso, você deve retornar um array com as opções.
   - raças mistas devem conter "sem raça definida" como uma das opções e junto a raça original que o animal se assemelha, qualquer caracteristica de outra raça em um pet de raça mista, mesmo que pouca, essa raça deve ser mencionada.
   - conter o genero, caso seja impossivel identificar pela imagem, retornar 'incerto'.
   - nas observações deve ser descrito somente caracteristicas fisicas do animal, como manchas, cicatrizes, coleiras, etc. *NÃO DESCREVER* cenário ou situação da imagem como a posição do animal, ou o ambiente em que ele se encontra.
   - *NÃO DEVEO* ser descrito vestimentas ou acessórios que o animal esteja usando, apenas caracteristicas fisicas do proprio animal.
   - resposta lower case, ou seja, TUDO MINUSCULO.
   - por questões de garantia, procure responser com mais de um tipo para as categorias, por exemplo, se o pet parecer idoso, marque tanto o 'idoso' quanto 'adulto' como opções de idade.

   type -> string;
   breeds -> string[];
   colors -> string[];
   age -> string[];
   size -> string[];
   gender -> string;
   observations -> string;
   
   exemplo de resposta:
   {
      "type": "cachorro",
      "breeds": ["sem raça definida", "labrador"]
      "colors": ["preto", "branco"],
      "age": ["filhote"],
      "size": ["pequeno", "médio"],
      "gender": "incerto",
      "observations": "pelo predominantemente preto com manchas branchas no queixo, peito e patas. Olhos castanhos e orelhas caidas."
   }


   informações de cores, idade e raças:
   dogBreeds = [
      'sem raça definida',
      'beagle',
      'border collie',
      'boxer',
      'bulldog francês',
      'bulldog inglês',
      'cavalier king',
      'chihuahua',
      'cocker spaniel',
      'doberman',
      'golden retriever',
      'husky siberiano',
      'labrador retriever',
      'Lhasa Apso',
      'maltese',
      'pastor alemão',
      'pinscher',
      'pit bull',
      'poodle',
      'pug',
      'rottweiler',
      'salsicha (dachshund)',
      'shih tzu',
      'yorkshire',
      'chow chow',
      'jack russel',
      'poodle',
      'cavalier king',
      'pointer',
      'fox terrier',
      'collie',
      'ovelheiro',
      'schnauzer',
      'sheepdog',
      'pastor belga',
      'blue heeler',
      'dálmata',
      'fila'
   ]
    catBreeds = [
      'sem raça definida',
      'azul russo',
      'bengal',
      'british shorthair',
      'gato da floresta norueguesa',
      'mau egípcio',
      'maine coon',
      'persa',
      'ragdoll',
      'scottish fold',
      'siamês',
      'sphynx',
      'abissínio',
      'pelo curto brasileiro'
   ]
   
    colors = [
      'marrom',
      'caramelo',
      'branco',
      'preto',
      'marrom claro',
      'marrom escuro',
      'marrom avermelhado',
      'vermelho',
      'cinza',
      'vermelho claro',
      'cinza escuro',
      'cinza claro',
      'amarelo',
      'bege',
      'laranja',
      'rajado',
   ]

    ages = [
      'incerto',
      'filhote',
      'adulto',
      'idoso',
   ]
    sizes = [
      'incerto',
      'mini',
      'pequeno',
      'médio',
      'grande',
      'gigante',
   ]
    genders = [
      'incerto',
      'macho',
      'fêmea',
   ]
`

export async function GET(req: NextRequest) {
   let image = req.nextUrl.searchParams.get('img') as string;
   image = decodeURIComponent(image);
   if (!image) {
      return new Response('Missing image URL', { status: 400 });
   }

   const openai = new OpenAI({
      apiKey
   })

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

