import { NextRequest } from "next/server";
import { ObjectId, StrictFilter } from "mongodb";
import { collections, connectToDatabase } from "@/services/db";
import { promises as fs } from 'fs';
import Pet from "@/models/pet";

export async function GET(req: NextRequest): Promise<Response> {
   var res = await extractPets();
   return new Response(JSON.stringify(res));

   try {
      await connectToDatabase();
      const filterPredicate: StrictFilter<Pet> = { _id: new ObjectId("663d783b4a65f784cafec98a") };
      var result = await collections.pets?.find().toArray();
      console.log(result);
      return new Response(JSON.stringify(result));
   }
   catch (error) {
      console.error(error);
      return new Response("An error occurred", { status: 500 });
   }
}

export async function POST(req: NextRequest): Promise<Response> {
   // const pet = new Pet('gato', 'indefinido', ['adulto', 'idoso'], ['indefinido', 'siames'], '4', 'http');
   const data = await req.json();
   const pet: Pet = data.pet
   await connectToDatabase();

   // await collections.pets?.deleteMany();
   await collections.pets?.insertOne(pet);

   return new Response('ok');
}

async function extractPets() {
   try {
      const pets = data as Pet[];   
      console.log(pets);
      return pets;
   }
   catch (error) {
      console.error(error);
      return error
   }
}

