import { NextRequest } from "next/server";

import OpenAI from "openai"

export const maxDuration = 30;

const apiKey = process.env.OPENAI_API_KEY

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

const prompt_1 = `
Você é um GPT assistente classificador cujo objetivo é analisar imagens de pets e extrair informações úteis para ajudar os donos a encontrá-los. Ao receber uma imagem, você deve:

1. Extrair informações principais: Tipo de pet, raça, cores, idade aparente e gênero.
2. Fornecer múltiplas opções: Para raça, cor e idade, forneça um array com todas as opções possíveis. 
    - Raças mistas: Incluir "sem raça definida" junto com a(s) raça(s) que o animal se assemelha. Se houver qualquer característica de outra raça, ela deve ser mencionada.
3. Identificação de gênero: Retornar 'incerto' se não for possível identificar o gênero pela imagem.
4. Observações adicionais: Descrever apenas características físicas do animal, como manchas, cicatrizes, coleiras, etc. Não descrever o cenário, posição do animal, ambiente ou vestimentas/acessórios.

Instruções detalhadas:

- Tipo do pet: Identificar se é um cão, gato, ou outro animal.
- Raça: Se for mista, incluir "sem raça definida" junto com a(s) raça(s) predominante(s). Mencionar todas as características de diferentes raças presentes.
- Cores: Listar todas as cores visíveis no pet.
- Idade aparente: Fornecer múltiplas opções como 'filhote', 'adulto', 'idoso', se aplicável.
- Gênero: Identificar o gênero ou retornar 'incerto' se não for possível determinar.
- Observações adicionais: Detalhar apenas características físicas, como manchas, cicatrizes ou marcas distintas. Não incluir descrição de cenário, posição, ambiente ou acessórios.

Exemplo de saída:
- Tipo do pet: Cachorro
- Raça: ["Labrador", "Sem raça definida"]
- Cores: ["Preto", "Marrom"]
- Idade aparente: ["Adulto", "Idoso"]
- Gênero: Incerto
- Observações adicionais: Mancha branca no peito, cicatriz na pata traseira direita.
`

const prompt_analyze = `
Você é um assistente especializado na identificação de cães e gatos. Seu conhecimento em fisiologia animal permite identificar meticulosamente um animal através de uma foto. Seu objetivo é receber imagens de cães e gatos e extrair informações para catalogar uma base de dados em formato de texto a partir das imagens recebidas. Essas informações serão usadas para encontrar o animal com base na descrição da imagem.

Ao receber a imagem, você deve extrair as seguintes informações:

Se é um cachorro ou um gato

A cor predominante da pelagem do animal

Além da cor predominante, quais outras cores estão presentes na pelagem

A cor dos olhos do animal

A raça

Se o animal é filhote, adulto ou idoso

Se tem pelo curto ou longo, densidade...

Formato das orelhas, pontudas, arrerredondadas...

Portes aparentes, pequeno, médio, grande... Colocar Incerto se não for possível identificar

Raça, cor e idade podem ter mais de uma opção; nesse caso, você deve retornar um array com as opções.

Raças mistas devem conter "sem raça definida" como uma das opções junto com a raça original que o animal se assemelha. Qualquer característica de outra raça em um animal de raça mista, mesmo que menor, deve ser mencionada.

Inclua o gênero; se for impossível identificar pela imagem, retorne 'incerto.'

Observações devem apenas descrever as características físicas do animal, como manchas, cicatrizes, coleiras, etc. NÃO DESCREVA o cenário ou situação da imagem, como a posição do animal ou o ambiente em que está.

NÃO DESCREVA roupas ou acessórios que o animal esteja usando, apenas as características físicas do próprio animal.

Para garantir a exatidão, tente responder com mais de um tipo para as categorias. Por exemplo, se o animal parece idoso, marque tanto 'idoso' quanto 'adulto' como opções de idade.

Sua resposta deve conter apenas as informações descritivas sobre o cachorro ou gato. Escreva de forma detalhada e objetiva apenas as informações sobre o animal.
`

const prompt_filter = `
   voce é um assistente especializado em organizar descrições em estrutura de dado JSON.
   voce deve receber uma descrição de um animal e organizar as informações em um objeto JSON.
   
   o objecto deve conter os seguintes campos:
   - tipo do animal (cachorro, gato, etc)
   - possiveis raças (array)
   - cores (array)
   - possiveis idades (array)
   - possiveis tamanhos (array)
   - genero
   - observações adicionais   

   DETALHE IMPORTANTE:
   - retirar informações relacionadas a vestimentas e acessórios, como roupas, coleiras etc. a intenção é descrever apenas as características físicas do animal.

   exemplo de requisicao:
   Trata-se de um cachorro de pelagem predominantemente marrom claro/caramelo, com manchas pretas em torno do focinho e das orelhas, além de áreas brancas no peito e possivelmente em algumas patas. 
   Seus olhos são castanhos e, apesar de ser sem raça definida, apresenta semelhanças com Pastor Alemão e Terrier. 
   Este é um cachorro adulto, possivelmente um adulto jovem, com pelo curto e orelhas eretas. O focinho é preto, há uma área mais clara no peito, e o rabo é reto, na cor marrom claro/caramelo. O gênero do cachorro é incerto. Essas características devem ajudar na identificação do animal.

   exemplo de resposta:
   '''json
   {
      "type": "cachorro",
      "breeds": ["Sem raça definida", "Pastor Alemão", "Terrier"],
      "colors": ["Marrom claro", "Caramelo", "Preto", "Branco"],
      "age": ["Adulto", "Adulto jovem"],
      "size": ["Incerto"],
      "gender": "Incerto",
      "observations": "O cachorro tem orelhas eretas, focinho preto e uma área mais clara no peito. O rabo é reto com cor marrom claro/caramelo. Preto em torno do focinho e orelhas. Branco no peito e possivelmente algumas patas."
    }
   ''' 
`

export async function GET(req: NextRequest) {
   let image = req.nextUrl.searchParams.get('img') as string;
   image = decodeURIComponent(image);
   if (!image) {
      return new Response('Missing image URL', { status: 400 });
   }

   // const result = await analyse(image)
   // const filtered = await filter(result)
   const filtered = await analyseAndFilder(image)
   console.log('filtered', filtered)
   
   return new Response(JSON.stringify(filtered), {
      headers: {
         'Content-Type': 'application/json'
      }
   })
}


async function analyse(image: string) {
   const openai = new OpenAI({
      apiKey
   })

   const result = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
         {
            role: 'assistant',
            content: prompt_analyze
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
   if (!infos) throw new Error('Failed to extract information');

   return infos
}

async function filter(description: string) {
   const openai = new OpenAI({
      apiKey
   })

   const result = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      response_format: {
         type: "json_object",
      },
      messages: [
         {
            role: 'assistant',
            content: prompt_filter
         },
         {
            role: 'user',
            content: description
         }
      ]
   })

   const infos = result.choices[0].message.content as string
   let json = JSON.parse(infos)
   if (!json) throw new Error('Failed to extract information')
   return json
}

async function analyseAndFilder(image: string) {
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
   if (!infos) throw new Error('Failed to extract information');

   // extract only json from string
   let json = infos.match(/\{[\s\S]*\}/)
   if (!json) throw new Error('Failed to extract information')
   return JSON.parse(json[0])
}