const data = [
   {
      "type": "Cachorro",
      "gender": "Macho",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Fêmea",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "preto",
         "marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1BCvMGgT5IpXuzobXWsfBUOwT5omVjwg2",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Fêmea",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Vi53yfGdYhSQBOoAiJDxH3Ru46z3ZDQH",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Fêmea",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1NFtxlSa-gOvB0w3Wz0V31OZxdPAtgZCD",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Fêmea",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1HT-uzPG8-QAop9i5pQV3ARlvM2W_E5qL",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Macho",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1le-g1B_Gnjp3Xsg6kEma1oqKYvzednpD",
      "observations": "Orelhas peludas"
   },
   {
      "type": "Cachorro",
      "gender": "Macho",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Golden Retriever",
         "Labrador Retriever"
      ],
      "colors": [
         "Caramelo",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1veTxIZHhgvvLjsltAzOs9umTFZurwXWv",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Macho",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1w_Ga-EOZ8CvcgdPbt0KdQM8OyUoX8yM4",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Macho",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1x0AV6KLnMsCi1BjqOs6n5dBt960uRdhA",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "gender": "Fêmea",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1o11rbjQreF-5-52mw_w492bWmfzc1d1Z",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Pitbull"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1KeJErH_sZjiX-ZcLeZ6cppAm1sl4rtiI",
      "observations": "Mancha marrom que cobre olho e orelha esquerda. Utilizando uma bandana preta com pontas metálicas."
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Pitbull"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=10RzV0Q1nXS1O_du92JPJuApxFJt6OxNY",
      "observations": "Focinho com manchas. Orelhas caídas."
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1CqulsUeM4QxvXPJCa2k2fqKYOdCHTl9J",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ve0iB9BgXkxUCuqyXw-Rr1BYNJ1TEloe",
      "observations": "Orelhas caídas. Porte pequeno-médio."
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Boxer",
         "Bulldog Inglês"
      ],
      "colors": [
         "Branco",
         "preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1XXc9h307Sq7PMei2qTcpp8JXtSsm1D0c",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1fipNgqwcfOicMMZDRH7ARs3Kmd3xp3c7",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1uHgkoDSaTRHn2-9t4zub25G5c4Kx1OEj",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "CAIC Guajuviras (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1j0Nk8sL0xCTMUR3rmz1GyIt5PqUda62v",
      "observations": "Pontas das patas brancas"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro",
         "Marrom escuro"
      ],
      "imgUrl": "https://drive.google.com/open?id=17xj7GKQEHA8JfYpFQg_DvA8Yic2HOBqI",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1xjhIGd7x4_UJrbbI7T-MBkWqk-VjO-6M",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1BXqwfJBeCMgEbTtRFL0XAGnYJMv4Rba2",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=13LjADFYWS6rQ9GKWLm7pRt9jPw4CnLB6",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ZtKRKvzXHpV-bCnqcRjYKY0Jhyx8sPUA",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=17MserNW9US3xQA51xCVLMlVbluntCxcD",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1t3Bw3TwhkRDFQXlXWbIMFamUzalhd3rO",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Ug4-ZqExBbMVEE7_XgvYIQ-sqkX0xw_C",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom avermelhado"
      ],
      "imgUrl": "https://drive.google.com/open?id=1-FdUu-mcW2rK4a2JIYdivKVzRxY2GWd3",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1MHAc7HRvwxTfXq5KOwIPqI3VomUHKbvH",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Pitbull"
      ],
      "colors": [
         "Vermelho",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1DeTDQfrrIVXHd8SQH_0k3A3HI_OXvYUV",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [],
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão",
         "Chow chow"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1rXAVNK3orox7NCPcjUnbKrPBXnH3lljg",
      "observations": "Focinho preto"
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=1mIXv9PQWGPjIg51FqLgHUsxs2f_VdaeE",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Jack Russel"
      ],
      "colors": [
         "Branco",
         "vermelho"
      ],
      "imgUrl": "https://drive.google.com/open?id=1TauHTPUWo3A9gME4scVo0qP0KMf4M9mH",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1clBhil8bPMW4mWwmlql9Dx9Ty9okrGz-",
      "observations": "Olhos castanhos. Pata esquerda frontal branca."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1J4GlqfcTGNUUBvXi00oVhnPzs6HgJFbi",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Yorkshire Terrier"
      ],
      "colors": [
         "Vermelho claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1fM3oufwlyiy1ssEw_Th6-88E694nIZDI",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=10yYWOLw0GoT-asZLIwEg7I4ez7y3rjFd",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e LaSalle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=17yJW5j2Tq5qJqMEgQvbbOEG5YDcm-FHw",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "imgUrl": "https://drive.google.com/open?id=1D0eTgUBR3jyRjNaGCJQkWF8f378z3d7z",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=16elRoJZqOEc-a8uuzYzUc8r-2e9eFZQa",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1krX1fWYU_2uq991O0OFxIYUTKXaKK-y7",
      "observations": "Patas claras"
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ZEIe8NNlb5cD3-AAJVKlQiDkAPnahl_l",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=104XKqMtkWMJbzEGzPbRH3wXsMa0lD6ly",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=15GPThLvPifP_u4eNNXD1jNzPCJV9TXy4",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=17VAyP1qHbYiLrn3pMVN8JWf09LYI2EM-",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1m0PyimY0HoIGlZJz_zvNhwzDvCrQZyFI",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=14RLGf9pcTsg1zpe8DLsNW0Gn0jaWpmiO",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1kUTvaqetMs-KEDCrD-vaWLguo_0iqbdU",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "AABB Próximo a Santos Ferreira",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Pk1tsIYURGT1M4LOEB6fqhVwaQacGYK5",
      "observations": "Pelagem branca no peito"
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1pP2R4mnnKafA32RJeJ6b5fn7MY7Usdki",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=193s5R-dT4SqOoZoBKcK-7JUye0ucuE7r",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1T0cH22C_jCadUc9fuYm3J6vs7H3Znyks",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Wc3N5Bnnf8y6wqS4gYN5Jw5rwdACv9jS",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Shih Tzu"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1nVzcx3p4V1UKNxVZWfsV9ewQ7Zd74tPi",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=18MBV-Dw1yysHKIdSj1E9oeaTlY9Qswjp",
      "observations": "Patas brancas, Manchas marrom"
   },
   {
      "type": "",
      "gender": "",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Cavalier King Charles Spaniel",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Lwi7jJ0clh0t4BqKU8PF-5Bc_Z-sCLta",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1C2gVzcd2AFODvzpxS8yH5UFyGx5pJR4Q",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom Claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1l6ie3EMeGZ73_pdc44cvYxcKCpZ0CIwo",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom escuro",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1FU7hpQQsdoHcc-5ypEDPME5jQ0wVGn6u",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Salsicha Dachshund"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=19g3bbUHQyoDp8TuvGhDwZUBAMlfhhg0s",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "imgUrl": "https://drive.google.com/open?id=1j7fF8KDFvihyAt1GqbfdS0N5tTRCRsxL",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "branca"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Pm-WLKocyQXRssdArSvsfQxlBQnpbGoy",
      "observations": "Castrada. Com pontos da castração. Coleira rosa."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Bulldog Francês"
      ],
      "colors": [
         "Branco",
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1XG6jdEHEXnCvm4963l65hnGroDzB-m1J",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Marrom Claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ZTaDknU3KTZ2ye1_m3WZ33XMU5rLKOQl",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pointer"
      ],
      "colors": [
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1B-hd0BsC9AMXqzAofGdwiguPPTLcueuX",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Marrom Claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=101BSliNQ5d5g43KRT7WaaS2DeI9T2h8h",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1tfLVX8kbvFVHfphKrJzaz4nb_ejAQa9o",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1JhiBm4L_894Q4PAUEcAl8Uu2XMpHFohz",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1yxQXDRm66PxSqCxYih3GnFlHTnY3F3h1",
      "observations": "Rabo e orelhas peludas"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1lkl1wFB7PvhjSRGnDRTANPynVW_DMDc5",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Chocolate"
      ],
      "imgUrl": "https://drive.google.com/open?id=13ePxlseVboP_Khq1W2AUtKlWnKiSQtzv",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "colors": [
         "Marrom",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=10zP_HFp3RB1KNGXhv1ymm7XUT3J2Pcel",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "imgUrl": "https://drive.google.com/open?id=15Ex8FG6CTNJO9c9xZk4tVtdguRtgz4Gn",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1_p8vv9OR5S1TBOrhVAyGLmmVGD7Nvpce",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=122YPO_VnGPuahTb3sR9BJ0CG7M9CumwH",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1wb7xQ8mkgxKPDp0tX0x6rqlIWc_00Zj0",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1YFFivU-7ZB1eYBad8c_FAmIRlklwbjKs",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açurena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom Claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1eSJrs6Sn8cbt6YSX_8SqZtBmoqrr9hzM",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Mathias e La Salle  (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1YuMyvNFB-mwpEzfm_a2iA_xqwvQ_EFwt",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1mSL9jzGB6Ejq5PWnBrYqmHKhwvOeY7-Y",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1v9iN56K98p_rIM-OuWdwG3j-6GYCE6Qm",
      "observations": "Bolinhas marrons no quadril"
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pit bull"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=14_yPJMQFmNDy6kRIDr1XX6OHqCgOYkId",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1bTEBbnSb5HQM0aFdTgbU8JcGDSEZkJZm",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Beagle"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=12eIDqF2DbdKyBPIQv9yS9uhA24zDKwcD",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1yY6AwlMuBbEnBDZlRC0eako5uQ-3W4HP",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1eBfSgXSxqdsOsVSNEWIymZAGn7PcOGdf",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pit bull"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1OySt4AM3noXmHvP5if8ZWgF1B2R21c96",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Local resgate: Maria Isabel. Em Lar Temporário (Ju).",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pitbull"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1vthJvRTvB9GPz7SiGMrDqDXtcbY1pPQo",
      "observations": "Mancha preta no olho esquerdo. Encontrado em Instagram: meubichotasalvocanoas."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelhado"
      ],
      "imgUrl": "https://drive.google.com/open?id=1TSeOOBLHudml0WM3_d3gt7COZPubDpCl",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Te9NiTMNj5hEHnKNPur87oeKEAF57qVN",
      "observations": "Mancha preta no olho"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ZH5CZW3sdVrr7JK5XWA_xY-dZRZYSfAX",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom Claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1V0vNVN7LRLpn9gstl5ei9s1aLYELxNur",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1zm8M-qNf6Gabt0d-zZH47dNboX_vZZ-J",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Em lar temporário (Ju).",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1bgbnwlwLJo1pbdMuq64KAbeXnFrW3D6t",
      "observations": "Imagem encontrada em Instagram: meubichotasalvocanoas"
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Yorkshire Terrier"
      ],
      "colors": [
         "Preto",
         "Cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=1r9vni-cFFC_ZvhEAkPaPc7UWLJp47iEY",
      "observations": "Peludo"
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1WjCIPYB8Ej4fA9jz26qr32AJ_10TNOnn",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1VSYPFl59ZOgaUh2HVonObjxS_ICojLHT",
      "observations": "Mancha preta no olho direito."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1j8ESuunhwBbL7PQBVBqvV-U_iQUjOaiN",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Salsicha Dachshund"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1e13Sj-ZyRF8VUlHmHKk6-cpnWfWFZIwP",
      "observations": "Orelhas caídas."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=19xs0f7YzBmPdEuu2ERLi--6CcueawcTl",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=15abum4JzbhG0QSjhWeCs3vyVxbJPUoY1",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1fajK2ylioRuilMzWuDAqAaaGK7mzQsUU",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1f1_Pp9QoAECU8AIxa5FkVHhUQ0d0lHWZ",
      "observations": "Mancha branca orelha direita. Olhos castanhos."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "imgUrl": "https://drive.google.com/open?id=1CdwVkem_malEYHc58bd_P_xfRtbiD4R8",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza escuro",
         "Cinza claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1As6qpjo9FRj6kkDWRssv57EJXpZVkjrN",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom escuro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1KsjviwnC8ieGdmq0sQgImvN5Nbg4EB7Z",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Cinza escuro",
         "Cinza claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=14yWuQZItbC9PL0sjumMRfE4jGXljB6cM",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Beagle"
      ],
      "colors": [
         "Marrom",
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1mAjyaiLIYWSaIdGGQReHh3ybBbhJo_ff",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1DWeyTS8QSQ_XClZdJIEt1Up5stjAn552",
      "observations": "Olhos castanho"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pitbull"
      ],
      "colors": [
         "Branco",
         "Marrom claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1qxg_H69PrPbnBmDxev53Z9rxZdP-kSxl",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza escuro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1tRHIaaanRoqZ07FG4PWYEWEmpVYZFyOY",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1h4N-jRz0ElEDEW0SUv4oZhWI0Iq7dQwv",
      "observations": "Patas e focinho marrons"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Amarelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=16Ta53jyLLMEu2_T65TGcXQ5UtDK1jjZg",
      "observations": "Grande tumor/deformidade na cabeça. Coleira preta. Ponta do rabo com pelos brancos."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1y4TfWm1dRn8Zmz1pGHT4szNOcwnK9tlZ",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1QVPA-NeO84dNymdFAliAFyEvuZGsvemY",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1TBekFYrMRBSacYTlKK3-nb4nba7BI33D",
      "observations": "Orelhas e rabo peludos"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Y32d65U-n6h3Utkz1SJ7QbPoWKQYK9r3",
      "observations": "Pelagem preta na cabeça"
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "colors": [
         "Branco",
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=10DC2EPP2s1d_lFxSIgfc2ZCT1SQhvdb-",
      "observations": "Pelagem grande"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1d48x6f4pdbeCaTfHDahJtCM86TpEz3dx",
      "observations": "Pelos curtos, quase sem pelos."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário, mas estava no da Sogipa",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta",
         "marrom e bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1FBZ9ItcMN0Iq29YvT5vmDXZVfD0ht46L",
      "observations": "Castrado, porte M, está bem cuidado, gosta de comer ração seca e é carinhoso."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1h7NzFYvWtu_iZlVvDGcPf4YzIqypLGPK",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Sh2jK_Ctkt5b30OcAP7Uh2pLG6qEYax-",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ViQlm8tBDGM88nSXXvCwCxo4Km8ZaU5C",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1hFHtOGPe1kA5AobF8tspbILz9jPPDFqw",
      "observations": "Pelos compridos."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1EmHfTqFD007-kd4xfGaEiI9-ORsW60_N",
      "observations": "Pelagem branca no peitoral e na cabeça"
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Pug"
      ],
      "colors": [
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1TIqr8JNg3nQUVGYBkbq_t7i9ze0VihTL",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "imgUrl": "https://drive.google.com/open?id=1xNiQbsd13BNM9Ttk_4mvk4kLN2-rljaj",
      "observations": "Corte na lateral do corpo"
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Lar temporário com Gabriela 51.993064930 perfil do Instagram @gabisalles",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branca e preta"
      ],
      "imgUrl": "https://drive.google.com/open?id=1EuZIr2K5uOHlfA5qyRWkASb668zIX-hc",
      "observations": "Pequeno porte, é de Eldorado do Sul e foi entregue no Gasômetro."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=17ViCXpJjVtJ68j0bY62xc0ooIlZbmw9A",
      "observations": "Detalhes em marrom claro na pelagem"
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ix5xGNKYqvLhyFzROQokkqq_iAwkaVEB",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Salsicha Dachshund"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=19c6Q3mpoy3PBff09gV_5MypRlOXXPpn0",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Caramelo",
         "Amarelo",
         "Marrom",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1DzJfGN4Ze90r4afDB6IT4BqBXiykqpYi",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário com Gabriela. 51. 993064930 perfil no Instagram gabisalles.",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta e marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1JrTUTwjNrAfix13WeGGZOBqNMXXgY58-",
      "observations": "Grande porte, foi resgatado em Eldorado e entregue em Porto Alegre no Gasômetro."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1dQoLIiZBZblivE0wlIP09QJeIMVN1Rqf",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Amarelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1DC4ILeIr9yGtDAOU4uR8z5bg8evSWAG6",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1N810UN38baga9CeRjrcytrmLmsMROYMB",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=15qDU3M_xXPbN5gyk0RFf2uaoA13znkLK",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Lar Temporário com Gabriel 51. 992523533 @gabriel.lp83",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Shih Tzu"
      ],
      "colors": [
         "Branca e preta"
      ],
      "imgUrl": "https://drive.google.com/open?id=1swXoyoeDPCgxA8SGMfdboIL3SDwzPobz",
      "observations": "Fêmea, pequeno porte, que gosta de subir nas laterais de cadeiras e sofás. Foi encontrada em Sarandi."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1DadqYfU-s2dcrD86bfZThw6g3eorxLB_",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1jceScQJ-ybc88D08fo6AKS7wWJNEM07g",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1N4ZfndOdy58VzNLm95GWutic0erNX1N2",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Hospital Pet Support Zona Sul com Manuela Sulzbah 51. 99850534",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1RfS1SyopDmZG1ll0bBzdlA2DktaNMsr5",
      "observations": "Fêmea jovem, porte G."
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=171AUZvP8DJbjpM6GjlxBloY0bspW3mPh",
      "observations": "Grande mancha preta no ombro direito."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pitbull"
      ],
      "colors": [
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1rylGkQ30cAIGnZTGJC8fNlwGMDcpZ23H",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1HTGUNqVMDiDnPrOjDBr1EHLeC9ROFig9",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1cz99ef7U5pwFON-Xmw5oCIDDlRr0AgC7",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar Temporário com Manuela Sulzbah tel 51. 998505034",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "imgUrl": "https://drive.google.com/open?id=1QwS54OWaEnWmaHzGMaNg-COLegXGoKWH",
      "observations": "Foi resgatado no Sarandi/Zona Norte de Porto Alegre."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1uwlGiPpN2NBuPNLojjqWeDd6U5npiF96",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1LZRnjPdtmDA7aTExISU01qx0trb3JMzJ",
      "observations": "Olhos castanhos. Unhas brancas."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1YC4zUqiBx3erClZpz-pMtFhQcQPopgIx",
      "observations": "Não tem uma pata traseira"
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1QVITXwAs0cPznXPMX9j_yTn_gbt4tkUq",
      "observations": "Olhos castanhos. Bravo."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar Temporário com Manuela Sulzbah 51. 998505034.",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1UivDmWpYw9CaeNYMeSQQFYzfMzKuoOLN",
      "observations": "Porte M/G. Foi resgatado em Eldorado do Sul e entregue no Shopping Pontal em Porto Alegre."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1bHC25D4-Trp1-SYpQrOktSPl8odIwz6P",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1026AyhY-iSPj2Hgs--ctlAzvCtKHIIWF",
      "observations": "Ninhada de filhotes."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1GVppP9czSfDH2Fn1narn3dYYCiU_qb6u",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1wZcjgWwAF09dbCiZSaF8EWVg4QyjDWkG",
      "observations": "Ninhada de filhotes."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1lQIlWPrI885ZxnjHt20lUQhb_g06p18O",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=118Tno-DV5QFQXn-MT68kYM45U_anW8W7",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Cs7lo3pG5EPiORISHee2fRnxs_wSN06R",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Sallle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1F2K1YcKH7B3e5Se9TWrDIZNTyjy-auTt",
      "observations": "Manchas pretas nas orelhas"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário com Liege Gautério tel 51. 994849889",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1zuX8S55oxzM54V2JAYukXlVvmVpWYVqi",
      "observations": "Castrado. Porte M. Gosta de ração seca, é carinhoso. Foi resgatado no Bairro São João em Porto Alegre. Está bem cuidado."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1qdcjljKmqbkPtZeB2Cv_WwTJ-BpRnoLM",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1M1dhGe1OJnBsl3vgAsO1dL544DyodJfq",
      "observations": "Pelo comprido."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1gmdUZdkgoU3Pv_29E9EZq5jZvpZYPOzq",
      "observations": "Barriga e patas brancas"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1oetUn2XFtBKNuQzwF_Qv2VrFyHTCw4H4",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1oDAFjv9FJSFfCdeAF6nNPfSuEHQEL2Vl",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1c-oItRuYeDSTVubdz7f7w5SiRWRftitX",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=10rkSpIccrZ5Pr8XS03mpn1GNlADAVsAv",
      "observations": "Olhos castanhos."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário com Manuela Sulzbah tel 51. 998505034",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=12re1MwfbIpeJ6IruQ6CWrnrFDdBbRt7P",
      "observations": "Porte P. Foi resgatado em Eldorado do Sul e entregue no Shopping Pontal em Porto Alegre."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1m0mJm_Te4SPIcLsorSJNKxIooc9pouj-",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Salsicha Dachshund"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=19kiWkFDeY-mIh1OaUv1RfHEZS76J7MfL",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Boxer",
         "Bulldog Inglês"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ox6Ly0aR1J67RX74vYYKXfQltDYTlhxL",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1mnzcpuGp1ib5z8KYd2hNLaGpceB2jOPM",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1gahBR2m95efIc_ANkcRL-jPHMd8V2hMA",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ZkoVtCcfcRB2B6X0Ka1y7dUtWydImBGN",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Jpxh3ldzsR_1RzTzBkUJSAWU59I1NwR6",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Yorkshire Terrier"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1kHeEyS5h431uuhgRjSwOE7u0OhrV7_29",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=19vngtAkiE9eRN2MZZ87O4Xh64mj9DWVZ",
      "observations": "Olhos castanhos."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1S-Y5puZq-Vrcl87f1_aAY71yFA4xOpIi",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1D4BgVjuwzfOCH5lLnRvwGG8djO1ScuFn",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Salsicha Dachshund"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1kFs7UYXy6_p1dDkIwBvhJ81h5iY-Sp34",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=14ssxzppcGnIiz4j0gy4JwfEsjyqcbkUV",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário com Pedro Basei, Instagram: @basei95 telefone 51. 994477515",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1uqM6BYvDpbUQJzcB-J2HcQX4EhGJw1bD",
      "observations": "Caramelo, peludo, orelhas peludas, corpo com pelo tamanho médio, patas com pelo curto. Porte M. Gosta de carinho."
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Rottweiler"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Pu3J1T4y_b9jKz8cPGK5oTmcxT2mxkq8",
      "observations": "Manchinhas pretas no pelo próximo das unhas."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1LqORaVj3fycjvm77OMmZv56ZMNYF5Z6Q",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1yPPv7vCeI773pZBg31VU2LXK6Ii5Bg0y",
      "observations": "Patas mais claras e focinho preto"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=15tTE5J0dE-jQsSK6Evkx63sKYbdMyKOT",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1eN-8PwqHp3-d0qAl2IpQG3HF_aM5zTcg",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1MalP3SL5n1B4q8QHISOp7HJxjOHWIYex",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1HGG--WZqy0gOP6U-sKRr0CIXuo9-7F1_",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1zOKo2z-bKvoP-zuInUm-oLgctxxtAgTQ",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1N5toSFI0OLXmsANGSGsEwTvmrOKth-JS",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1hST7i9J-YAS_qby2OB5v_X3ePrPRhg0Q",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Shih Tzu"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=13VedegS5Zn7dCHvJHwBr0fBgMyOiihBn",
      "observations": "Pelos que cobrem os olhos"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário com Renata tel 51. 984425232",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Amarelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1MHC-qUUL0TznMAatzfJALRwejGK0wde8",
      "observations": "Foi resgatado em Eldorado do Sul no Sans Souci, e chegou de bote com o marido da Renata."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=12_mRDX0JYwNcr1QrpeFA3Yc8b-1A8jEs",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=17W1gN50x6_7XtVYHY7nNx5Ht-qlYe4eR",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=1jHN3kzT2OsY9KESo97c79xhXuXmwuD4J",
      "observations": "Tem um pelos em um tom de marrom nas costas"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1-660KtYs-gP_BpMofuxvxhfJVJdM73bx",
      "observations": "Cara preta com olhos amarelos claro. Mistura de Pastor Alemão."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Shih Tzu"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1CXh1habTsXTRswqWuOsIylRzfNr_hTKy",
      "observations": "Pelos cobrem um pouco os olhos"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1S2VQ2F_3_CQKKyAtbGbVdZ-SXO0VbMsU",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Caramelo",
         "Laranja"
      ],
      "imgUrl": "https://drive.google.com/open?id=1d9lS5-gjuwiiY3IFP7Oik8NxDy6ak7Dp",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1FvxHIuFghhOHyM1hEqPJGKCpFiyodS94",
      "observations": "Pata machucada"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Amarelo",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1GbK5rKAf4ni-iPJnoEPjIM-Msonp-0Uj",
      "observations": "Mancha escura nas costas."
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Lar Temporário com Patrícia Alves, contato pelo perfil do Instagram: @patyvarriale",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ZZ7x0tFkNLaMzoNKmnNERYqDkXORXzDa",
      "observations": "Fêmea de pequeno porte, pêlo curto, cor clara, bege, amarela clara. Foi entregue pelo resgate na Igara em Canoas."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1h28fppr96ftTYS86cl5Eoam6QWD6Z60x",
      "observations": "Todo preto"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Y48NkWRw8p-fRjPZy9EtFQG8-CUBHcW7",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1_T3_5yMAhmvBc1CHBJwTPDQqiMElK68_",
      "observations": "Orelhas com pelos compridos"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1HzaZV9fy-0YkBeILJMom9pIKoD9cLryw",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1ZTUzON_if4UnMwfKrh2IP7xSaucWa3F1",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=12pj1got-ctbCgt-Vj-WZIQCU0Rm50Umt",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Yorkshire Terrier"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1SVipBbxhbt9eGJzQNs-5FzEmXazl_oLw",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1k3BYOmdZsKy1-yx2sOORznbldu8Zji8z",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1kpGEevsuj2jbHqUPbURAHViWzWfo-ap5",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1qirsp8AuGmKVlQLHfc0s4WUtVvjphyfG",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1yY7LJcrx9AxeJpDlDeYfGrHEZCA1It0l",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1MVTAuIf6Mc1AhF9gc18mWrp986ImOAga",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Lar temporário com Brenda, telefone 51. 996790812 e perfil de Instagram @brenda.porciuncula",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=147NdQi4wSzsuMRtBV0-9mbyiYwZDNg67",
      "observations": "Fêmea de porte pequeno. Pelagem do corpo de cor cinza escura, focinho e patas caramelo. Foi  entregue pelo resgate no Shopping Pontal em Porto Alegre."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1QGPVpWqG-dnoz6HhbVEytUmFuIrxPsfe",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1F3t8pgW1LC5fsCKu0NhiMZg2Ng0Eyw7y",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Caramelo",
         "Cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Cs15DrzPgwd_arfc0mcqyZm4euW8djbb",
      "observations": "Com coleira amarela/Laranja."
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1LoxJh8nDQK1yXA0Jjm4kzyn4qN86d_pw",
      "observations": "Orelhas empinadas e pontudas"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1u0fmdnE_2tYAqTXuS5wsjIf5F4PqFMRh",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1vpS6hifM6L-BgF0I7ShsEbOLQvmUb2UG",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Fcq2wKcAtZLyrndOxHlhzNsDblr18fZz",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1cwgetTkKm72CkxcbT6RmZkPq4FgOMmkf",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1MsuCBy4bkya0j4VcesFs35VS4kehFy2-",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=19kYK0qN_CfsqdzPHgyh_yOYb_H5Yit4D",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1fQbzEU3MSooihlLs4PRv8HzKulU4RwyG",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1_4RjGbcrZFhA9wihL5jy65mALBHwzBCB",
      "observations": "Cara preta com olhos castanhos. Pelo curto."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário com Isabela Valdez. Tel. 51 999048594. Perfil do Instagram: @isabelavaldez",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "imgUrl": "https://drive.google.com/open?id=1w5ulkeQFKvKZ6i6wjJhUieuR5UYxIzlE",
      "observations": "Macho de porte P/M. Pesa 9Kg. Pelagem tamanho médio de cor caramelo. Orelhas caídas. Foi entregue pelo resgate no Gasômetro."
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Mquxs5UcybOL108TxZ14eE4UDzCxYJqv",
      "observations": "Cordão azul no pescoço."
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=18_OkA1BUvvpcCyhIvYhoUR17rdjravv-",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1mNqYZ6hHzicXfeaHbcyRfSAexl4SAgF3",
      "observations": "Pelo marrom com partes em preto"
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=18JVYh5usRiHHNZxG5ao7C0Vb7Y6_yqhb",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Filhote"
      ],
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1tZt_t-zNqbSkP0mAvjxps-bo07pmmwCP",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1DRh6BXLNlypVv7ldMXRcpv5JPxQLvgoW",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1hrBRNM7FywEiwotrIijHLBGZBik5nxFo",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Lar temporário com Júlia 51.989543059. Farrapos, Porto Alegre",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1mlefpP7TEPssc6HVJgUw7rzilHsUYoRQ",
      "observations": "Porte médio, pelagem curta, cor preta com focinho e patinhas caramelo. Tem uma mancha branca da barriga. Foi encontrado na Farrapos."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1v49caP1MiAIT_H7xaQlCBub1M3MlxisS",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "imgUrl": "https://drive.google.com/open?id=1E-NY90gkxjTc6EWyiu_Kc-3Znk53RVYN",
      "observations": "Olho castanho."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1Rat64SsYwLrgE0Y9N-o1kNkues_4CWvI",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1FO5c6-jLRppyMnwEb3mYjUcyCegi2tDm",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1c7cJg1pH94O5IDnjT4AkGRtBK9KLUUvC",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1-ektbrvNiv-qMWzrF8OaR30gTkWqqosD",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "imgUrl": "https://drive.google.com/open?id=1JJYJHh0MpQQ1qn3g94A2XJFMVFkrBIX_",
      "observations": "Pata machucada"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=18pczIHzcAOTHj_VcZPPlLHEm-FH9xXmj",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Pug"
      ],
      "colors": [],
      "imgUrl": "https://drive.google.com/open?id=1mA6aoN3y3Wx-zjNC3lcIMSQ1-GLt2rah",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1NN0aT9vmOE0UaWc6jtouWC9IgfnBg0PP",
      "observations": "Ponta das patas branca"
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1w8RodsOlI5zBC4stv7K4xrhWK1cmE6MJ",
      "observations": "Pata enfaixada"
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Lar temporário com Giovana Schneider 51. 996403232",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=18Um4wngvGkoNbqpCt9lsfu6dkyXq5apm",
      "observations": "Porte pequeno, pelagem curta com predominância da cor preta, focinho e patas em bege claro. Foi entregue no Stock Center da Manuel Elias em Porto Alegre."
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=10mKp2xJSziOp5ReJ1WbEfWy4A_6uuRvM",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1dttH6I1LnzM7GV4iYHRQ12kegy79XGpv",
      "observations": "Pelo longo"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1f-KY0LE3OJPP22RZROEArGC8IptbbNyD",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1mv2dV_DMaUR1Kocj-lBXlO06ziWipreP",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "imgUrl": "https://drive.google.com/open?id=1c5ccEg9GO_JfjznEd_XePZ3Lkzn4346z",
      "observations": "Olhos castanhos. Patas e pernas cheias de manchinhas pretas."
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=1rU_vdIGS87-4dyMYBnOtrrATBbpmHWb9",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "colors": [
         "Preto",
         "Cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=1fn7ZJrb2US3MVjj10TJfSvEeKMmcgDtt",
      "observations": "Todo tosado exceto na ponta do rabo e na cabeça"
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "imgUrl": "https://drive.google.com/open?id=1MYpYMFBr9U6L3qdOsHFkIzWKBnHv3uLJ",
      "observations": ""
   },
   {
      "type": "",
      "gender": "Macho",
      "location": "Açucena 1547",
      "age": [
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "imgUrl": "https://drive.google.com/open?id=1GGsCXCDTtW673aQ5fqBZWcxCPvSSpOv-",
      "observations": ""
   },
   {
      "type": "",
      "gender": "",
      "location": "Mathias e La Salle (Canoas)",
      "age": [
         "Incerto"
      ],
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "imgUrl": "https://drive.google.com/open?id=1O1aRk5USpa39JU210toHmGCv15d6KOQV",
      "observations": "Corpo escuro, barriga branca, patas claras"
   },
   {
      "type": "",
      "gender": "Fêmea",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Yorkshire Terrier",
         "Lhasa Apso"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "imgUrl": "https://drive.google.com/open?id=16OoYXoBknHbrANwGYTvuYVZUGXljqQI0",
      "observations": ""
   }
]