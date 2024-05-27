import OpenAI from "openai"
import { getImageUrlFromDrive } from "@/services/googleapi"
import Pet, { fixPet } from "@/models/pet"
import { connectToDatabase, collections } from "@/services/db"
import { NextRequest } from "next/server"
import { Filter, AggregationCursor } from "mongodb"

export async function GET(req: NextRequest) {
   return new Response('not allowed');

   // let res = await fixBreeds();
   // return new Response(JSON.stringify(res), { status: 200 });
}

async function updateValues() {
   if (!collections.lab)
      await connectToDatabase();

   let col = collections.lab;
   if (!col)
      return new Response('Erro ao conectar ao banco de dados', { status: 500 });

   await col.deleteMany({});

   let pets = dogs.map(fixPet);
   pets.push(...cats.map(fixPet));
   await col!.insertMany(pets);
}

async function fixBreeds() {
   if (!collections.lab)
      await connectToDatabase();

   let col = collections.lab;
   if (!col)
      return new Response('Erro ao conectar ao banco de dados', { status: 500 });

   let pets = await col.find({}).toArray();
   for (let pet of pets) {
      if (pet.breeds?.includes('Pitbull'))
         console.log(`pitbull found in ${pet._id} img: ${pet.imgUrl}`);
      let breeds = pet.breeds?.map(b => b.replace('Pitbull', 'Pit Bull'));
      await col.updateOne({ _id: pet._id }, { $set: { breeds } });
   }

   // return pets;
   return 'ok';
}

async function getByPet() {
   if (!collections.lab)
      await connectToDatabase();

   let col = collections.lab;

   if (!col)
      return new Response('Erro ao conectar ao banco de dados', { status: 500 });

   let sizes: any = {}

   let cats = await col.find({ type: "Gato" }).toArray();
   let dogs = await col.find({ type: "Cachorro" }).toArray();

   sizes.dogs = dogs.length;
   sizes.cats = cats.length;

   return sizes;
}

async function countSizeValues() {
   if (!collections.lab)
      await connectToDatabase();

   let col = collections.lab;

   if (!col)
      return new Response('Erro ao conectar ao banco de dados', { status: 500 });

   let sizes: any = {
      "Pequeno": 0,
      "Médio": 0,
      "Grande": 0,
      "Gigante": 0
   }

   let datas = await col.find({}).toArray();
   for (let data of datas) {
      console.log(data);
      if (data.size) {
         for (let size of data.size)
            sizes[size] += 1;
      }
   }

   return sizes;
}

let cats = [
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bb7Tjq9rpnCcDGhji7S6hXh7nqTCgDiu",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto."
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Olhos verdes."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dX04MyRkxY6fzGYWF_zKWt5GGt0UBLLQ",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado, Cinza, Preto."
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Olhos verdes."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sbOaSmiiDjK08ZMfG5eZNP3cpYElW1Q4",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado, Branco, Cinza, Preto."
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Olhos verdes."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/11fNbpPtRdVm80WWErGxrKzv0Hk1VAzu8",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado, Branco, Preto, Laranja."
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Olhos verdes."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KSM28eNZyMsJY0hSJSON9YD8EQdweS6y",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Laranja"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Olhos amarelos."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/15cYXxhWiG4OxMC5gILwtbZRbxQM_TlDj",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Cinza, Preto."
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Manchinha escura embaixo da boca. Pelo curto."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TTQZl0HFSOTtWG24WzBhevTi_srYZUsw",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Amarelo, Laranja."
      ],
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1M712juTEHRhzn4_0UfYTMPfyimtk5Fm3",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado, Cinza, Preto, Branco."
      ],
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HWfas6QTesaOhE5C62Tnfjjg01GtSG1Y",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Pelo Curto Brasileiro"
      ],
      "colors": [
         "Rajado, Cinza, Preto, Marrom."
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Olhos verdes-amarelados."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cx0NmVQw0KJ0BHReIc73MTeda14kgiYX",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado, branco."
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Gata com filhotes."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jNHkOkeNd0ffOMSUdv9XHhjcQOuNkaNH",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado."
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Ninhada de gatos com a mãe."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/15I4X84udFSWiWILapcfxKrNqBFWFTm-M",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Pelo Curto Brasileiro"
      ],
      "colors": [
         "Rajado, Cinza, Preto, Cinza."
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olhos amarelos."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/141kz6RUxdKs7Q_ytB7Hm2hHFG6gtUq4A",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado, Cinza, Cinza claro"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Na coleira informa ser da Rio Branco"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dpRPm8VQTM6KVP63rWSqG1jyTUeCZvbC",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Bairro Rio Branco"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QsQp8CGsAioiOcklKc3s69tF8MpaC3Pr",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Bairro Rio Branco"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1myOaKGU_AGmSsWj9UsHql05q8HyUQ1E8",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Bairro olaria"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Cy4_t-y7Kh-4Bo1JaNWUaAZ-BPRE3u1x",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Laranja"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gLA8WudmKCQ0XnxfwH04yhrfKB2wYt2w",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Rajado",
         "Laranja"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Ninhada"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rxvsWUC0E1o8djVBLTVkbg7ROfRkoa-0",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MehaBS9cqTSSBL3VLoE3z-hdrnhCf25o",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eqU6dlHYq_lGxvuFhlze_5RoRnKVOa0A",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1i1jLGzEL1ahynfGAxA85HUmZ1SSdNDTW",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sMIc8TRq6dQt3Qkhfmio7iuGknbZI66h",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Má formação no rabo ou calda."
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HCw1XoywdhjInwmBP6EdrMj0NWgJNunp",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-lJxlOiMwU2pzCDy26r1WozFs7-rnXqX",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aY_dpQcnePEkT8Y7b9N_gnFER-2y0hhz",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "location": "OnlyCats",
      "breeds": [
         "Siamês"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Não é castrado"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BVQqqjqZd5G5UamK47NKgh50kiMNINSh",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Oy6v5sehMkWYL3_AeJxtO9K1e0r7vhUf",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1D3vnDjlWnNjZu_gw6sbkN-INod3fXijN",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UQ6iD5WMfFWqw5UdoIqfQ1mxNadmFE_j",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uj8QapdvpSYhbdjmiSZO-Ez-l6Gn9VQE",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/12S1wUNKi1D_xwEOKTFLYETm6V11lRD0S",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OiZqB76JxwEKmYi6UPX2o3KWgKiAN1v8",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MZcqu1CsxbUdeEdITYhB3iK62OuVmoXz",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/172KyagHV2XKO1YP-ebpMz-blyghaDolh",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1A6Fe7UWEbsh9wZ_vk7ur_pGmBRhGjqSO",
      "location": "OnlyCats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Tem o Rabo curto"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CvTs3lkJbmu8AP2YI0BWD0t0_ZfKXQ3S",
      "location": "Uniritter FAPA",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Cinza",
         "Rajado"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Felino tigrado de cor bege e cinza.",
      "infoOrigin": "Pets_resgatadospoa"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PW2HGEBkSxFvmIJZf_j61nfmZ3SMu4JF",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "encontrado na Mathias junto com um gato preto e um Pug",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ts-cShL5cIJ5uF4wit-dEBUEmlXQUaXg",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho não castrado resgatado no Fátima.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GCsuCwoMs-FL9ka854_tJVVZRZ15UevP",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho não castrado resgatado no Fátima.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gGtDWCc8mr_AXUjr96MAw-3ABY2MOn34",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Macho não castrado. Com coleira.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WyKHOuAkfs_-fRGxwSaOpRw-1LB4VIYk",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Laranja"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "0lhos amarelos, escaminha preto com laranja, pequena. Lugar que foi resgatada: Rio Branco.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ET0ZOPJogJhjD6GyKD_CwpX6zBnT6R6E",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "resgatado no mathias, olhos amarelos",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ybPYwBW51tlb_6RoQJLSNwdnYzdywJAe",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "porte grande, olhos verdes, murisca, listrado, porte grande, resgatado no Fátima",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_yRupV5Az70khwoL6vC7Zqza1AdIGZQr",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: verde. Pelagem: tricolor – branco, preto e marrom. Porte: grande.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/18SGrrBALNjTAHy2GMw70HyRAaClfV1aB",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: azuis, pelo longo. Porte: médio. Lugar que foi encontrado: Fátima.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/18CiCfcc2CvHqKcFWePV3rKWBf57vFx3g",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: verde, pelo longo. Porte: grande. Lugar que foi resgatado: rua Brasil centro.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aGWfSkYWMlXKn8R5tcfv24QhY29oBjf-",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: verde. Pelagem: tigradinha. Porte: médio. Lugar que foi encontrado: viaduto da Mathias. FELV positivo!",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vXMebKYYTsz2UtWbYX404Ks2NjJsBZae",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Cor dos olhos: verde. Lugar que foi resgatado: rua Brasil centro. FELV positivo!",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vwYGQpzjmvkfwFTn2aAFRyrzaBys7aa1",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: verde. Pelagem: tricolor. Porte: pequeno. Lugar que foi resgatado: viaduto Mathias. mimada, só come whiskas, só come sachê. FIV positivo!",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1N-qn_jsiC2Q64DcwX9B0y9a1Hl-Bgkr0",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Cor dos olhos: amarelo. Pelagem: frajolinha. Porte: pequeno. Lugar que foi resgatado: Fátima. não tem os dentinhos de baixo. FIV positivo!",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1x1AbZlSN2ToR52jrWFLg8ab4VUz8YeAm",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "prenha, grávida.Cor dos olhos: amarelo. Pelagem: frajolinha. Porte: pequeno. Lugar que foi resgatada: Fátima. fiv positivo!",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/18WAEMsxmbnxObx6Vlw6BqSXS80A3QOUK",
      "location": "only cats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: verde. Pelagem: tricolor. Porte: grande. FIV positivo.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ThAKFWvseso7Z1_OvGhKkxyFsnoCWUKa",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: amarelo. Porte: grande. rabo quebrado, FIV positivo.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1P7ci70unAgh8c5aFnaPmm4QS8XIJ2YIT",
      "location": "only cats",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cor dos olhos: azul. Pelagem: rajadinho, acinzentado. Porte: grande. Lugar que foi resgatado: mathias. FIV positivo.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1t9Q6QCNbvZBrwPYSvdmoXdup3spnFCuQ",
      "location": "only cats canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Cor dos olhos: azul. Pelagem: rajadinha. Porte: pequena. Lugar que foi resgatado: rua Brasil centro.",
      "infoOrigin": "only cats canoas"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Zfos7fVSRIAQ2EILIQacfM5mWG2bGg1o",
      "location": "Lar temporário com Louise 51 999939071",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Gata de pelo branco com manchas cinza claro ao redor dos olhos e nas orelhas. Ela tem olhos azuis e nariz rosa.",
      "infoOrigin": "Whattsapp pets perdidos nas enchentes"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/18TvtPGoQ4iUQCXpoI6H-2zuMXXgQPfip",
      "location": "Clínica veterinária Divet   @divetcv",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Amarelo",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Não castrado , dócil. Grande",
      "infoOrigin": "Resgatado da Orla n° 434"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yWt4Nedscd9Wcsy12v9xrtF8U79kpsbx",
      "location": "Clínica Veterinária Divet.  @divetcv",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Calma, com machucado na testa.",
      "infoOrigin": "Resgatado orla n° 4008"
   },
   {
      "type": "Gato",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-VglmL5IC5C3D6QFdgXWQUfpLBut_iM5",
      "location": "Clínica Veterinária Divet. @divetcv",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": "Estava junto com um macho bege.",
      "infoOrigin": "Resgatado da Orla n° 729"
   }
]

let dogs = [
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom, Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BCvMGgT5IpXuzobXWsfBUOwT5omVjwg2",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, preto, marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Vi53yfGdYhSQBOoAiJDxH3Ru46z3ZDQH",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Preto, Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NFtxlSa-gOvB0w3Wz0V31OZxdPAtgZCD",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom, Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HT-uzPG8-QAop9i5pQV3ARlvM2W_E5qL",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom, Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1le-g1B_Gnjp3Xsg6kEma1oqKYvzednpD",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Marrom, Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Orelhas peludas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1veTxIZHhgvvLjsltAzOs9umTFZurwXWv",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida",
         "Golden Retriever",
         "Labrador Retriever"
      ],
      "colors": [
         "Caramelo, Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w_Ga-EOZ8CvcgdPbt0KdQM8OyUoX8yM4",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1x0AV6KLnMsCi1BjqOs6n5dBt960uRdhA",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1o11rbjQreF-5-52mw_w492bWmfzc1d1Z",
      "location": "Novo Esteio (Rua Manuel dos Santos - 236)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KeJErH_sZjiX-ZcLeZ6cppAm1sl4rtiI",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Pitbull"
      ],
      "colors": [
         "Branco, Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Mancha marrom que cobre olho e orelha esquerda. Utilizando uma bandana preta com pontas metálicas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10RzV0Q1nXS1O_du92JPJuApxFJt6OxNY",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Pitbull"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Focinho com manchas. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CqulsUeM4QxvXPJCa2k2fqKYOdCHTl9J",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Branco, Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ve0iB9BgXkxUCuqyXw-Rr1BYNJ1TEloe",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo, Branco."
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Orelhas caídas. Porte pequeno-médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1XXc9h307Sq7PMei2qTcpp8JXtSsm1D0c",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Boxer",
         "Bulldog Inglês"
      ],
      "colors": [
         "Branco, preto."
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fipNgqwcfOicMMZDRH7ARs3Kmd3xp3c7",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Branco."
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uHgkoDSaTRHn2-9t4zub25G5c4Kx1OEj",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1j0Nk8sL0xCTMUR3rmz1GyIt5PqUda62v",
      "location": "CAIC Guajuviras (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Pontas das patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17xj7GKQEHA8JfYpFQg_DvA8Yic2HOBqI",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro, Marrom escuro"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xjhIGd7x4_UJrbbI7T-MBkWqk-VjO-6M",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BXqwfJBeCMgEbTtRFL0XAGnYJMv4Rba2",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13LjADFYWS6rQ9GKWLm7pRt9jPw4CnLB6",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZtKRKvzXHpV-bCnqcRjYKY0Jhyx8sPUA",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Marrom"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17MserNW9US3xQA51xCVLMlVbluntCxcD",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro, Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1t3Bw3TwhkRDFQXlXWbIMFamUzalhd3rO",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ug4-ZqExBbMVEE7_XgvYIQ-sqkX0xw_C",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo, Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-FdUu-mcW2rK4a2JIYdivKVzRxY2GWd3",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom avermelhado"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MHAc7HRvwxTfXq5KOwIPqI3VomUHKbvH",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DeTDQfrrIVXHd8SQH_0k3A3HI_OXvYUV",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Pitbull"
      ],
      "colors": [
         "Vermelho, Branco"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rXAVNK3orox7NCPcjUnbKrPBXnH3lljg",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão",
         "Chow chow"
      ],
      "colors": [
         "Marrom"
      ],
      "observations": "Focinho preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mIXv9PQWGPjIg51FqLgHUsxs2f_VdaeE",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, cinza"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TauHTPUWo3A9gME4scVo0qP0KMf4M9mH",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Jack Russel"
      ],
      "colors": [
         "Branco, vermelho"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1clBhil8bPMW4mWwmlql9Dx9Ty9okrGz-",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom, Branco."
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olhos castanhos. Pata esquerda frontal branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1J4GlqfcTGNUUBvXi00oVhnPzs6HgJFbi",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo, Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fM3oufwlyiy1ssEw_Th6-88E694nIZDI",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Yorkshire Terrier"
      ],
      "colors": [
         "Vermelho claro"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10yYWOLw0GoT-asZLIwEg7I4ez7y3rjFd",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17yJW5j2Tq5qJqMEgQvbbOEG5YDcm-FHw",
      "location": "Mathias e LaSalle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1D0eTgUBR3jyRjNaGCJQkWF8f378z3d7z",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16elRoJZqOEc-a8uuzYzUc8r-2e9eFZQa",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom, Branco."
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1krX1fWYU_2uq991O0OFxIYUTKXaKK-y7",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Patas claras"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZEIe8NNlb5cD3-AAJVKlQiDkAPnahl_l",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/104XKqMtkWMJbzEGzPbRH3wXsMa0lD6ly",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15GPThLvPifP_u4eNNXD1jNzPCJV9TXy4",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17VAyP1qHbYiLrn3pMVN8JWf09LYI2EM-",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom, Preto."
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1m0PyimY0HoIGlZJz_zvNhwzDvCrQZyFI",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Marrom claro"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14RLGf9pcTsg1zpe8DLsNW0Gn0jaWpmiO",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo."
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kUTvaqetMs-KEDCrD-vaWLguo_0iqbdU",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo, Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Pk1tsIYURGT1M4LOEB6fqhVwaQacGYK5",
      "location": "AABB Próximo a Santos Ferreira",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Pelagem branca no peito"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pP2R4mnnKafA32RJeJ6b5fn7MY7Usdki",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/193s5R-dT4SqOoZoBKcK-7JUye0ucuE7r",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Branco, Marrom"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1T0cH22C_jCadUc9fuYm3J6vs7H3Znyks",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Wc3N5Bnnf8y6wqS4gYN5Jw5rwdACv9jS",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo, Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nVzcx3p4V1UKNxVZWfsV9ewQ7Zd74tPi",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu"
      ],
      "colors": [
         "Branco, Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18MBV-Dw1yysHKIdSj1E9oeaTlY9Qswjp",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Patas brancas, Manchas marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Lwi7jJ0clh0t4BqKU8PF-5Bc_Z-sCLta",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Cavalier King Charles Spaniel",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Preto, Branco."
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1C2gVzcd2AFODvzpxS8yH5UFyGx5pJR4Q",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1l6ie3EMeGZ73_pdc44cvYxcKCpZ0CIwo",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom Claro"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FU7hpQQsdoHcc-5ypEDPME5jQ0wVGn6u",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom escuro, Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19g3bbUHQyoDp8TuvGhDwZUBAMlfhhg0s",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "colors": [
         "Preto, Marrom, Branco"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1j7fF8KDFvihyAt1GqbfdS0N5tTRCRsxL",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Pm-WLKocyQXRssdArSvsfQxlBQnpbGoy",
      "location": "Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo, branca."
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": "Castrada. Com pontos da castração. Coleira rosa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1XG6jdEHEXnCvm4963l65hnGroDzB-m1J",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Bulldog Francês"
      ],
      "colors": [
         "Branco, Preto, Marrom"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZTaDknU3KTZ2ye1_m3WZ33XMU5rLKOQl",
      "location": "Açurena 1547",
      "breeds": [
         "Pastor Alemão"
      ],
      "colors": [
         "Preto, Marrom Claro"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1B-hd0BsC9AMXqzAofGdwiguPPTLcueuX",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pointer"
      ],
      "colors": [
         "Branco, Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/101BSliNQ5d5g43KRT7WaaS2DeI9T2h8h",
      "location": "Açurena 1547",
      "breeds": [
         "Pastor Alemão"
      ],
      "colors": [
         "Preto, Marrom Claro"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tfLVX8kbvFVHfphKrJzaz4nb_ejAQa9o",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JhiBm4L_894Q4PAUEcAl8Uu2XMpHFohz",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yxQXDRm66PxSqCxYih3GnFlHTnY3F3h1",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Rabo e orelhas peludas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lkl1wFB7PvhjSRGnDRTANPynVW_DMDc5",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13ePxlseVboP_Khq1W2AUtKlWnKiSQtzv",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Chocolate"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10zP_HFp3RB1KNGXhv1ymm7XUT3J2Pcel",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "colors": [
         "Marrom, Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15Ex8FG6CTNJO9c9xZk4tVtdguRtgz4Gn",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_p8vv9OR5S1TBOrhVAyGLmmVGD7Nvpce",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/122YPO_VnGPuahTb3sR9BJ0CG7M9CumwH",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wb7xQ8mkgxKPDp0tX0x6rqlIWc_00Zj0",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YFFivU-7ZB1eYBad8c_FAmIRlklwbjKs",
      "location": "Mathias e La Salle",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo, Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eSJrs6Sn8cbt6YSX_8SqZtBmoqrr9hzM",
      "location": "Açurena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom Claro"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YuMyvNFB-mwpEzfm_a2iA_xqwvQ_EFwt",
      "location": "Mathias e La Salle  (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mSL9jzGB6Ejq5PWnBrYqmHKhwvOeY7-Y",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1v9iN56K98p_rIM-OuWdwG3j-6GYCE6Qm",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro, Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Bolinhas marrons no quadril"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14_yPJMQFmNDy6kRIDr1XX6OHqCgOYkId",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pit bull"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bTEBbnSb5HQM0aFdTgbU8JcGDSEZkJZm",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12eIDqF2DbdKyBPIQv9yS9uhA24zDKwcD",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Beagle"
      ],
      "colors": [
         "Branco, Marrom, Preto"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yY6AwlMuBbEnBDZlRC0eako5uQ-3W4HP",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eBfSgXSxqdsOsVSNEWIymZAGn7PcOGdf",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza, Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OySt4AM3noXmHvP5if8ZWgF1B2R21c96",
      "location": "Mathias e La Salle",
      "breeds": [
         "Sem raça definida",
         "Pit bull"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vthJvRTvB9GPz7SiGMrDqDXtcbY1pPQo",
      "location": "Canoas. Local resgate: Maria Isabel. Em Lar Temporário (Ju).",
      "breeds": [
         "Sem raça definida",
         "Pitbull"
      ],
      "colors": [
         "Preto, Branco."
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Mancha preta no olho esquerdo. Encontrado em Instagram: meubichotasalvocanoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TSeOOBLHudml0WM3_d3gt7COZPubDpCl",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelhado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Te9NiTMNj5hEHnKNPur87oeKEAF57qVN",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Mancha preta no olho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZH5CZW3sdVrr7JK5XWA_xY-dZRZYSfAX",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1V0vNVN7LRLpn9gstl5ei9s1aLYELxNur",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom Claro"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zm8M-qNf6Gabt0d-zZH47dNboX_vZZ-J",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bgbnwlwLJo1pbdMuq64KAbeXnFrW3D6t",
      "location": "Em lar temporário (Ju).",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto."
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Imagem encontrada em Instagram: meubichotasalvocanoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1r9vni-cFFC_ZvhEAkPaPc7UWLJp47iEY",
      "location": "Mathias e La Salle",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Yorkshire Terrier"
      ],
      "colors": [
         "Preto, Cinza"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Peludo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WjCIPYB8Ej4fA9jz26qr32AJ_10TNOnn",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VSYPFl59ZOgaUh2HVonObjxS_ICojLHT",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Preto."
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Mancha preta no olho direito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1j8ESuunhwBbL7PQBVBqvV-U_iQUjOaiN",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1e13Sj-ZyRF8VUlHmHKk6-cpnWfWFZIwP",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "colors": [
         "Preto, Marrom."
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19xs0f7YzBmPdEuu2ERLi--6CcueawcTl",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15abum4JzbhG0QSjhWeCs3vyVxbJPUoY1",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Preto, Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fajK2ylioRuilMzWuDAqAaaGK7mzQsUU",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1f1_Pp9QoAECU8AIxa5FkVHhUQ0d0lHWZ",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Marrom."
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Mancha branca orelha direita. Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CdwVkem_malEYHc58bd_P_xfRtbiD4R8",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Vermelho"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1As6qpjo9FRj6kkDWRssv57EJXpZVkjrN",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza escuro, Cinza claro"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KsjviwnC8ieGdmq0sQgImvN5Nbg4EB7Z",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom escuro"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14yWuQZItbC9PL0sjumMRfE4jGXljB6cM",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Cinza escuro, Cinza claro"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mAjyaiLIYWSaIdGGQReHh3ybBbhJo_ff",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Beagle"
      ],
      "colors": [
         "Marrom, Branco, Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DWeyTS8QSQ_XClZdJIEt1Up5stjAn552",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olhos castanho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qxg_H69PrPbnBmDxev53Z9rxZdP-kSxl",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Pitbull"
      ],
      "colors": [
         "Branco, Marrom claro"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tRHIaaanRoqZ07FG4PWYEWEmpVYZFyOY",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza escuro"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1h4N-jRz0ElEDEW0SUv4oZhWI0Iq7dQwv",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Patas e focinho marrons"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16Ta53jyLLMEu2_T65TGcXQ5UtDK1jjZg",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Amarelo."
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Grande tumor/deformidade na cabeça. Coleira preta. Ponta do rabo com pelos brancos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1y4TfWm1dRn8Zmz1pGHT4szNOcwnK9tlZ",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QVPA-NeO84dNymdFAliAFyEvuZGsvemY",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TBekFYrMRBSacYTlKK3-nb4nba7BI33D",
      "location": "Mathias e La Salle",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom"
      ],
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": "Orelhas e rabo peludos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Y32d65U-n6h3Utkz1SJ7QbPoWKQYK9r3",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelagem preta na cabeça"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10DC2EPP2s1d_lFxSIgfc2ZCT1SQhvdb-",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "colors": [
         "Branco, Preto, Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Pelagem grande"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1d48x6f4pdbeCaTfHDahJtCM86TpEz3dx",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Marrom."
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos curtos, quase sem pelos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FBZ9ItcMN0Iq29YvT5vmDXZVfD0ht46L",
      "location": "Lar temporário, mas estava no da Sogipa",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta, marrom e bege."
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Castrado, porte M, está bem cuidado, gosta de comer ração seca e é carinhoso."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1h7NzFYvWtu_iZlVvDGcPf4YzIqypLGPK",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Sh2jK_Ctkt5b30OcAP7Uh2pLG6qEYax-",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ViQlm8tBDGM88nSXXvCwCxo4Km8ZaU5C",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hFHtOGPe1kA5AobF8tspbILz9jPPDFqw",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Branco, Marrom, Caramelo."
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos compridos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EmHfTqFD007-kd4xfGaEiI9-ORsW60_N",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelagem branca no peitoral e na cabeça"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TIqr8JNg3nQUVGYBkbq_t7i9ze0VihTL",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Pug"
      ],
      "colors": [
         "Branco, Preto."
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xNiQbsd13BNM9Ttk_4mvk4kLN2-rljaj",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom claro"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Corte na lateral do corpo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EuZIr2K5uOHlfA5qyRWkASb668zIX-hc",
      "location": "Lar temporário com Gabriela 51.993064930 perfil do Instagram @gabisalles",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branca e preta"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Pequeno porte, é de Eldorado do Sul e foi entregue no Gasômetro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17ViCXpJjVtJ68j0bY62xc0ooIlZbmw9A",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em marrom claro na pelagem"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ix5xGNKYqvLhyFzROQokkqq_iAwkaVEB",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19c6Q3mpoy3PBff09gV_5MypRlOXXPpn0",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DzJfGN4Ze90r4afDB6IT4BqBXiykqpYi",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Caramelo, Amarelo, Marrom, Branco."
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JrTUTwjNrAfix13WeGGZOBqNMXXgY58-",
      "location": "Lar temporário com Gabriela. 51. 993064930 perfil no Instagram gabisalles.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preta e marrom."
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Grande porte, foi resgatado em Eldorado e entregue em Porto Alegre no Gasômetro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dQoLIiZBZblivE0wlIP09QJeIMVN1Rqf",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DC4ILeIr9yGtDAOU4uR8z5bg8evSWAG6",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Amarelo."
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1N810UN38baga9CeRjrcytrmLmsMROYMB",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15qDU3M_xXPbN5gyk0RFf2uaoA13znkLK",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1swXoyoeDPCgxA8SGMfdboIL3SDwzPobz",
      "location": "Lar Temporário com Gabriel 51. 992523533 @gabriel.lp83",
      "breeds": [
         "Shih Tzu"
      ],
      "colors": [
         "Branca e preta"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Fêmea, pequeno porte, que gosta de subir nas laterais de cadeiras e sofás. Foi encontrada em Sarandi."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DadqYfU-s2dcrD86bfZThw6g3eorxLB_",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco, Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jceScQJ-ybc88D08fo6AKS7wWJNEM07g",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto, Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1N4ZfndOdy58VzNLm95GWutic0erNX1N2",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Preto, Marrom."
      ],
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RfS1SyopDmZG1ll0bBzdlA2DktaNMsr5",
      "location": "Hospital Pet Support Zona Sul com Manuela Sulzbah 51. 99850534",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Fêmea jovem, porte G."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/171AUZvP8DJbjpM6GjlxBloY0bspW3mPh",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Grande mancha preta no ombro direito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rylGkQ30cAIGnZTGJC8fNlwGMDcpZ23H",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pitbull"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HTGUNqVMDiDnPrOjDBr1EHLeC9ROFig9",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cz99ef7U5pwFON-Xmw5oCIDDlRr0AgC7",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QwS54OWaEnWmaHzGMaNg-COLegXGoKWH",
      "location": "Lar Temporário com Manuela Sulzbah tel 51. 998505034",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Foi resgatado no Sarandi/Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uwlGiPpN2NBuPNLojjqWeDd6U5npiF96",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LZRnjPdtmDA7aTExISU01qx0trb3JMzJ",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Olhos castanhos. Unhas brancas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YC4zUqiBx3erClZpz-pMtFhQcQPopgIx",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Não tem uma pata traseira"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QVITXwAs0cPznXPMX9j_yTn_gbt4tkUq",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olhos castanhos. Bravo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UivDmWpYw9CaeNYMeSQQFYzfMzKuoOLN",
      "location": "Lar Temporário com Manuela Sulzbah 51. 998505034.",
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
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Porte M/G. Foi resgatado em Eldorado do Sul e entregue no Shopping Pontal em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bHC25D4-Trp1-SYpQrOktSPl8odIwz6P",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1026AyhY-iSPj2Hgs--ctlAzvCtKHIIWF",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Ninhada de filhotes."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GVppP9czSfDH2Fn1narn3dYYCiU_qb6u",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wZcjgWwAF09dbCiZSaF8EWVg4QyjDWkG",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Ninhada de filhotes."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lQIlWPrI885ZxnjHt20lUQhb_g06p18O",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/118Tno-DV5QFQXn-MT68kYM45U_anW8W7",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Cs7lo3pG5EPiORISHee2fRnxs_wSN06R",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1F2K1YcKH7B3e5Se9TWrDIZNTyjy-auTt",
      "location": "Mathias e La Sallle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Manchas pretas nas orelhas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zuX8S55oxzM54V2JAYukXlVvmVpWYVqi",
      "location": "Lar temporário com Liege Gautério tel 51. 994849889",
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
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Castrado. Porte M. Gosta de ração seca, é carinhoso. Foi resgatado no Bairro São João em Porto Alegre. Está bem cuidado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qdcjljKmqbkPtZeB2Cv_WwTJ-BpRnoLM",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1M1dhGe1OJnBsl3vgAsO1dL544DyodJfq",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
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
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Pelo comprido."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gmdUZdkgoU3Pv_29E9EZq5jZvpZYPOzq",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Barriga e patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oetUn2XFtBKNuQzwF_Qv2VrFyHTCw4H4",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oDAFjv9FJSFfCdeAF6nNPfSuEHQEL2Vl",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1c-oItRuYeDSTVubdz7f7w5SiRWRftitX",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10rkSpIccrZ5Pr8XS03mpn1GNlADAVsAv",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12re1MwfbIpeJ6IruQ6CWrnrFDdBbRt7P",
      "location": "Lar temporário com Manuela Sulzbah tel 51. 998505034",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Porte P. Foi resgatado em Eldorado do Sul e entregue no Shopping Pontal em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1m0mJm_Te4SPIcLsorSJNKxIooc9pouj-",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19kiWkFDeY-mIh1OaUv1RfHEZS76J7MfL",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ox6Ly0aR1J67RX74vYYKXfQltDYTlhxL",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Boxer",
         "Bulldog Inglês"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mnzcpuGp1ib5z8KYd2hNLaGpceB2jOPM",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gahBR2m95efIc_ANkcRL-jPHMd8V2hMA",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZkoVtCcfcRB2B6X0Ka1y7dUtWydImBGN",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Jpxh3ldzsR_1RzTzBkUJSAWU59I1NwR6",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kHeEyS5h431uuhgRjSwOE7u0OhrV7_29",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Yorkshire Terrier"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19vngtAkiE9eRN2MZZ87O4Xh64mj9DWVZ",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": "Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1S-Y5puZq-Vrcl87f1_aAY71yFA4xOpIi",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1D4BgVjuwzfOCH5lLnRvwGG8djO1ScuFn",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kFs7UYXy6_p1dDkIwBvhJ81h5iY-Sp34",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14ssxzppcGnIiz4j0gy4JwfEsjyqcbkUV",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uqM6BYvDpbUQJzcB-J2HcQX4EhGJw1bD",
      "location": "Lar temporário com Pedro Basei, Instagram: @basei95 telefone 51. 994477515",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Caramelo, peludo, orelhas peludas, corpo com pelo tamanho médio, patas com pelo curto. Porte M. Gosta de carinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Pu3J1T4y_b9jKz8cPGK5oTmcxT2mxkq8",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Rottweiler"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Manchinhas pretas no pelo próximo das unhas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LqORaVj3fycjvm77OMmZv56ZMNYF5Z6Q",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yPPv7vCeI773pZBg31VU2LXK6Ii5Bg0y",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Patas mais claras e focinho preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15tTE5J0dE-jQsSK6Evkx63sKYbdMyKOT",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eN-8PwqHp3-d0qAl2IpQG3HF_aM5zTcg",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MalP3SL5n1B4q8QHISOp7HJxjOHWIYex",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HGG--WZqy0gOP6U-sKRr0CIXuo9-7F1_",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zOKo2z-bKvoP-zuInUm-oLgctxxtAgTQ",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1N5toSFI0OLXmsANGSGsEwTvmrOKth-JS",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hST7i9J-YAS_qby2OB5v_X3ePrPRhg0Q",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13VedegS5Zn7dCHvJHwBr0fBgMyOiihBn",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Pelos que cobrem os olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MHC-qUUL0TznMAatzfJALRwejGK0wde8",
      "location": "Lar temporário com Renata tel 51. 984425232",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Amarelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Foi resgatado em Eldorado do Sul no Sans Souci, e chegou de bote com o marido da Renata."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12_mRDX0JYwNcr1QrpeFA3Yc8b-1A8jEs",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17W1gN50x6_7XtVYHY7nNx5Ht-qlYe4eR",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jHN3kzT2OsY9KESo97c79xhXuXmwuD4J",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Cinza"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Tem um pelos em um tom de marrom nas costas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-660KtYs-gP_BpMofuxvxhfJVJdM73bx",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Cara preta com olhos amarelos claro. Mistura de Pastor Alemão."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CXh1habTsXTRswqWuOsIylRzfNr_hTKy",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Pelos cobrem um pouco os olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1S2VQ2F_3_CQKKyAtbGbVdZ-SXO0VbMsU",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1d9lS5-gjuwiiY3IFP7Oik8NxDy6ak7Dp",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FvxHIuFghhOHyM1hEqPJGKCpFiyodS94",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pata machucada"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GbK5rKAf4ni-iPJnoEPjIM-Msonp-0Uj",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Mancha escura nas costas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZZ7x0tFkNLaMzoNKmnNERYqDkXORXzDa",
      "location": "Lar Temporário com Patrícia Alves, contato pelo perfil do Instagram: @patyvarriale",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Fêmea de pequeno porte, pêlo curto, cor clara, bege, amarela clara. Foi entregue pelo resgate na Igara em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1h28fppr96ftTYS86cl5Eoam6QWD6Z60x",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Todo preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Y48NkWRw8p-fRjPZy9EtFQG8-CUBHcW7",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_T3_5yMAhmvBc1CHBJwTPDQqiMElK68_",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Orelhas com pelos compridos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HzaZV9fy-0YkBeILJMom9pIKoD9cLryw",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZTUzON_if4UnMwfKrh2IP7xSaucWa3F1",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12pj1got-ctbCgt-Vj-WZIQCU0Rm50Umt",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SVipBbxhbt9eGJzQNs-5FzEmXazl_oLw",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Yorkshire Terrier"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1k3BYOmdZsKy1-yx2sOORznbldu8Zji8z",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kpGEevsuj2jbHqUPbURAHViWzWfo-ap5",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qirsp8AuGmKVlQLHfc0s4WUtVvjphyfG",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yY7LJcrx9AxeJpDlDeYfGrHEZCA1It0l",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MVTAuIf6Mc1AhF9gc18mWrp986ImOAga",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/147NdQi4wSzsuMRtBV0-9mbyiYwZDNg67",
      "location": "Lar temporário com Brenda, telefone 51. 996790812 e perfil de Instagram @brenda.porciuncula",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo",
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Fêmea de porte pequeno. Pelagem do corpo de cor cinza escura, focinho e patas caramelo. Foi  entregue pelo resgate no Shopping Pontal em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QGPVpWqG-dnoz6HhbVEytUmFuIrxPsfe",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1F3t8pgW1LC5fsCKu0NhiMZg2Ng0Eyw7y",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Cs15DrzPgwd_arfc0mcqyZm4euW8djbb",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Caramelo",
         "Cinza"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Com coleira amarela/Laranja."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LoxJh8nDQK1yXA0Jjm4kzyn4qN86d_pw",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Orelhas empinadas e pontudas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1u0fmdnE_2tYAqTXuS5wsjIf5F4PqFMRh",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vpS6hifM6L-BgF0I7ShsEbOLQvmUb2UG",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Fcq2wKcAtZLyrndOxHlhzNsDblr18fZz",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
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
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cwgetTkKm72CkxcbT6RmZkPq4FgOMmkf",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MsuCBy4bkya0j4VcesFs35VS4kehFy2-",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19kYK0qN_CfsqdzPHgyh_yOYb_H5Yit4D",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fQbzEU3MSooihlLs4PRv8HzKulU4RwyG",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_4RjGbcrZFhA9wihL5jy65mALBHwzBCB",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Cara preta com olhos castanhos. Pelo curto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w5ulkeQFKvKZ6i6wjJhUieuR5UYxIzlE",
      "location": "Lar temporário com Isabela Valdez. Tel. 51 999048594. Perfil do Instagram: @isabelavaldez",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho de porte P/M. Pesa 9Kg. Pelagem tamanho médio de cor caramelo. Orelhas caídas. Foi entregue pelo resgate no Gasômetro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Mquxs5UcybOL108TxZ14eE4UDzCxYJqv",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Cordão azul no pescoço."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18_OkA1BUvvpcCyhIvYhoUR17rdjravv-",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mNqYZ6hHzicXfeaHbcyRfSAexl4SAgF3",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Pelo marrom com partes em preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18JVYh5usRiHHNZxG5ao7C0Vb7Y6_yqhb",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tZt_t-zNqbSkP0mAvjxps-bo07pmmwCP",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DRh6BXLNlypVv7ldMXRcpv5JPxQLvgoW",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hrBRNM7FywEiwotrIijHLBGZBik5nxFo",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mlefpP7TEPssc6HVJgUw7rzilHsUYoRQ",
      "location": "Lar temporário com Júlia 51.989543059.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Porte médio, pelagem curta, cor preta com focinho e patinhas caramelo. Tem uma mancha branca da barriga. Foi encontrado na Farrapos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1v49caP1MiAIT_H7xaQlCBub1M3MlxisS",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1E-NY90gkxjTc6EWyiu_Kc-3Znk53RVYN",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Olho castanho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Rat64SsYwLrgE0Y9N-o1kNkues_4CWvI",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FO5c6-jLRppyMnwEb3mYjUcyCegi2tDm",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1c7cJg1pH94O5IDnjT4AkGRtBK9KLUUvC",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-ektbrvNiv-qMWzrF8OaR30gTkWqqosD",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JJYJHh0MpQQ1qn3g94A2XJFMVFkrBIX_",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pata machucada"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18pczIHzcAOTHj_VcZPPlLHEm-FH9xXmj",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mA6aoN3y3Wx-zjNC3lcIMSQ1-GLt2rah",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Pug"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NN0aT9vmOE0UaWc6jtouWC9IgfnBg0PP",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Ponta das patas branca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w8RodsOlI5zBC4stv7K4xrhWK1cmE6MJ",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pata enfaixada"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18Um4wngvGkoNbqpCt9lsfu6dkyXq5apm",
      "location": "Lar temporário com Giovana Schneider 51. 996403232",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Porte pequeno, pelagem curta com predominância da cor preta, focinho e patas em bege claro. Foi entregue no Stock Center da Manuel Elias em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10mKp2xJSziOp5ReJ1WbEfWy4A_6uuRvM",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dttH6I1LnzM7GV4iYHRQ12kegy79XGpv",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Pelo longo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1f-KY0LE3OJPP22RZROEArGC8IptbbNyD",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mv2dV_DMaUR1Kocj-lBXlO06ziWipreP",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1c5ccEg9GO_JfjznEd_XePZ3Lkzn4346z",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": "Olhos castanhos. Patas e pernas cheias de manchinhas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rU_vdIGS87-4dyMYBnOtrrATBbpmHWb9",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fn7ZJrb2US3MVjj10TJfSvEeKMmcgDtt",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "colors": [
         "Preto",
         "Cinza"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Todo tosado exceto na ponta do rabo e na cabeça"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MYpYMFBr9U6L3qdOsHFkIzWKBnHv3uLJ",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GGsCXCDTtW673aQ5fqBZWcxCPvSSpOv-",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1O1aRk5USpa39JU210toHmGCv15d6KOQV",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Corpo escuro, barriga branca, patas claras"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16OoYXoBknHbrANwGYTvuYVZUGXljqQI0",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
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
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1X2k1-hTsEgtfTHio1hlKvdzKaFGEIlXW",
      "location": "Lar temporário com Renata contato: 51.9808884699",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Macho, porte médio. Pelagem curta, patas brancas. Foi encontrado no viaduto Eduardo Utzig em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18km3vmCj9fqQ8L1GX7NINYAZFl8nq5rN",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/192czzQTMPuVilbEHqOdE0qxsb46KZLSN",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Yorkshire Terrier",
         "Lhasa Apso"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Mecha de pelo preto na orelha direita."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14MBHF923d846ytNQBqvunA95SaVI2aup",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WSsxExgJyngQcslvyzdp6dqbF41L9_yN",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1z7m03tC96kuBR2PIpv5lctWPfh96fUKE",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SgHzrvHfQlC_lwd7kOv_ZIck1Hy_7qZL",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HL4_d2iVLopac-irQ86Wv04fAsNKDiSF",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dGhr3PX6AX-Mxmm0sGbjhxWj2kbWgPY7",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KhZy3ub8UKCAF0IFKTFmpBdKqH4h_EEs",
      "location": "Lar temporário com Renata. Contato: 51. 9808884699",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Porte médio. Cor caramelo. Foi encontrado no viaduto José Eduardo Utzig em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jcusP6sBW--2vdRiP6QVALUeRqWtytSP",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Her3AKMtzQdekwD62syhWYNRx9ANuW-m",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19Hv-Cdtct6HTaOP6vJ7T8VyZN4tAVkU5",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1z5mSZxysPIwh-8WcYDNSxU0JVoDq1n3t",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Zvcsneifs1D9CmF2EcA_NnAmjU2hrJsk",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tPjVuNy9emnqHr5NN6YTx1FDR_VREelK",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
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
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_eYL08N6f76flCT0Kmcn4E88NuMnHZ8P",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OCaDkupGkefhL1yi6MenPE2WR2ucyHHs",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KCmRcv0Ja5U62du5uJvs9HfoegEArXIT",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12dCbkm1IHHXik9bRYxseBam1nRkzwbZU",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GT0V3XFZyNBD6QN6GpvVhXfFfTyiHEOX",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aKd6mwb5QA40HAtSYypwQw4FUGTp0_5o",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15IWsRh1EMlIu_5U2txXUoFXg9XhDUzyo",
      "location": "Lar temporário com Renata. Contato: 51. 9808884699",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Macho de porte M. Pelagem preta com caramelo. Focinho e patas em caramelo. Pelo médio/curto. Encontrado no viaduto José Eduardo Utzig em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15bgKZO3UpawFTY3zfjJrm2ijEoCNqIBu",
      "location": "Açucena 1547",
      "breeds": [
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Mamãe com filhote"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1t6znUDnRQqecvOGKjBfVBQq_Bcxuz-2t",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Cinza"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1R0Ry4tLBLM9dHGCWpYqrvQrbQYIjwHc2",
      "location": "",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RhbIycSFLdKbELgbt9l5MFkjvxCd7ur-",
      "location": "Açucena 1547",
      "breeds": [
         "Pastor Alemão"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ljkj5ILuFLZn7gNWEXTlN0W8qzWOk-xD",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Un-2QkytWXlgq3TH3ccwrLBGe_9VAJAa",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1i9E8Qt32tCxMw6WDAyg_mG1WN323o__2",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-HiOsdJyCkeWYDbcHv2hhwepQp8xkx-n",
      "location": "Lar temporário com Renata. Contato: 51. 9808884699",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho, porte médio. Pelagem curta. Cor branca. Manchas pretas. Possui mancha preta ao redor do olho. Foi encontrado no viaduto José Eduardo Utzig em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yEu99plA2B8zvVQ_PrNgjnV1UOFE2Lgl",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Yorkshire Terrier",
         "Lhasa Apso"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Castrado. Aparentemente ainda com os pontos da castração."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1d9Wbu1NtLK6QgmRZwHrqF7Uwq3RFRXjD",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1l3rE3eCy4H5hO4b_OyIo0TS-U-XqnmIo",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/112SzwxZc6tL1uQIs8bHzRPW_IssgeqPA",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1giNBc_U58MGgJBkTSMxRDXP7y4W_LEiJ",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Pinscher"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1iNcYT78qN3kHSXpcHrw2u8wI4UVgFhrM",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1llj6Syeikx5G8RlveDRfqjgLgBMSHqLa",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Bege"
      ],
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17KS5KfdKQ67kAVGqwi-3UDMAsezaHn5i",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1X5CRLg8IYb1R89Dr8TE37s7B41gSB6sW",
      "location": "",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WRSjX-ufV2DVk_xS3tpkqJF2NLHB48Bj",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11NKSxy0pTZuFqCWhTDf1cnNeP2hf72NU",
      "location": "Lar temporário com Nicole. Contato: 51. 995550212.",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Fêmea de porte pequeno. Resgatada no Sarandi."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lJJL6p7j_b7CZNkQQoEtH-kqQI6MwdjT",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Gukid9WNs8r_HTFNZ2uhhpRsaW9YMjCZ",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vfce5ZVtst-PxG2OF0lMePEJoo-u-Dc7",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1i3VgnCulJefjqmWtD3B2nVnH3r1ov5oL",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-UQgtEpGl3RpcJ77u9BRNfs8tvyxehLu",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15IFoLLFk8seZtVQq4C11puiE5YI4Jo9B",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Chihuahua",
         "Pinscher"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1POkbsmjrX7qjY04QiJzWW2X2IJecmc4g",
      "location": "Lar temporário com Nicole. Contato: 51. 995550212.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho de porte pequeno. Pelagem branca com manchas marrons. Foi encontrado no Sarandi em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HRLJPe9hwfK4PtCxaZDVh3pBn6eWwBNh",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1unw0frGD5Sk2hQNo_ufeMPDi_34ZmZB_",
      "location": "Açucena 1547",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Pa_JyG0SiigQU4--kHrEPrZoYDTzdNBF",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qSlhi7ow8doDAi7lHnNw1DLezbh1yc9E",
      "location": "Açucena 1547",
      "breeds": [
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Duas Fêmeas e dois filhotes"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bRGk8fPaqB5b8pfrZOtHgcCejS-CnpEo",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Border Collie",
         "Collie"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lPRuSpaPaRl_68YEvnpRvJGUisu54j3k",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14HckMuhiADJjIC_DF3CuTQ2v2k86eXU_",
      "location": "Lar temporário, contato pelo WhatsApp: 51. 991489009.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho de porte grande, pelagem rajada preta e caramelo. Foi encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OcthQkv-4YHvyKzynMwXcKfMJ3dRrF94",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17Cue7LfVxks6yAk8o1GJ0Oda3XC6D6l_",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1h6obPjEVxGSVjKy7CzrCHPhwMmdxcHxa",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1U58iOjQ7QdvOZrNvdYqTN2mXnBAGhKTm",
      "location": "Lar temporário. Entrar em contato com 51.995451773.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Fêmea de porte pequeno. Pelagem branca com manchas marrons. Foi encontrada na Rua Benjamin Constant em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EVsi3zhdLmB6-1Nzm-tWfPsT6gKyxQO5",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Bege"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12UFSHlT9pCUAnvUgJu5K-Gn-mZxp3t7o",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eroV38r-Fs6x4R_XYjlYRkCXubuUcX74",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1G1BA0NQylAOuwHNBFM_imNwa2d6baA1Z",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/178svG8nAYNj53CIKebJQqqos_tXTLQMp",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/159YHK4qTJRglsCMqRVAylP291ZE3HJai",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Pelo comprido e manchas nas patas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SSumMbHiM2PElIFLLlqse4ycKiAweUh9",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Peludo, barriga branca e pontas das patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rKimiiy52ha_p-9zmStBpQ9oWUWO4Hbd",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Dl2TapMQz_NyfZmSxvafp8RVe49Iebwq",
      "location": "Rua luis Mauricio Scolari 78, Igara",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1S5p8utoIONEqRO-Dg_kawoH5s7ECjhVY",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kmTLqtYy6oGRbG2maW2rYdBEzzn-Scd7",
      "location": "Lar temporário com Luiza contato pelo Instagram: @luizafantifisio @espacoprobicho",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho não castrado. Pelagem branca com manchas marrom escuras na cabeça e orelhas. Tem cauda longa branca com uma mancha marrom. Foi encontrado no bairro Sarandi em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1O81na4Z5s6bwX9KsClwVInSD6d56rO3p",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/191AwJr_E6U0IyhwEUL9BcmDG-uOOmi2F",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OxY1L3vNT6WPndVaVuSdFBmfLoySdaHi",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JwXTtceG9FLJZ5MrKnQjZb4SytIbFZt5",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16pmCFiozlgsflAfJ90riTSWFTulg1kHz",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OvKfjLoGj8VDYjnv7Fgnpi_GlC-Bs0sY",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Todo bege, com a barriga branca e as costas pretas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PAPkJ9xdIOR34W41dTMVwZOddLfI9ULJ",
      "location": "ONG 101 Vira-latas. Rua Sete Irmãos 190. Bairro Santa Cecília - Viamão.",
      "breeds": [
         "Ovelheiro"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Sabe comandos básicos. Pelagem longa preta com patas brancas. Foi resgatada no Sarandi em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bm-UyY46lwkoCMaFp0pb0nTcCcwZnftk",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pelos longos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IrNE4jnGloZbHZ-sLdLntBs8Q4yi7gUS",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Schnauzer"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-IoRErEEDzTfpVGYoYmCO6GiRQInFRmB",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11CvGHCBpEhS_9y_gLWnUvUn78WsDFmnn",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1r2TvLCc2A2f2P-1YKIv2zHDk6VarhJyS",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15DHKfPVP9FJWAyQ1-GaYZKe7pAgWbWlB",
      "location": "Lar temporário, entrar em contato no telefone 51. 991489009.",
      "breeds": [
         "Border Collie"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Border Collie. Ovelheiro. Macho adulto jovem. Foi resgatado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ItztBgUKL5unXl_OZ8bXqAbhTbHJrJle",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JZKI1Ts9VvUHZvBcmvmBrnbYFiZBDC0h",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dNmPQLLOFEk-9SKm769v6TwZoDHInFJm",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos esbranquiçados na região da boca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1iEGvD47IO0J6nboIeoKIz1zxSifv-gbA",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11JwrZqCX7o4h03Cg3qcBjIfi7bOlEvtj",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1spYlgEw1kWdgzJ2cF-1LDl2hleG7geIP",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1i1mHqmmdoXHQqBb8Bjs2VZIvzLAMVkbf",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Mancha branca entre os olhos que vai do focinho até a testa"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OpcehU7Yv4QXK4j69IwbwJxnNGBOe-rp",
      "location": "Lar temporário no endereço Rua Dr. Barbosa Gonçalves, 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Foi resgatado na Zona Norte de Porto Alegre. Não sabemos o sexo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1poKJNZLSKGstkai03N002-_bRIU8IYv4",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NQjQueCTaUA7WgtT-IZAXRXkj5n9o1U7",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1i2nRFD_sVFgCoOqPAviMZ98lDHzcwUdE",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TWZVI7Bo_JFP5sofDvcDikBBZ5NQ-MaI",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Pernas curtas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fjXYs3GSUHXWUbZZdqYTgqvVGKvCU_y_",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15WV5EcAdt5th_BdDGeeNROTZz3xKCXCt",
      "location": "Lar temporário no endereço Rua Dr Barbosa Goncalves 61, Chácara das Pedras. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Foi resgatado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14t-2Z2cARtPBgYWMLT6E-dQw_u0M0U0e",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yP7-pFCZAUFzH3A2yDxLx6E_3-RWJCX5",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aek3mJEY96itdQuYFPa8TkbBtSiNnYyi",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Rajado"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vBacmrPRqtNUONE9ceM51Mi3-KkWivyO",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DGElPl9KiR4CMaBZVU2nAR0VoLff7_oW",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17Ud2O77XELxgNottEWHC1OrVzWj9MA7i",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Foi resgatada junto com quatro filhotes na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1V9t-RZbzm86EH5Pkb3X_4SnIhlGDogaS",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13NWb5GNfC4LrtJvxsoztclipWz8OMoLz",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/130kv7CGLA_mtndqVZLN1S0x_iEuDMAkZ",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Rajado"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1321K4_mDl5sEMq82VJ_qQ5azSLSCYgAn",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Rabo enrolado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VCG1L_54HRqmSx53YQd5UYNa8MjBGzHp",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Rajado"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12Dd7TEU0DQia8MPYPvhb-JWvG0kMv29K",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Caramelo",
         "Cinza",
         "Rajado"
      ],
      "observations": "Com coleira e bandana vermelha."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hsg5RjczjR_wlMEEZW0TfUixlqvFTx9Y",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_ecY766PVr9jZZJaw2BlTard3-RAud2k",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "observations": "Encontrado Zona Norte de Porto Alegre"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13P2640tqotP3PajxDQhhyN7YjGFth5Il",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Com tumor grande."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1m9PJOLy69Hd9vjQm_WzFgj2ajenqNHg6",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Caramelo",
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YhP5rXVXSP_Vr6tltqUNSEYF6CiUIoVD",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Bege"
      ],
      "observations": "Encontrado na zona norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xcBK4eRp0b8vSQOAlHRFNurptCrm3m3G",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Patas brancas e pelos dentro das orelhas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Secd8spvTF9h0-kKmr6GoVapLs_196mB",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AzhAUHew_g-9CL0wrrGs_dhFw8MtA90a",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Rajado"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GlrCUQ9hs5LPbM9Q020N2R0PA62OIeLi",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RFTX8nIwA2RzMRJiyk7xtuMbFosClE5T",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1m3TC8jd4BYLWeJuLJSk9SgbTU_HBjNYM",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Amarelo"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16ccDraSTv48PTIaIaSy_Q-sDxdWklnoP",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida",
         "Boxer",
         "Labrador Retriever"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Olhos castanhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WUegQogEyg2l_W9UFXnO7uIBo3PyGUyW",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Focinho e barriga brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1s-u_uTV65rzFtVYltGOecJtGMVcdUQBa",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em branco nas patas e no pescoço"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Uiot0UB30yv_zqJm08_ECq-TVmW2Yq3J",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dnO_lr5GjBUwzuZEDNwMX9CXgJ9y71cs",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Y3x3W8txMNDw9d6-03SuP4cqTvGT0WgP",
      "location": "Canoas. Bem Estar Animal (Avenida Boqueirão, 1985)",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qU-WyMARsshYHkOdgCC1NZuDAVGIi587",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Cinza"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Corpo tosado, cabeça peluda"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1G0Misj_WCqdIDGjN8tcKcNHqTCQQa0LO",
      "location": "Lar temporário na Rua Dr Barbosa Gonçalves 61. Bairro Chácara das Pedras em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Caramelo"
      ],
      "observations": "Encontrado na Zona Norte de Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1l4A4wRVxHv-wvMVNRMRSL-48Kw6PfHEJ",
      "location": "Davi Canabarro, 55, Gravataí (resgatados em Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12rOptRGXd3O9xcX0D-Ec7qGbLVTKYPqf",
      "location": "ABRIGO: Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "(resgatados em Canoas)"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ziJAhTt93vicXlWi_d9V6qbPKA11c6-y",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Deficiência na pata esquerda"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1plHpDPnn9QSs54Wz-YnFvX0O8S46d0_i",
      "location": "ABRIGO: Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "(resgatados em Canoas)"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cs2gDEBx6pKbJxf8aHSOga3833ctVs3y",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "(resgatados em Canoas)"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SHYzDb32vahu5cycPqSFLfkqYd7V8WQW",
      "location": "Abrigo Casa Iguatemi, com Priscila 51. 94448484",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": "Macho jovem. Porte médio. Pelagem preta com mancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MS89KWNiWa6RAGX-trtI9gWHo1AsD4zj",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "(resgatados em Canoas)"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13jMojC8WNSv3yRFNquKLSNEX3wwKhHF7",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Possui uma mancha escura ao redor de um dos olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1J2pLYdLEIWb6bWnlx-sAkIojnTKLzcft",
      "location": "Davi Canabarro, 55, Gravataí",
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lF6EZ4kekjl4ciOXGLI4tNHABnjLIt36",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gvNB-OMvLmLld32UrgImaNh9cUbGejjA",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ByIOEh_9o1_dqZAvwwbxKogEL_IaQgS7",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nhONwh1Or6JxaAtMNSJ7nYCyRYizHhiG",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PrrWvxuIbHFKhSRjsjOvC6-c4m2qSWX9",
      "location": "Abrigo Casa Iguatemi, falar com Priscila 51. 94448484",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Porte pequeno. Pelagem caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JefYXMwrjNegYwlyWeOakNm2AHFGZdyt",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OybS_4T3a1ssMSopiFTD6IM9oO6O6zw7",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12_w2OqfepEew7NkkXxPAkeaxcJQWdmz1",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19yWYTK878g_PwwP2Zck46US4lqfcbsCk",
      "location": "Casa Abrigo Iguatemi, falar com Priscila 51. 94448484.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OoOwFLWvXuttgNoXVDoHTw0nupFxrYfv",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1__QWvPIkXKGttcTR811MVuReBg2pCJ4l",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nIp_wbmq4JOhnke3IHv6MlSv7orsqRZu",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HomDcn7BgP1aeR3CzoZk8PVZDAG0076Q",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WVO6ffFHvhLyKDkieWd04szwae64gyiO",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17YixQzhtG15E0TwZ1ykhUcE_Ved3DtfL",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oy_i0olfx43ZvLxrc-NSwCEo91jMdJj2",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UXVvyqzUACPC9D22HeQofbOcWK6pNkAP",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Boxer"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wryZ0LULSeklZCTRgxRGsCbqMwm0BWN8",
      "location": "Escola Técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Parte patas brancas mancha branca no pescoço"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rEKb9lFThNLhQUcI6Spw69-OW8A9TJK7",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wJ3mzpAQfQe7VUVtE6vJM1FrqrtKaAOw",
      "location": "Escola Santos Dumond. Rua Caeté 328. Vila Assunção em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DZZEqXmiUYYe2eZoJCePrkOfnX6MFK_j",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/145VtC4RjhkXIxlgBe7WchcjXLNDJ_y9Z",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mh_fVCfLkfyhGbCTTJrC2TEkAtDbcJ_S",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pTa_rKzAmha0V3-TJBiJOrVMLx72-Wkq",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Bege"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1O8hcajpCZB_xbbR1JSml8-A5R3Nx4wQ4",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19HIjzgXL_Wqv6k02UIG23bXIfeRiRIBY",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bGLWPHmeIMj6fA09qDkh0QRcWrfhUW2N",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Mancha preta no olho. Resgatado em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16a8h-ovbWD4izGOkzAXpWVHxyC7GVpsD",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TOKrO3jTq4w-k8gQwm3M4E3qXf9VCWG_",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WHHjbheec2grRFrfDS9hxbCyyoRTOyEh",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BaZrbFN4mnMcFdXUzAFxUzXUQOP6a379",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13hpY-FmwTmMCAzuGf71zsbF3n-vlRn-D",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bujEkqtkkW1BedoeXsK-6JQTzxE1Csdq",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UhPWQaO3WEzzAU27YKt8LsPrVqdLqsDQ",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vqXoM7wnIDN2lTWRCudqAfnWLRZtiUIW",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-lGyT0UvEvaBM0150TjJNBC9lcuNBcG7",
      "location": "Davi Canabarro, 55, Gravataí",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Resgatado em Canoas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wr-AgxBGR60rUfgPSWXlVc-50qBTxai6",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Prenha"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qJXufvDwAlmN7lYxoDtZs97QYpVIfmv8",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos esbranquiçados na região da boca e na ponta das patas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14elBdkEYmxJOpbL3g9HbJUImjUG9VycG",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "Rabo metade preto metade branco"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/132qXefQXLz9OhOF09pevb1b9bPrptHNd",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Patas e fuço malhados com marrom e preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1J1IZYTwUFyYLR6JqzJx36QQ495na_ZmC",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Patas brancas e corpo predominantemente preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AwoMpe7gqjCpy70XYZc9k1NgLV0hUVrx",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cqFO9DCEuerNCaHDd2YFR-Lqijy7nvkK",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1teea6PEvUH8YOX8J2S7-y26qWcJGgq0n",
      "location": "Escola Técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Orelhas com detalhes em preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RqsEJKFxy7YhM6JnmgUunG1Yw2uC5TeQ",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lQUV31V3Km2JWxJhmfs5T8IeVTW86PCX",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UkmilESQPvGeuYfTUG-iDOvWhRCcvnvz",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Rajado"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SiQfgKliOn5xiTZiPSRmkrr06_pm76q-",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pug"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Rajado"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1322vBl_JluqB4ASYHZZVQ05YQyOZT5Rz",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pelos compridos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nWDaMTsLCl8bzcFFuKGxRv9Q3g2SSsjG",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Poodle",
         "Yorkshire Terrier"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_JX5eVaRgas-Kbv5W7Zvxfh1OSHDdmpb",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Possui coleira de couro com fivela"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Tkpv1drD6za8qy__s4ipm4amf5_f903Q",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Focinho branco e patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JxRHHhF6eup9A7Nd-CdTXRHtNGkyGHt6",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "barriga branca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KHwGYSggOJiKXFXaTd8_LKTK4iTthloU",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhe no peito e no fuço branco"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uDPO7RzIf0KPgqgGFDzeTgKswO2jkKWi",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bA1POdHDXV-cTm02PmCp16R7NytkwLli",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17zbhWpJxkl1rzAMDJYTBIZa2v4rDmOor",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12ITtG5o5HdmHGIdWV2pDq5Vv0CoEkTHb",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LV7zipIOzgKpzpT-n7ToKXa66ux-sSGT",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Toda preta"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14Sn5o_G1_hFjvSBdYIH4iHO-jP2cIHQ4",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1999Dye0tbRz35-81CKv8HoBCBe2FFuaR",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Bege"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos esbranquiçados ao redor da boca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vJiR1Vq7Lf43jxks6NeAp2DzeYEoRXzF",
      "location": "CAIC Guajuviras",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10oy4L4dl6Gf5TqA2pcTCgXRcw-VRhSA-",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "observations": "Cachorro pequeno. Pelagem média, tipo poodle. Cor branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Uk80gzMDII9umlXDob2MHUtBAAnvMijt",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Patas, barriga e focinhos brancos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jjFCfgZwOR4RjM5wnNfV-lSz7Xjd8l-f",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "observations": "Cachorro porte médio de pelagem média preta."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GODRa6syNy5XxC2Qx1dlnevzbOfNFgk9",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Cachorro branco com manchas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1N3PPmhc4HHrl8W_kBqNUxZlhoQGCtcIe",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xBrImNtymMdrVeMIHdnW6wpmqmSD2MdC",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Língua roxa, parece ter cruza com chow chow"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14twgk48aKpFisAbqV77iVYJuIWBdrG3J",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IKkjCU1LzS32w2-aHfMalBjJ6TOEpp-J",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Rajado"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Rosto preto e corpo rajado"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AA69-bbpAhJY8ntSZPF1mx4rr5FGWSVa",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Boxer",
         "Pit Bull"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Amarelo",
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Olhos castanhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xW71I39wWxxQY_gcyWnxf97I8CyXPNGH",
      "location": "Lar temporário com Karina. Contato: 51.993588920",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cachorro de pelo curto, cor branca com manchas marrons."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-x_tA0sV9dY_J8pp1NcriBFCSnm0fKOH",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Corpo todo branco"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MciEwSRfjhd9VSKBc-pWl9ZJNaIoEDSX",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Boxer"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LlJz1fqLS3NbqVhJaZmpGcU_EhOi6hNp",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Focinho com pelo esbranquiçado"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ef7pIu8XyFY-sKX8bWLppEaChBAl3y0K",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AptGfr2FTFF72p-Icyg2ZsZx9b27tIh0",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "observations": "Cachorro caramelo padrão brasileiro. Porte médio. Cor amarelo claro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xo0TFmMKFtjqYC4mtpeWDu6DqY5UN75W",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Amarelo",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GRkP4P3P8T0w8uct87hzdFq2_3NyPSFE",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xVlYAZ8NA-gTXwLLG8arrtEyvT9VSkaM",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Tu_iI3lS8B5PAt8uCGcYCLyDsJARxSac",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Chihuahua",
         "Pinscher"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aXs6KDs7SjGFc8ss1bbv_ccyPFOjKfIw",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1T6xJKiFqLThcPpvmINPZLnto1S762xGX",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Cachorro de pelo curto, preto com mancha branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wq7OSVlOGMCisJwowkzuY2yQgdw1lu9_",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Chihuahua",
         "Pinscher"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YI5lwvylAdSZxjJnGx9gn8Z3GYOwSwek",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Rwp1UWdhSQaS0Xb2ZHDdI7SxON9OPnrM",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Cinza"
      ],
      "observations": "Cachorro de porte médio ou grande, características de pitbull. Cor predominante branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oAZ9Nx4dcJ7zHiOwtVkMLwqQqwtC_LCR",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Cinza",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bZuLay53MsY9vaWGMUj_iSJzc0ReB9bw",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pinscher",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos esbranquiçados próximo a boca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15etLxwxmxE_qjRat9OIpD_eOwiZ7K0R7",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Cachorro de porte médio, pelagem curta. Cor caramelo com mancha preta."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1spwNqntQdQRnrxJ5x-BTc0PXpSYXU-81",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CkxKEsTrw-MbHOImQa8dcI0JZO2TIkEW",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Castrada, detalhes em branco no peito e no fuço"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OSHHqAPJr7Iqfqcp1pkEDRGhyIkSV5i0",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Pontas das patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18wX7LTNkLlb8MaQasAUY1n73K4MAoboS",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Cachorro de porte médio, cor branca com\nmanchas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1A6LhyJMTAQ1PVbPHpCveO12YQg6rEL28",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-wD9dQyvAljywu6685d6Gij1u3arJ_C1",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Boca e barriga brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1L_dYv3HVWkOpDD-1-2PB3zamGUdHcnd0",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "observations": "Cachorro de porte médio cor caramelo, marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SFOC51JrJcEsmQoY0zzStym4i62MtNQA",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Mancha ao redor do olho esquerdo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mVxKJ1xAsXCIbW05r4NdtQeGolSk1k6y",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Y1xbshiDviKzJiGT-4fFoO-PKHT6cDzw",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1s7EdteUYTWcbYM8QStdhVIQwviY8BSv4",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Cachorro peladinho branco com manchas pretas. Tamanho médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TPzBDloapqjHiPc0v89u6OgIGA7LOSrs",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Prenha"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DEAmNpAqWhIH0-Pa0Wo88SjxAT_oKGTU",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Rabo e orelhas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1C0bY-dHN2PQs_pqZ4t2TC9v30CgQvoqu",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dxUMACGlK7nYoC1dq_l-s64qLuQiugCw",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "observations": "Cachorro de pelagem preta com focinho e patas marrons."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ywR8Q0hmWCLtcOhYQ-x4i83V02ddzldo",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HQ7Nqus5gNvhbyeHPJpXUPFzBP9HJbMq",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo",
         "Caramelo",
         "Cinza"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QFMBJ2sEVM-AJUcD_8UdYCljbXfUQVH4",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Cinza",
         "Rajado"
      ],
      "observations": "Cachorro tamanho médio, pelagem rajada."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GBC4oc03dYcOYBJ3H3DfdcE24ebGfdLp",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1x6XocyY3Fby4s_G_9VsNfaGz5PXt2nOm",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "patas mais claras que o resto do corpo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hdI2rvPCaahb2kl9_30fHdjO8V9RoGpR",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Patas brancas e caramelo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12GrUAXVI3rqzZSfKDpiQ2EIe-Ih8rsY_",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Amarelo",
         "Caramelo"
      ],
      "observations": "Cachorro grande, pelagem amarela."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YiYISQN1VEDDV2VpqWu7V_S1doARcbp-",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Caramelo"
      ],
      "observations": "Uma mancha branca na testa quase em formato de coração."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DfG3fuH_MzzWIpSHhWDbj-nk8Bc9Iy0R",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Beagle"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1trbTrRukwOmlFYhrO9Kb2Tmj9cDETChL",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olho direito fechado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1M6vb4mB_QK05WjWN3JwkvMwyz3gnHCbi",
      "location": "Escola Santos Drumond. Rua Caeté 328. Vila Assunção - Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Cachorro de grande porte, preto, com patas cor caramelo e manchas brancas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MkvQotzqSlbmX5UqEq1DEncpFpOvTv3T",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12KWARsyIlT0ebudRqGIoJXZ4uxYg_jma",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YrUKQGNaHNaGHF6SWoza0dB5a02eQW8Z",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BA2T159RcMHTkGff_WAAUHBOGtukohnA",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Rajado"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kL6n7ttofN79JITlx_aln0jwpEf2kLWa",
      "location": "Lar temporário com Isadora. Contato: 51.995484631",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Cachorro de porte pequeno. Macho. Cor bege, caramelo, cor de mel. Peludinho. Pêlo médio. Foi entregue no Pontal em Porto Alegre, provavelmente vindo das ilhas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CmLF9n2jSpS5cEWN6DTwHIeBDax23gXs",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GDOjzPEb_BgFYh3HOG5H4Oox9x9Dl00Q",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Corpo branco e cabeça preta"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ec7WCgKa2HNhbmQ1MrGBhboEaVxfOYpe",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Rajado"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelo comprido."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1k5rL5p-utFSnZYUvPZ7Ouv3sysUIzVMa",
      "location": "Lar temporário com Isadora. Contato: 51 995484631",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Cachorro de porte médio, macho. Pelagem curta. Cor branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DxuQBsvnAL8SUJcP6jjMSbj5AxIgfxD3",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": "Pelo comprido."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1s43XNN3l0YpMTkqKRpA5nKuEpcfP-WNN",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Chihuahua",
         "Pinscher"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olhos esbranquiçando."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tWk0AGqADPSrFh6AUOupo6rqbxaYdlNG",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19eQaEBGwp-sVP9dNkrOQcSSD4wiebXSh",
      "location": "Lar temporário com Isadora. Telefone 51. 995484631",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cachorro de porte médio. Pelagem rajada de preto e marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1r_LW74LZ_65VpUAC34MQUJNn1QvaR741",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1360pItBjUgMtrnJ6zIvRSRmbURmvGRyG",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Amarelo",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tDTbxvdKDtVt3pxqS56RTpDtu79SfnGu",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kUphqDDYzcSeMFlYWy7bksT5HLS8aQRB",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Q0KFMQz9lmMdJ0s4kValBV2OCoV0jPzT",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sbNWWOpiqA6oBSzIK6MyGBgfIen8meez",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TVrhnb3D1fcPJq9ERWCcg2tvs9_WrDTg",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1riMs2rws-SJ0zYbimjVJe60S7e18RPff",
      "location": "Lar temporário com Tissiane 51.999361123",
      "breeds": [
         "Sem raça definida",
         "Sheepdog"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Cachorro de médio, grande porte. Estilo sheepdog. Pelo médio-longo. Macho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uWoy1k1FuMSlvqKCJ3JXB28Xx1B88x1R",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão",
         "Pastor belga"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Rosto preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cjD4UCTcWDhFbcvLFUAKwMZvVxhIY3OG",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZMW7KYBhtk3_ZxR9V-zUQXm2zPGCEK9J",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13E_cbZk0PEn_RZ2qlrDbMC4xeXp_nTTs",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Yorkshire Terrier"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo",
         "Rajado",
         "Laranja"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelo longo e patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12axY_nMKGQCH5J9KuV_51bGCJ6dOYBNJ",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TfavHom2SYzOfRWaKwPW7FzzNOCMJj90",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Ponto do rabo e patas brancas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14wPgb8Ry8QjVNdG1E6SdQ0r07qioBs_P",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza",
         "Rajado"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LJDda-UWXZwg6DAedWp4zwo_6j5jBCep",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelo esbranquiçado próximo da boca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11KHosoLaYhO2xuAvooSB5T1HBJ1qXACn",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Border Collie",
         "Ovelheiro"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Com bandana verde."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PAJ1vIhY9QHDrsztEyU6W9NZFjU3-81I",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Rottweiler"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14Fz292RPRqInGyPNSVJ5nnou3LQmPNMp",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/174JZim9IutNIC2tk8gohpWacgY2AQFqF",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Está prenha. Tem bolinhas escuras na pelagem das costas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1laGOvpHTdDxrd-ixK4SOWxf6AZvdYb_j",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ItsE1OQS_x-aM-tPP3DgzMbdMGvZTkbn",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Corpo branco com mancha preta em um dos olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fHZT4-rCaEmy2vWVSUYAWLZGAIdUb-N2",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelagem grande e volumosa"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BEkDIR6VIpOfrhsy_s8NH3oPUwFpPTNR",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zYKbdCW-I4ZQ0nBwZ_KvC64X8uL2dN8b",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Border Collie",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15ZA1IzXhNXu9RtAd5OQZWUaXoUHwDkyb",
      "location": "Canoas. Na frente da HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/109JEjN8SNKz8vG5g8DSVfplK3W-x_9Z5",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18l9ohCVDoT3TbDp35hrgZluegAJ0Iceb",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11Cj6AubcIlUH4TDjbYeXk8GX_rgzoEo5",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Mancha apenas em um dos olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OmNgIasuLQvNvtHKx1OQPs_q8DFNU-MW",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TpxeTlbsoGTvXi1c-235rt_IUMxTDhgG",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vqTQ8Ff-javUZ81CDQTc-e21YsiBTHSa",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Poodle",
         "Yorkshire Terrier",
         "Sheepdog"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelo longo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wuH3w1KC7UpZoxKHS5QjHfdtdqpeqZ5e",
      "location": "Escola técnica Liberato",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11cNEhSDckZTquigmg4WBt0aZeXakbZ5q",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Poodle",
         "Shih Tzu",
         "Yorkshire Terrier"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pelo longo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10sqzD5KgVgPlvIvrpNebe9gimBPGdawD",
      "location": "Mathias e La Salle (Canoas)",
      "breeds": [
         "Sem raça definida",
         "Beagle"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Patas e focinho brancos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11-kuttHaR1kl_jgkilBZPKMVa5_6V0bu",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Zu10cAefIIwb2g2OCldyK5roNtK0NXYq",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HDH14voKLOTygUFHzWVwXcJhYYcLOIX6",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": "Cheio de pintinhas escuras no pelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1723yHyMzQSt2ixc8PlCdmNuNLTNygaLY",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MKkPr2GF5EiJSpk87IwKVUP7oZ_TDgtI",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1y67OhGaJYwSiCghtOev1-FGbypVFYSZK",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SynGbuIbIz2ZN-Jzw6jVtTEV_BlqAQi7",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "observations": "Ponto do focinho e orelhas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NittDcs9NQ1jxwcLTwdG4kFAtRsZBg6b",
      "location": "Canoas. Na frente da HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1g5CevDYEU0OzRl_Fb8dUqOgtdZyrwvKi",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Rabo enrolado e levantado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1t613ioSIbfB7WWJdXOn1JGRz-aT50eDQ",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1swuuogljXrUliBufOJmuSOD1xXO-6-EF",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Castrada. Resgatada na Guilherme Schell, na altura da estação Fátima."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15gpfPhhTezSQ7K1k-tK-mzzf3FR0Nu_6",
      "location": "Abrigo Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Caramelo com preto, recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1XkVaQ3FJf0FHrLZDjRzMfHdUuh80_eyA",
      "location": "Canoas. Na frente da HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1D3u8DCZ2Y74LRlVP2PcelfiOg-uXl_SE",
      "location": "Abrigo Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Pelo tamanho médio, fuço avermelhado, olhos claros. Recebeu simparic e vermífugo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IOZCx5FhKJXjsFFRdSruNOAmvEqwSLbN",
      "location": "Canoas. Na frente da HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EYFrvo72g5-MuYYNZvOPW3o4U80SYyGS",
      "location": "Abrigo Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Caramelo, fuço e peito branco. Recebeu simparic e vermífugo. Peludinha."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PqHXdIn1l5py_s077FF0tsAzl2WrE0T2",
      "location": "Canoas. Na frente da HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nrs_toSkAN1hFpFqEN7XFzhtxK-PpCFq",
      "location": "Canoas. Atrás da HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1F_QHFQ1orDgTEpV-nveNPdr1kXY-aMDh",
      "location": "Abrigo Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Recebeu simparic e vermífugo. Esta para adoção."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Yv6rg7hRDgEzD70biLLPo6V9lA6OQxLX",
      "location": "Canoas. Atrás do HV do Ulbra.",
      "breeds": [
         "Blue Heeler"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Amarelo",
         "Caramelo",
         "Cinza",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1i7kB6QwdauNLnA0v_dVn0DZuGHOcf4jU",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Im0Jle_nyjjFijTCvJu6qwS5ZywEeX8C",
      "location": "Abrigo Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uO-D2QMCMDsMecK6O_Z4iWJSwEkkD7O2",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MVVMyzOrbmyvMuLSC7ank1dvyIPpFuyU",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos da ponta do focinho brancos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ygrm6JzUGsbTBuUzDsf2zLu56_iJmgXS",
      "location": "Abrigo campos sales",
      "breeds": [
         "Sem raça definida",
         "chow chow"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peludo, cruza com chow chow, rabo cortado médio. Recebeu simparic e vermífugo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lP2k-FglC2Z7qP1a73nU565mlKQJnzzu",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Mancha branca do focinho e se estende até a \"testa\". Recebeu simparic e vermífugo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qbJw1mD5CiP26hXyji7mLtrXKV6junbT",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Coleira rosa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xjcTDvAGMyRosOcGin8g0hkkkkS85fjm",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos do focinho brancos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VAn88DuJoIVjhDLplOsfV00_A5OD_T0U",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Mancha branca entre as orelhas, peludo. Recebeu simparic e vermífugo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MyMp9ma1i0xkb_dQ033SLCtn1HwhAHBc",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1j6T-1ERHjV5SkR_0BeG9Y8MSmPG6yIyU",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Focinho rosado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ay5iNB9Q8py7J73S62gbiK-acbH4stGG",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Risco branco na testa. Recebeu simparic e vermífugo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FmR91JmEKahrbjvwKEnN58nyM5Of1c36",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DvCI8MFgZut2Du-jwOZZPXpQR7CrpoRr",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Rabo peludo, não castrada."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wQbmo2wRoBaI9Uw0dSPMDQ7P8E0yXjk2",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1psNwl6R9dBwhwSvjDNgdIonWWl7xy39m",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "Não castrado, recebeu simparic e vermífugo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JVAz-6WTEGyjeFb5GLuZZz7jxEqrgFF3",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dk7VY90LARluT83GY1R0aXZ-MVHFw_ej",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Até 5 anos, não castrado, recebeu simparic e vermífugo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1orv27C6nu2sYDs3HPYHvoWUjLzwHcvZB",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1u5rFvtN9CZamc4goCeXZVM3nxRI4O5hb",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Amarelo"
      ],
      "gender": "Macho",
      "observations": "macho castrado, pelo tigrado, recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YC25Ekbct2Vg4dBokeftAfFHvSxhLw2L",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1A9nuxD-jTcuo0aqJM660FBnqam7cyuu6",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "recebeu simparic e vermífugo. Peludo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13ZB2geVCfW1djlluoC8PuAkN8WkWNHIq",
      "location": "abrigo campos sales",
      "breeds": [
         "Pinscher"
      ],
      "porte": [
         "Mini"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "cego do olho direito"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19G53bzOiFOkHL79LYMY1y0Mah4N6O1IY",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Pelos cheio de pintinhas escuras. Olhos bem espaçados."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hYHlAkkX7Imu52VS0w1NnMnyChdAPle3",
      "location": "abrigo campos sales",
      "breeds": [
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1seg7vp4gFcQZKlieVQXY417RE0y2iDK2",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Amarelo",
         "Caramelo",
         "Cinza"
      ],
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Yk_ZjGM4Whi8dnfvxDkLXBdZHoU6I5VW",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11MHyIfS9s_py1W_IvY1acFgC_QemSfYM",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Cavalier King Charles Spaniel"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1G4kmiMfuA8yl6V1lKKM2K4Uil1JhVg19",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pelos compridos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oRWA9SiCs4Mp02rgnukq9qP1yQBl8iFR",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "branco com mancha marrom, recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hWqrUFpf_OzQUav_8RsMrY4-yMLbL0Bt",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "observations": "recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/189b2c_SwGZ-nCBFa1ywlcbaLaaKKvqDa",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Rottweiler"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Rabo comprido."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OQGmUa7HTvUW41xah8KIf0NMyutYhbrL",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Caramelo ruivo, recebeu vermífugo e simparic"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bm1tvjvroaJPfFCqSMdBvP1Q6b4hObn4",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Srd1sZxsl_QYF22FAX5HpwwzbKNPUbUI",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oCKU5izdR3DPCkuwUmzmTFfFLIT_jA4u",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yPPniD7d7HqkEw11ZFPRu_ruKP00TwdA",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "patas e peito branco, recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11Bsju-LEZcXIqjSXWhZMH9kloqfrQxc-",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DsbG4mPOjWdM7C2S-xxZesMSG7NlHYgF",
      "location": "Canoas. Na frente do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Mancha branca na pelagem, olhos amarelos. Com filhote."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pgOkMp0Ujb_gvhXFbZUMeybJrmmxKyeN",
      "location": "Canoas. Na frente da HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Filhote com a mãe."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-vkYP6H155cgR3Za7rMIgMzSZUsFMUWQ",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "pelo longo e liso, recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/161BsL-7wfNnTUdXC9DQGLTyn5y5RWiME",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16caZzeX6ytgvbpE8pAakpHt5UyggZQFc",
      "location": "Canoas. No galpão da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14PZE0NRUPGKLmT9nX9YyVrzIF86bkvBM",
      "location": "abrigo campos sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "recebeu simparic e vermífugo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uEn9SHGBgJ9AIDqIWPlDPNyts0ItrIwY",
      "location": "Canoas. No galpão da Ulbra.",
      "breeds": [
         "Pug"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza"
      ],
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VVp_z9dQ4i6H7vmJLCcL9znU_cqoqm6s",
      "location": "Canoas. No galpão da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ExY_kH5V_VuZgl--Ke1PJnFE4lchxyCH",
      "location": "Canoas. No galpão da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Ponta do focinho com pelos pretos, pelos das pontas dos dedos brancos. Orelhas meio caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-PkMWlf7aSffZ9zKwdPQf16-a6s49Wbf",
      "location": "Canoas. Galpão da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Pelos das patas dianteiras brancas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/100ltW6VtiR9nOUJk_oQHbeSnkjmhOXbq",
      "location": "Canoas. Galpão da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16q_aagLWytz837eD4MGJsZvHYzNF6ZFC",
      "location": "Canoas. Galpão da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Mancha escura na perna esquerda."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13JsbcQqKwT-ishzr7cPfBWRx8b_PN6ia",
      "location": "Canoas. Atrás da HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bXLQdSeRiAr4gocjFxO9s9Ft5OX5MAD3",
      "location": "Canoas. Contato com @_fabioverardi_",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1G9A_I_j6dW7iahiHOuy3gY-hMZsc5bF5",
      "location": "Canoas. Contato com @_fabioverardi_",
      "breeds": [
         "Sem raça definida",
         "Border Collie",
         "Ovelheiro"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Olhos castanhos. Ponta do rabo branco."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PlPF1X28FGmbxEIWrglcIFED9PemH9xS",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13KjfZcZpgZd4fFRy4qTIOrhT4ndPY-5f",
      "location": "Canoas. Lado do ginásio da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pata dianteira esquerda branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RBCnMXzXSRNSCQdimksDXMOmvPAlvTXr",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Border Collie",
         "Ovelheiro"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Orelhas peludas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16lreLoEr9HRN9TmjTkwaPM4p0MrV52S0",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo",
         "Cinza"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Xnm6ZHjUlT0xeFT6H1b-JToqMbPVmBoq",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Pelos do focinho brancos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BkLS3PyldfWgb2PJ2KnmZpTH8f9fnEWs",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Focinho marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GqmXxp98rJdiSWyZ3QVcuQJ4r96Y1mUa",
      "location": "Canoas. Atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Amarelo",
         "Caramelo",
         "Rajado"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Pelo comprido."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ji0htzyecOTQQqm0erZZ4lA0bjpzwwsE",
      "location": "Canoas. No canil atrás do HV da Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Tufo de pelos brancos no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FXNFkKnQYQXFAnEFp09jMBMPCmmSC3GW",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SiXdyA8JLqjiQHMSduXV7XmPjpbsHx9U",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_whzcwlgwK9GtPrIM38DUhxD06PmSCLQ",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Sx5PlKPGXZK274ErV-UcLRjpV_kPxkag",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Não castrado. Mancha branca no peito. Pontas das patas brancas. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_KAhOy0FjR7kIgpiU3y_qRbUf0g67X-n",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nUz079KMQBfksAVIyoICzJixITgqFHNv",
      "location": "Canoas. Ulbra.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Olhos esbranquiçados."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YWukjp2rmupplpq7BSk2VQ-fwby1YsfI",
      "location": "Lar temporário com Babi telefone: 92 981557586 ou pelo Instagram: @nutribarbaramedeiros",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea, estilo raça “linguiça”, pelagem curta e rajada de cinza e preto, com predominância da cor cinza. Foi resgatado em Eldorado do Sul."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PigTh_qxUEpUWpYpi26MwT7mUoPdoCqy",
      "location": "Lar temporário com Bianca, contato 51 996530549 e Instagram: @bbianncca",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho não castrado. Rabo enroladinho.  Tem um corte na orelha esquerda. Pelagem curta, cor preta com manchas marrons e brancas no focinho, no peito e nas patas. Foi entregue no viaduto da Dom Pedro em Porto Alegre, provavelmente vindo do bairro Humaitá ou Farrapos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FroaBueImIAmCx7CGCBU1LWBtr53OKsh",
      "location": "Lar temporário com Bianca, telefone 51 996530549, Instagram: @bbianncca",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho, não castrado, idoso e quase sem dentes. Muito amigável e carinhoso. Pelagem bege clara tamanho médio. Rabo longo, orelhas caídas. Foi entregue no viaduto da Dom Pedro, provavelmente vindo da Farrapos ou Humaitá."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mfklaFOMJjHv469NAViKg_aucjusrUT9",
      "location": "Lar temporário com Érika telefone 51. 994994798 ou Mariana telefone 51. 980554242 Instagram @euxno",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea, cor caramelo, recém castrada, porte pequeno, patinhas viradas para fora, orelhas caídas e peludinhas, rabo peludo. Pelo médio liso. Foi entregue na Av Brasil em Canoas e foi direto para lar temporário em Canoas/"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11XEhjnxODkcBTFgs466Jk4e9w8WZDiZ6",
      "location": "Lar temporário em Porto Alegre com Isabela, telefone 51. 993383131 e Instagram: @isabelafurnari",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea, estilo “fox”, pelagem curta de cor branca, possui manchas pretas nas orelhas e ao redor de um olho. Teve filhotes recentemente. Foi resgatada em Eldorado, entregue no Gasômetro onde foi direcionada para o Iguatemi. Após foi retirada para lar temporário onde aguarda os tutores."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EdhyKSEK7x8UQJVwtPVJBL9YtlaGsE7t",
      "location": "Lar temporário com Bianca, telefone 51 996530549, Instagram: @bbianncca",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea, porte grande. Pelagem branca com manchas marrons. Não castrada. Entregue no viaduto da Dom Pedro, foi resgatada do bairro Humaitá ou Farrapos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Gt4QDvDaF6eZaytC7b-7pyEy9qOhlJDd",
      "location": "Lar temporário em Viamão com Flávia e Bruno. Telefone 51.993414576. Instagram: @flaviaf11 e @brunomarkus_",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, de cor preta, com cicatrizes entre os olhos. Muito assustado. A coleira azul foi colocada depois do resgate para manejo. Foi resgatado no Sarandi em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1U98wAwAoxongUh9iOBlX7rEcJkFaxLwN",
      "location": "Lar temporário com Renata, para contato entrar em contato com o Instagram: pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Fêmea de pequeno porte. Pelagem bege de comprimento médio irregular. Orelhas grande com as pontas caídas e pelos mais compridos nas pontas das orelhas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kHBcBIEgEYPXxelDbwbMoFgrh_Tt6rpZ",
      "location": "Abrigo da faculdade Ipa. Endereço: Rua Coronel Joaquim Pedro Salgado 80, Bairro Rio Branco. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "age": [
         "Incerto",
         "Idoso"
      ],
      "observations": "Canino, pelo médio cinza com patas e focinho mais claros."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/158kABEkE2cJMP6J4Zwka5aIVlkjeP32o",
      "location": "Faculdade Ipa em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho, grande de cor bege, caramelo claro. Pelagem curta, rabo longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11fXRccvyxe-VpVhbT5s7kJAY8tNQnj5-",
      "location": "Lar temporário com Tatiane, telefone 51 991373877",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, pelagem preta com patas e focinho caramelo. Fêmea recém parida acompanha de filhotes."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Xn3G9hw8I8qJPugLlFxEurNEC2SjzLNN",
      "location": "Escola EEB Gomes Carneiro",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, pelagem curta, cor caramelo. Resgatado no Sarandi em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18JDmmhNZqZtA7TCnaIYVPkUUikNiM9v5",
      "location": "Faculdade Ipa em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de cor preta, mancha branca no peito. Tamanho pequeno."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RiiomhZBibZmEGPV5djly7jbAFrW9Syh",
      "location": "Lar temporário com Victoria e Ennio. Telefones de contato:51 996593716 e 51.986438582",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, pequeno porte. Pelagem bege com manchas brancas. Foi resgatada de Eldorado do Sul."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PA3aWnUFcHAURYVJhBg-aCAdO7Vmqiny",
      "location": "Faculdade IPA em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, porte grande e cor de pelagem caramelo clara, bege."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MEIDNUwlbbHsv5NNgLC2aFrN0a4BmXrB",
      "location": "Faculdade Ipa em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, pelagem curta de cor branca. Tem mancha marrom nas orelhas e num dos olhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rfSDBzl1dzjLjtOGZjFyEKqQ5RRZDsII",
      "location": "Faculdade Ipa de Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Idoso"
      ],
      "observations": "Canino macho. Cego. Pelagem preta com marrom. Tamanho médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Z25MgNagqoRHkE-FD-o8G-msJDEo_Pe_",
      "location": "Abrigo da Faculdade Ipa em Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho. Porte grande. Pelagem média de cor caramelo. Focinho preto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12cYeXQlbLkAq_8efoAIXPEFaLHCg6uZf",
      "location": "Abrigo da faculdade Ipa de Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho de pequeno porte. Pelagem preta com manchinhas brancas aparentemente causada pelo envelhecimento."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yYWAfXG-8iUUNMADGS75TMFgf7B58-E6",
      "location": "Abrigo da Faculdade Ipa de Porto Alegre",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canino fêmea, possível raça Lhasa ou Shih Tzu. Pequeno porte. Pelagem tosada de cor branca com manchas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16xtf2xVwSQiZeRqjlYuQlb28BBm4BUbV",
      "location": "Abrigo Faculdade Ipa de Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "observations": "Canino, de pelagem curta e cor caramelo. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17Pj6D0RAdfgo0zX4JL2lfhjnGlUUyIoy",
      "location": "Abrigo da Faculdade Ipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Macho",
      "observations": "Canino macho, grande porte. Cor caramelo e mancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oHEWyaw21VfojZH_xqImRSQ32omNfn5u",
      "location": "Abrigo da Faculdade Ipa de Porto Alegre",
      "breeds": [
         "Sem raça definida",
         "“Fox”"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "observations": "Canino macho, porte pequeno. Pelagem branca com manchinhas pretas. Possui duas manchas pretas nas laterais da cabeça cobrindo orelhas e olhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gBOzZsh7HJhKW5R_Pf8PKNFqwCcGph2P",
      "location": "Abrigo da faculdade Ipa de Porto Alegre",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "observations": "Canino de corpo alongado e pelagem longa. O pêlo é preto com as patas marrom. Pelagem lisa e brilhosa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bK1AfigvufcIRs3Y56NoCd2FUFWKzdLU",
      "location": "Abrigo da faculdade Ipa de Porto Alegre",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "observations": "Canino pequeno, com cabeça pequena e orelhas grandes. Focinho parecido com pintcher. Cor caramelo, pêlo curto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17C6NU4cm5VkgCpLFiD6UU3cAdG18ucVj",
      "location": "Abrigo da Faculdade Ipa de Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino de porte pequeno, pelagem curta preta com patas e focinho marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DwJkbTRrDL0ac2aw4GRE_mKbv3nzTZT4",
      "location": "Abrigo Faculdade Ipa de Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "observations": "Canino de porte pequeno, médio. Tem pelagem longa e lisa, cor preta com focinho esbranquiçado. Patas em cor caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RHKSbvSZ-YYrsJwKRAsN5QiIgfJWU5WK",
      "location": "Abrigo da Faculdade Ipa em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "observations": "Canino de porte pequeno, cor preta, corpo robusto, patas que ficam viradas para fora."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nH8p2D7noGB1etAxXOmK1TMGt7K0D1Hb",
      "location": "Abrigo da faculdade IPA em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "observations": "Canino de porte médio, cor caramelo, rabo longo e peludinho. Facinho mais escuro que o restante do corpo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OPJ-TwWyF8xEUtaVOCH_-HhcFTXRk61-",
      "location": "Abrigo da faculdade Ipa em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "observations": "Canino de porte pequeno, cor amarela, cor bege."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PhXKdgkrCqiTXXB1QbPATDKmQngFkIzC",
      "location": "Abrigo da Faculdade Ipa em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "observations": "Canino de porte pequeno e pelagem curta de cor preta, orelhas com pontas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15u8zd8U2bdxoCgXAmppX8wq4eHIeOZK7",
      "location": "Faculdade Ipa em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "observations": "Canino de porte médio, branco com manchas pretas e marrons no tronco. Manchas pretas cobrindo orelhas e olhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ci1AgFqfSvDOTYoMfcgNoejIlPKtKs7k",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bLPhBE65hqD0fU0dXtPy59egg5lmMiJG",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Orelhas e rabo preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AjoHXVSjCjJssZZFXTGNvXaRLV_00joh",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1u9VIHpiusFKuuO64xwrHXkPi8xFR-64r",
      "location": "Ginásio Agostinho Cavasotto/ NH",
      "breeds": [
         "Chow Chow"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1B1TzGo8IzhBt7Dpu706A4nah8tg2nwzu",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Pelagem preta em cima caramelo patas e carinha"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QYQT6E0wKAJi19r5C1NkA7iVwYKTumad",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em cima dos olhos no peito e nas patas em marrom claro"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WAv9_Mi3SowsK1TuSL65kOG0EPp5Z4MR",
      "location": "Ginásio Agostinho Cavasotto/ NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhe branco no meio da carinha e no fuço"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14oXyPrXe8bLJ_Rdnbjp7am32EojA_B2T",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1e06kfQK-q9ZkT9kJY6mmcmzXVKQFkjLp",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Carinha preta com detalhes em cima dos olhos caramelo , patas em caramelo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1XX7zRZkBZ5lEdK_bBYx71GFDv7JXXCFq",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peludinho, dentinhos aparentes , patinhas bem curtinhas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1D8roxd09H1-tNC7SOrqk_vgmQ5OVEuVq",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Orelhas em caramelo, peludinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1r2zGJzHQROeVP5nkpWsGrvoH45t1vuzj",
      "location": "Vida Centro Humanístico -  Av. Baltazar Oliveira Garcia 2132. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho de porte pequeno. Pelo curto, olhos e focinho estilo raça “pub”. Focinho curto, olhos proeminentes. Pelagem de cor caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eISIYdYHYV3gCXAm9rtqtiOFXhW2M6Lp",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Predomina Branco, com partes em preto e pequeno lá detalhes em bege"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pf6mx1UsBcNXDayNFKO60d3l6Jo92nUg",
      "location": "Sogipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "observations": "Canino, porte médio, cor marrom, cego de um olho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10gAjmTBNXuiPfC5nwFoTNEmg3AtvX7tW",
      "location": "Rua Marques de Alegrete, 888 - Ideal, Novo Hamburgo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho, preto, porte médio ou grande"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JW6FUOWe_Kxeu7M_6_AacQkCTKpu75Q7",
      "location": "Rua Marques de Alegrete, 888- Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canina, branca,preta e marrom, fêmea, disponível para lar temporário"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nBPWEcKOAR9UrXNTmZKPBLkyRPdx89HI",
      "location": "DOIS IRMÃOS - RESGATADOS EM SÃO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "sobrancelhas da cor das patinhas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1L1Vk9ZWZGmb3_7gIWmgpbRkCKtRwCqTT",
      "location": "Rua Marques de Alegrete, 888- Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canina, fêmea, cor caramelo, porte médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MHnXPaLRXZyBCzqAGU8AXS26e_Fg-O54",
      "location": "Rua Marques de Alegrete, 888 - Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, macho, amarelo ou caramelo, porte médio ou grande"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ck5vBfi4RewEBh24GLvmkN4sdJH_6jdP",
      "location": "DOIS IRMAOS - RESGATADOS EM SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Esta com o rosto e pernas com machucados"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VPN2PI4Mt1fCg3szL-M9GQLWrtvxI42-",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Tem manchinhas na barriga"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EtCJMIIZayn2P9EC_X6vcKL1FxCtkeI0",
      "location": "Rua Marques de Alegrete, 888- Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, macho, pelagem preta e marrom, porte pequeno, atualmente está em um lar temporário com @segueoprates"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nPTlm8nXBY8AtP0cFGs0yjkXtnD-PWym",
      "location": "Rua Marques de Alegrete, 888 - Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, fêmea, pelagem preta e caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12PVZIJZj4ahLShuBafH-ol9YMbLmy1_3",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Amarelo",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ptSU3BlTGI7_TGVp6DgRxovWwGgUk8Rp",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NkHMhLQyyHieUyUHq_4IUfwo-aRHsJ4V",
      "location": "Rua Marques de Alegrete, 888- Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino, macho, pelagem cinza, parece ter um ferimento no olho esquerdo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LaaSb6x2Z8bgsB3WDDlGlTDuLqlaOigc",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "peludo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ySte9II9SHyYko1j-Ypz_thebXB_CYDY",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "tem uma patinha branca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xPBugi0xprdIvnLfgvAgJJT9cnFkFr3c",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "pescoço branco, mancha branca no pescoço"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Oe3BR8P9KPJ2gv4l6tNRQWv6fc4g6iMw",
      "location": "Rua Marques de Alegrete, 888 - Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, fêmea, porte pequeno."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vppCo7WdXUFxvGXUEzxYawIpZZNawsjI",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Patas e peito branco"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19T8rdCDubt8LOo4u9FG6a8PVFTtS294h",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1q3a1Ot0u4ZTzhFh1yKYi_qhtLSsnFxhk",
      "location": "Rua Marques de Alegrete,  888- Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, macho, pelagem preta com cinza e branco."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10mV8WuSYjm7tncYQOf1ONF3dRoVWRMFH",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KTtd1_Q01klaN_9dMalolspDDZ_eZh0E",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em branco nas patas e no fuço"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OslK-XtqwOncs-jiPHMS3KHeVEINuKsV",
      "location": "Rua Marques de Alegrete, 888- Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, macho, pelagem preta e branca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1K7NdivyiOMa9oQBrVlLjxxmhfk8VKpkH",
      "location": "Rua Marques de Alegrete, 888 - Ideal, Novo Hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, macho, pelagem marrom ou caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Duc8WSN2M-ywQegV4Z8fpFJ9JBw6BKaa",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Vlgouv2562lVSHetPnO5cdMda-R1gTkL",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1s2lBihHt3bzfOSQiEL4r9mve6M1SoYE4",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18-qbpvLzjmGWA93kC4SuMcfxstIXQZyk",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Bem peludo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NeTQY_NNJ1e9tWiaIXgJMiUZ_Kgz65DC",
      "location": "Lar Temporário na Rua Laurindo 78, Bom Fim. Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Dálmata"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino adulto jovem da raça dálmata, branco com manchas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1k3hihdnefdzbo2GxcBivi_qh1tE5WT_-",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": "dentinhos tortos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LbPuDu-SwdpRAmnbdb1-Ik6JcVpxxZSr",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Collie"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Corpo branco, manchinhas caramelo nas patas, cabeça predomina preto e caramelo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Lfm5bvF2ZUAnsUjsAwSDlG4GBOb7m0SV",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BkPSFNNwtFm2f8FBQdE_XOZkIMQNLLcP",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sG1P5pvSi5o8MOtx3fFoJAnGIm1UOoz8",
      "location": "Na arena em destino a lar temporário, contato 51 998635454.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Resgatado no bairro Humaitá e entregue na Arena. Canino macho de porte pequeno/médio. Pesa 9kg. Orelhas caídas. Corpo branco com manchas pretas, pelagem de tamanho irregular de comprimento entre entre curto e médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bMOECeW7CkLElIDRQLSycfFRanT69njt",
      "location": "Vida Centro Humanístico. Avenida Baltazar de Oliveira Garcia 2132. Porto Alegre. Falar com Mateus 51. 998660198.",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino tamanho médio, pelagem média de cor cinza. Peludinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1XnyfSKa3MPgJ-Txj8MU_JGLu5V3SjfLv",
      "location": "Hotel da Fenac em Novo Hamburgo.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canino fêmea, cor bege com mancha branca no peito. Corpo esguio e patas finas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14uEzftFFobH2gEGozdapWzR3C9fpyaC1",
      "location": "Lar temporário Rua Laurindo 78, Bom Fim. Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Beagle"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho de porte baixo, corpo gordinho. Pelagem curta, de cor marrom, com mancha preta no dorso, no focinho, rabo e orelhas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15dczTpCzuMwFjrtJ-iHg8PEsg3NBdtQi",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "patinhas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mM3rztyHf-cR9KXSbwCzSfQQswzlk9YG",
      "location": "Lar temporário rua Dom Laurindo 78. Bom Fim. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte médio cor preta. Pelagem de comprimento médio e lisa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CjaftMcICs7-oeU5HGdEWctLclRzz3OH",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fwabLB5VDNWIQICQKRDb5jHSgGEhohcd",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Resgatada nas proximidades da Scharlau e Santo Afonso, jovem adulta"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CF4Ug7A-18BeH9iHIVuvI4q79w-xby0u",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "mancha marron nas costas, meio cega"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pKyiY8YLDLGEPh7prDy3rhKXs3Z_9dch",
      "location": "Sogipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte médio, pelo curto. Cor branca com manchinhas marrons espalhadas pelo corpo. Orelhas marrons."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17v-kSfUYBrHCNCrg2SfEIpug_ectSSx5",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Caramelo, peito e patas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11zBe0kQezlpde-qryRV_gyks6ODjOVJC",
      "location": "Sogipa",
      "breeds": [
         "Sem raça definida",
         "“Fox”"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de pelo curto, estilo de corpo da raça “fox”, corpo pequeno, patas curtas, focinho longo, orelhas curtas com pontas caídas. Cor bege, caramelo claro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1iHiz_JTaAmsbKmqcpIIgC9r4KI6IaAVe",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida",
         "Chihuahua",
         "Pinscher"
      ],
      "porte": [
         "Mini"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Fuço um pouquinho esbranquiçado"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11amB1z_nnR-ol-zuNOxOX5MMWbfCt62d",
      "location": "Sogipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino, porte médio. Pelagem de comprimento médio, mais comprida no peito, orelhas e cauda. Corpo, orelhas e cauda preta com focinho e patas caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JavfsBOAwRm68XrMh5FKDPuQgviedSrQ",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Peludinha, preta com manchas grandes pretas, um pouco de marrom na cabeça."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Y6Lj1QddviOqIgq16HEuMsk5edhJveoM",
      "location": "Sogipa em Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Fox, foxy"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte pequeno. Corpo estilo “fox”, corpo pequeno e forte, patas curtas, focinho longo, orelhas curtas com as pontas caídas. Cor preta com mancha branca no focinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w0RhmF2B4q3m5x9Pp0PGvvwypxHbuXSJ",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Castrada"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1R8aNFBrYKRK0XC3v4I3OR-ak8tzxvx-E",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "orelhas mais escuras que a pelagem do corpo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IDDvv6Yl_9KBw3NV01iqr9AxqS_S-O8e",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peludinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zpGw8N01ZNMUat6SN0nNp81LrL3ejoM2",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YlEzvAQUOFJXI7TN6igUsnmpVaTynNME",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Caramela com peito branco"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_oGJBfTpIDyiyPG0PJQX6rLY0y_A8Qnp",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mLpHGm01GLuCNMcKVOqdOh7hlIc10LMG",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Branco, caramelo nas costas e nas laterais da cabeça"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NBplSDXMqmz6wNIWx017VloIZhcxA0dC",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GJL7iI4OausBaILb-UNpm2PYcQQc1u3b",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CgcJAAtFHxjINY6gR6XUv-k6OTmoDZ-s",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "barba branca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1D8y7Q76tihr7ilYRI99AwH23ho9lPp7a",
      "location": "Sogipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Filhote"
      ],
      "observations": "Quatro filhotes recém nascidos resgatados numa caixa de isopor. São cor caramelo com focinho mais escuro. Orelhas caídas. Pêlo liso."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1blj6DVcLFt4Ct2QDOx7zXtlb8SarZnn_",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QE2yU8ShZMGHzwZtXWnHjXlVF_BuUjh9",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YzLaPqd1gQ4kX0jxqBsoY4vB0uZ6WIXm",
      "location": "Sogipa Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte pequeno, corpo magro e patas finas. Focinho longo, orelhas grandes com apenas as pontas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/168ZxFc-aVhSWK2KLLWsaly05AnwisM6W",
      "location": "",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Grávida, gestante"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fW1Qj-G7HULemQBHQh5bJ-Ze8IO7v8yA",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qcq0QIykqgGWoCIpcyAizUWQFUQ3ei3j",
      "location": "Ginásio Agostinho Cavasotto/ NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Fico preto todo rajado em marrom e preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lzUKuxRwfr0FhlnI8S7znKyLLo0DvHoC",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em branco na carinha"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bbrIcCvzWlBtpe7fo6ghNOeDb9pnpHaf",
      "location": "Ginásio Agostinho Cavasotto / NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes rajado em preto, parece uma raposa"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14FIQbCvzeL6AbCpA_b5US1mLcNP8mEN-",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "tem um olho azul e outro castanho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19e91y-Nnvmgixf8TNMzan6wga155p3hA",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xItliHLcfTZc0kQNzQDgK8YaF3BLgsmr",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "Detalhes carinha em branco, meio ceguinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15XPbBsu7XOF31B04-OIU2OuT36RsDD7W",
      "location": "DOIS IRMAOS - SAO LEOPOLDO",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1K7k6m1vWSiDy1s1JGPUYAswxcpaPI9Xa",
      "location": "Vida Centro Humanístico. Avenida Baltazar de Oliveira Garcia 2132. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Canino macho, adulto. Sem raça definida. Pelagem curta, focinho de comprimento mediano. Orelhas caídas, cauda longa. Cor marrom com focinho e orelhas mais escuras."
   },
   {
      "type": "Cachorro",
      "location": "",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhe em marrom nas patas em cima dos olhinhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IqmgQbzmEZamC-Kr0hsIZp_48NZTsLIk",
      "location": "Abrigo Vida Centro Humanístico. Av Baltazar de Oliveira Garcia 2132. Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino, sem raça definida, com características do corpo alongado da raça daschund, ou fox, com pelo bem curto, orelhas caídas, focinho longo. Corpo e cabeça pretas, patas e focinho caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Yf3IFa_Z63tiNm_ia_FUy3BSvrxUmWMQ",
      "location": "Ginásio Agostinho cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Todo rajado em marrom e preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1U1t32e5tATKmAzv2kw1LycpLh5ydf3xn",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Ao redor dos olhinhos em preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18-BMOP0jfynMaFXWuKmOK-qQwh87X4Kn",
      "location": "Ginásio Agostinho cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhe em branco no peito"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aOnQZ5KvGJuFSqjvO9-9A5qvZ6fs_Ghp",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rAAAVAuVc-vicPLqEXmtO0Mvz0-ZYUcE",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Metade das patas branca risco branco dividindo os olhinhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pWx5OeD1AwBUPgE17-v8qOkGBM8qXyeq",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Carinha marrom formato de coração em preto patinhas em marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VwvL4Q4b3BLk57jxknHYT3uL1IJd4u_C",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w3wWrYgc_UqWSTWzLSRKbQxuUZ4DGf8s",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peludinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HRSf8DKM97XRfMf1_sVwA4z4_tzfZ3nd",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em bege ao redor dos olhinhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1iSEUmh3-hs2Y28diZURsfaZ919aGjry6",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UuKOv-RJ5rEklBr90_ju4j0_XzTPIDOe",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Branco pintadinho em preto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hFBN6cPzaDquAAYrYKiJ2dqOnwo4fBYo",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZDHB_OB5Spd3o2nxvh2mniprCrIwo81e",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Peluda"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-n4WdUyf2wBbzmpmKdO_W17e8MY-7hiS",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1caxch1W1UzP7V6CgXcod9KKPo0x_xphT",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peludinho orelha marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WXasJIe5Dv2RiIKWgsQ0tOHDHwDGm3UR",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Pelo baixo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Zhg8oHhN2Q-uvuyjgb2YENRXKXFoGLGD",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Ponta das patinhas branca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1e3HpcJs4bbtOqUFTtLB3S1VX1lgsm55s",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Em cima dos olhinhos marrom patinhas marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_xpst7fPxu2Dz7643a2g5oKcxS7vIa1J",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Marrom escuro"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KyKYktPhcPiEPGD_PcuJDY1Xx1esgjS1",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Patas em marrom dois pontinhos em marrom em cima dos olhinhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1leXNz2b8YUY3GnSxvONor6OO6-B6ViDz",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em brando na carinha e nas patinhas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-16gQcKpcVb3ObOWJOALM4-jV9RpbcSJ",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Parte inferior das patinhas brancas carinha com detalhes em marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1i4ukTdd5d7eTzQjr715GQ4enuM-z5bKC",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Carinha e patinhas marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FcyH62JCCUMF5mluNAh6sPKoerMAyQua",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15t_D-xhlVn1sNS_tFBhNe1mU5Z3e5Zly",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TiZ-v7ZZM8CI97O3hYwsbz7BkleBeHgW",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LwCinc9aNNs5Jw2jnRjcdniR9qsLLTfF",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Parece com uma raposa"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WjjvqpDobfu6bdhV-OhkeSfipTMbP1gh",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Detalhes em marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RZ6z_HrEYBjAOppFs6k2xhTT-xdbiHC8",
      "location": "Ginásio Agostinho Cavasotto/NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peludinho na carinha e no peito"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cUsLWLb5kRqbtNDwGQ0nB1IY-PzYyYUc",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Cabeça e membros inferiores em marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mDIsNFNDTYbFp3uGFbHwAnEeFPWi52YJ",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peladinho com detalhes em marrom médio"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WHeRrBI10e7uqLM4rgu1rOy7FumjcNWt",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zl8cXl1Yv9zCbCsOhf_qkTa6m5fQJIUw",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida",
         "Yorkshire Terrier"
      ],
      "porte": [
         "Mini",
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Patinha bem curtinha peludinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Mz4iOlncN32mQmdVzK7GXQs7z5Y2kUC1",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida",
         "Pastor belga"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": "Em cima das orelhas peladinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18bZI8RdTiSgO3Io2Ax9AG-anr23Xc3Is",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uD8eXqM2ryigow76T8148lpeZ6HUHO4m",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Partes marrom partes brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1B_kiHqlA3Qk5hu-tdRrRxf_xsQ227Ipp",
      "location": "Ginásio Agostinho Cavasotto/RH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Risco branco no meio dos olhinhos orelhas cor marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1d0lLL6SSNTdPVRT4KBdyMQ0X943EQDv2",
      "location": "Lar temporário com Jeniffer Sue 51. 997384559",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino, porte pequeno/médio. Pelagem branca com manchas pretas e marrons. Orelhas caída de cor preta."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VrczOEbCUapgBHKDk1fkpDjTf1AezzSI",
      "location": "Lar temporário de contato 51 986138343. Rua Dr Voltaire Pires 470, Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Canino macho. Adulto jovem, menos de 1 ano. Porte grande. Cor branca, com manchas marrons nas orelhas, dorso e focinho. Corpo forte. Pêlo curto. Patas de comprimento mediano. Orelhas grande e em pé. Focinho longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YqL_yTrJlbKJuzJsVldMOZ3wJFxn_m2Q",
      "location": "Lar temporário de contato 51. 992251533",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Canino adulto, parece pitbull, cabeça em formato quadrado, com focinho longo. Orelhas caídas. Pêlo curto e branco. Resgatado em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18zt1iuHro1QV7ivnYiF8T83JAprCWKnZ",
      "location": "Lar temporário de contato 51. 992251533 em Canoas.",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": "Canino macho, provável raça pitbull. Grande porte, pêlo curto, corpo branco com manchas marrons claras. Uma mancha marrom clara envolve um olho e orelha."
   },
   {
      "type": "Cachorro",
      "location": "Lar temporário contato pelo Instagram @iandramensch",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Filhote"
      ],
      "observations": "Canino fêmea, jovem. Tamanho pequeno, possivelmente é um filhote. Pelo curto preto com patas e focinho caramelo. Orelhas com pontas caídas. Encontrada da Mathias em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sVAGqGeQjY40ioGeYCKVWz6Og9jkbJJc",
      "location": "Lar temporário contatar Márcia Goulart no Facebook.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, porte pequeno. Pêlo curto branco. Corpo magro, patas finas e brancas. Orelhas em pé. Resgatada no Humaitá."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1R8V6SY-3_VUsRa8kh-LocWO84-EWJM3B",
      "location": "Lar temporário com Márcia Goulart, contactar via Facebook.",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte pequeno, pêlo curto, cor caramelo. Orelhas caídas, focinho longo. Resgatado no Humaitá."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1M8YrC8Z4ZU5wTHnpl6RniJ7PuVu-EkhA",
      "location": "Lar temporário com Márcia Goulart, contactar via Facebook.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "observations": "Canino de pequeno porte, focinho longo, orelhas caídas, corpo branco com manchas marrons e pretas. Manchas marrons e pretas nas orelhas e olhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HnKWcT4KRQbJ8pCIiCbbXn2uOh8g93p-",
      "location": "Lar temporário com Carolina e Ricardo. Contato 54 991135416 perfil no Instagram @carolremussi_",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, com lesões de sarna na perna. Pelo de tamanho médio e irregular. Orelhas caídas, focinho longo. Não tem dentes da frente. Encontrada no abrigo da escola Dom Henrique."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zBHem_tq04PCpO_CREwFo2LglOvkquKD",
      "location": "Contato com o perfil do Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte médio, corpo magro patas longas. Cor marrom com grande mancha preta no dorso e focinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FjpPxfee9j6EWJRssGdqaFBw11Sw5Bs1",
      "location": "Contactar perfil de Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de pêlo curto. Focinho longo, orelhas caídas. Corpo e patas magras. Cor preta com patas caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JWYAUECEmvPVAPV0jEjgfGtDv07cjaPY",
      "location": "Contactar Instagram de @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Canino macho da raça pitbull. Cor branca com duas manchas pretas uma em cada olho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cWhnAjMhVppgWkzCSGhIXJQIr_xSk40o",
      "location": "Contatar Instagram de @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de porte pequeno, com algumas características da raça pinscher: rabo curto, orelhas em pé, focinho de comprimento médio, patas curtas. Pelagem curta da cor marrom escuro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rlHlJRT77Pw_vZAFsVIQRlmXKsAETdFN",
      "location": "Instagram de pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino de pêlo curto e cor branca. Possui patas com semelhança da raça dauchshund curtas e viradas para fora. Corpo pequeno e forte. Focinho de comprimento mediano. Orelhas pontudas e em pé. Rabo longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vhNrEkHwJrPtxI6niZjq_MHl3r1siWIj",
      "location": "Contatar o perfil de Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de pêlo curto preto com mancha branca no peito. Focinho de comprimento mediano, orelhas com pontas arredondadas e caídas. Corpo magro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yDp0oWKy95SXl4f-cqAwkSHq_ihGpDIB",
      "location": "Contatar perfil de Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte pequeno, cor caramelo. Orelhas grandes e pontudas, com a ponta caída. Focinho de comprimento mediano."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZVGN4DjgPXEEDN2KjQiXa1h8EHBYVQnM",
      "location": "Vida Centri Humanístico em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte grande. Pelagem média de cor caramelo com mancha preta no dorso, orelhas e focinho. Orelhas arredondadas com pontas caídas. Focinho comprimento médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nrOPehquSZbkEhD-f1h3RW60v0IZFFDm",
      "location": "Vida Centro Humanístico em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "observations": "Canino de porte médio, pêlo curto, focinho longo, orelhas arredondadas caídas. Corpo preto patas e focinho caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sYyfdt4XbqzkIwB3Q3DTybp7P62XnVMN",
      "location": "Sogipa Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Cinza"
      ],
      "observations": "Canino pequeno de pelagem de comprimento irregular mediano na cor cinza. Focinho lindo, orelhas com as pontas caídas. Rabo longo. Corpo cinza escuro e patas cinza claro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/126FrJfwzOKl_FcOAvGHZR6Am_egMnsEa",
      "location": "Vida centro Humanístico em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Amarelo"
      ],
      "observations": "Canino de pelagem de comprimento irregular mediano, orelhas arredondadas com as caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17fAK6s_c3brk0XvYO51ts9856tYhradZ",
      "location": "Vida Centro Humanístico em Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino de pelagem média para linha. Com focinho comprimento médio. Orelhas caídas. Marrom, com mancha preta nas costas e mancha branca no peito. A dentição do maxilar  inferior (de baixo) é maior que a de uma deixando os dentes de baixo sempre expostos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/155E_dscnH9cjdaJp0e26L0INRGFWmp47",
      "location": "Vida Centro Humanístico",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Cinza"
      ],
      "observations": "Canino de pelagem cinza. Porte médio. Orelhas triangulares com as pontinhas caídas. Mancha branca ao redor dos olhos. Olhos escuros."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ueaiamnH8s5p8H7b1Y9Pwa334BsESjgg",
      "location": "Sogipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Canino de porte pequeno, cor preta com mancha branca no focinho. Pelagem curta, lesão no olho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1E5V2668evV8kbChJudlffzk-RlDWSQrn",
      "location": "Vida Centro Humanístico de Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Canino de pelagem longa, cor preta com manchas brancas nas patas, focinho e peito. Pelagem brilhosa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Aat5eT_GHuQk3O6XzLbe8dl2teOLgGZI",
      "location": "Sogipa de Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino de focinho largo, grande porte. Pelagem média de cor marrom, tem mancha preta na cabeça, orelhas, costas e focinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Bt15S-rI7lhP8LqOtzU67V4c1wRN8CIP",
      "location": "Vida Centto Humanístico",
      "breeds": [
         "Sem raça definida",
         "Rottweiler"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, rottweiler."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yzEYCw81O2Q7vcvXnMmQX8vjAIAvnAtz",
      "location": "Vida Centro Humanistico",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, sem raça definida. Porte médio, pelo curto. Branca com manchas amarelas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Gbs0_uaz6YeNXhyTqMWNtA8KwxT1CIl6",
      "location": "Vida Centro Humanístico - Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, grande porte. Pelagem malhada de preta, cinza e branco. Orelhas caídas, focinho largo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jiBORfoe6-f0ttEZtI72zmjj6451vqT5",
      "location": "Vida Centro Humanístico de Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, sem raça definida, corpo arredondado com patas curtas, pelagem curta branca com manchas caramelo. Tem uma mancha caramelo ao redor do olho e nas costas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DT3N-aBPgA8nuCQi_khuwTkUJUDsiM6o",
      "location": "Sogipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho de porte grande. Bicolor branco e marrom. Tem manchas pretas. Cabeça cor caramelo. Focinho largo, orelhas caídas peludinhas, mas restante do corpo pêlo curto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1y_saGjaZTbhvKzHo9vmVlWlxJ_pe2Gk5",
      "location": "Galpão 3 Ulbra Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, tipo collie porém de porte pequeno. Pelagem de comprimento médio, longo. Bicolor branca e preta. Tem mancha preta que envolve olhos e orelhas. Peito e patas na cor branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rkH09sKN7zvo3vuGNZi_MrCjnB0dWpUx",
      "location": "Galpão 3 Ulbra Canoas",
      "breeds": [
         "Sem raça definida",
         "Poodle",
         "Shih Tzu",
         "Lhasa"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, peludo, focinho curto, pelagem branca com orelhas cinzas.pelagem longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w8NPwtLu7l6SoNrgKr83faPdW6xNtEEZ",
      "location": "Galpão 3 Ulbra Canoas",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino, fêmea, pêlo curto, focinho longo, orelhas peludinhas com as pontas caídas. Cor caramelo/marrom claro com focinho e orelhas mais escuras."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WD9K2MzTNriZS5uXe5VPWYgmTZVybCG-",
      "location": "Galpão 3 Ulbra Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canino, fêmea, porte pequeno. Pelagem de comprimento médio. Cor bege, amarela clara. Cauda longa. Orelhas caídas, focinho arredondado de comprimento médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17o5LtqAypyvS3_9X_urU3GO0337eEGIj",
      "location": "Galpão 3 Ulbra Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino, fêmea, porte pequeno, cor preta. Mancha branca no focinho. Orelhas arredondadas com as pontas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NVtMioP718FgDKHg-SpU3NnEj-e4VPB1",
      "location": "Galpão 3 Ulbra Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino, fêmea de porte pequeno. Corpo alongado e patas curtas. Pelagem te comprimento médio, cauda longa e peluda. Cor preta com mancha branca no peito e nas patas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aqjO2NonbkwWht9uP-hC1FyySQ9ghUj3",
      "location": "Vida Centro Humanístico - Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea de porte grande, corpo magro e patas longas. Orelhas pontudas e em pé. Cor marrom, mancha branca no peito, patas e focinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10-minbwKhXhMxugP5PKYV33buXHKv2PW",
      "location": "Vida Centro Humanístico Porto Alegre",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)",
         "“Fox”"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho de porte pequeno. Patas curtas. Orelhas caídas. Pêlo curto. Cor marrom. Focinho longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uwyHRIYX9-3FbDobvjwtgKjwvXANthA-",
      "location": "Vida Centro Humanístico",
      "breeds": [
         "Sem raça definida",
         "Pug",
         "Shih Tzu"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Idoso"
      ],
      "observations": "Canino macho pequeno, focinho curto e redondo. Corpo bege, orelhas e focinho escuro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JreYGmnGTq0zaJeoQLOlSVqOQYv22a0Z",
      "location": "Lar temporário Rua Laurindo 78. Bairro Bom Fim, Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea, porte grande bicolor branca com manchas caramelo. Orelhas caídas, focinho redondo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yh4MwmoNQVAtArik5tsReL4x1-2VGuXf",
      "location": "Vida Centro Humanístico - Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, peludo. Branco com manchas pretas e marrons. Focinho longo. Causa longa e peluda. Porte médio. Mancha amarela nas orelhas e olhos. Mancha marrom escura/preta no lombo que vai por cima da cauda. Orelhas de pontas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KeWYW7JjzJi7cqM1RlemBJjFm4Z-HYtP",
      "location": "Vida Centro Humanístico - Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho de porte pequeno. Focinho longo. Orelhas curtas e caídas. Cor bege e preto na parte superior do corpo. Patas bege, caramelo claro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ejEuHebilpWPjKh02OciUCY9TCA-htcL",
      "location": "Lar temporário Rua Laurindo 78. Bom Fim - Porto Alegre",
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho chow-chow da cor marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LEaSVm3KMm4S0WksWXFSGlTHjsR_dg5j",
      "location": "Lar temporário com Guilherme, contatar através do Instagram @guihdias02",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, cor preta com mancha branca no focinho. Orelhas caídas. Focinho longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12OUPSya4IZ8MVaDWw7XuhRBZNIBwIS1R",
      "location": "Ginásio municipal Augustinho Cavasotto em Novo Hamburgo, contatar através do Instagram @petpepi",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, pelo curto marrom claro. Focinho de comprimento médio. Orelhas caídas. Mancha branca no focinho e peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uFuOB9OWZPpzW5Wd4C4kfm_pd2IJbdSm",
      "location": "Lar temporário contatar através de Instagram @natimizzollo ou telefone 54 999181221",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Canino fêmea, de porte pequeno. Pêlo curto, bicolor branca com caramelo clara. Causa longa. Orelhas pequenas com as pontas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gcBVT3uj2EdzotwES3RY_GhtdIl36zRJ",
      "location": "Lar temporário contatar através do Instagram @ceminluisa",
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, possivelmente da raça Chow-chow. Porte médio, pelagem longa e volumosa cor caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16dh-11tJFoK-BDcCRRm_S0F8nz5_FKZq",
      "location": "Lar temporário com Morgana, telefone 51 999159590.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho com orelhas caídas, pêlo curto, cor preta com mancha branca no peito. Focinho longo. Porte pequeno."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VKH-wmESbStNktkpTD9AsmXg4esC6zuU",
      "location": "Lar temporário com Jessica 51 994022020",
      "breeds": [
         "Shih Tzu",
         "Lhasa"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, raça Shi tzu ou Lhasa. Focinho curto, pelo tosado. Branco com mancha marrom claro no tronco e cinza nas orelhas. Orelhas caídas e de forma arredondada. Causa peluda e em espiral para cima."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Vlwrs_QP_XGT6Zu3ZOeTME5Uo1AYLlx-",
      "location": "Lar temporário com veterinário Natália. Rua Felipe Neri 78, Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, focinho arredondado de comprimento médio. Orelhas caídas. Cor caramelo com focinho preto e orelhas marrom mais escuro. Cauda longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oW-6WtQYCWl5vJIwwkjdR6AA3WLTT0SU",
      "location": "Lar temporário em Esteio com Franciele 51 989655136 e Instagram @francielesoaresm",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Bege",
         "Amarelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho de porte pequeno. Patas curtas, focinho longo. Orelhas grande com as pontas caídas. Bicolor preto e bege. Preto na parte superior do corpo e bege no peito e patas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fJrebgaC1mLpfNotxUfq49rAhqdowKh1",
      "location": "Lar temporário com Franciele em Esteio (foi resgatado na Mathias em Canoas) contato 51 989655136 e instagram @fracielisoaresm",
      "breeds": [
         "Sem raça definida",
         "Bulldog Inglês",
         "Pug"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho, com características de pug no focinho e cabeça. Orelhas caídas, dentição inferior proeminente. Cor preta, com alguns pelos brancos no focinho. Foi resgatado na Mathias Velho em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1O_NOeaxqZHGc79nrrvg0BxojhJ24bW_F",
      "location": "Lar temporário contatar através do Instagram @cleoniceVieira ou @julianemitanda_  51 982925644",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho porte grande, pêlo curto. Branco com manchas marrons. Focinho longo, orelhas com pontas caídas. Apareceu no bairro Niterói em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uxkEUvOY3VifrzzCw_TksGJjZlGn6GAV",
      "location": "Uniriterr Fapa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, porte G, pêlo curto. Focinho longo, orelhas grande com pontas caídas. Focinho mais escuro. Cauda longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13vF8UaPG8VMUdaawlgdXGU90uERDLhe-",
      "location": "Uniritter FAPA",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho, porte pequeno. Pêlo curto. Cor preta. Focinho longo, orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_7zG4GN1QnZkXEVrtIgCm6qkdNGSxXdF",
      "location": "Uniritter FAPA",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canino fêmea, porte pequeno. Pelagem média/longa e irregular. Orelhas de pontas caídas. Peludinha. Cor bege."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pRqE04ieuOSqhnCJxaPL6IRcTzgrzCzp",
      "location": "Lar temporário contato pelo Instagram @natiriveflores",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de focinho longo, orelhas caídas, pelo preto com caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PznTCyIC2w_O6tWveKkF6uG7xLrGmgP9",
      "location": "Lar temporário contatar pelo Instagram de @engel.laureen",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Rajado"
      ],
      "observations": "Canino de pequeno porte, pelagem curta, coloração rajada de caramelo com marrom. Focinho longo, orelhas grandes e pontudas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lDjYiOZgLWvf6ef7qu44JbaLHssO5cEP",
      "location": "Lar temporário com Elizângela 51 992173771",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho pesando 20kg. Focinho longo, bicolor preto e marrom. Orelhas em pé. Resgatado na 448."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QAhtRmgetiStDor3tmttD5y4ZPsMrtMi",
      "location": "Lar temporário com Elisangela tel 51 992173771",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, cor cinza. Peludinha. Orelhas com pontas caídas. Resgatado na 448."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-5Ra9B5clxW2qX0gtjvzLGehdQIyZAFY",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino de porte médio, corpo forte, focinho longo, orelhas de pontas caídas, pêlo curto cores marrom, patas brancas. Mancha branca atrás do pescoço. Resgatado no bairro Rio Branco em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1V-n652FtvwNm0-jLlWXSafaBEYy6gLfR",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Cinza",
         "Rajado"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de porte médio/grande. Cor rajada em tons de cinza escuro e bege. Focinho longo e largo. Orelhas com pontas caídas. Cauda longa. Resgatado no bairro Rio Branco."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10O11hOD9XaOz1oCpn5WOi7oCC-UHm1-R",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de porte pequeno. Focinho longo e largo. Orelhas pequenas com as pontas caídas. Pelagem curta e preta com banha branca no focinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_FrZsw3fS9oRrh5C4Q7zuIlzBeLlVl7p",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino com características da raça Pastor Alemão. Corpo com cauda longa. Focinho longo, orelhas pontudas e em pé. Bicolor preto e caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lLXqnKQYfy-wpgbmuPXZQNqesJQuSrjy",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "observations": "Canino de porte pequeno e peludo. Pelagem lisa e longa na cor preta com as patas em caramelo. Focinho longo, orelhas pequenas com as pontas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MlWY6eRv9gqf9nJVohtWZxKB-tMfgHNN",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino sem raça definida porém a cabeça possui características de labrador, focinho longo e largo, orelhas caídas e pequenas. O corpo é esguio, com cauda longa. Pelagem preta. Patas longas e finas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VZoMUtpSd1S_WYznT33bVluoB0bmavZq",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "observations": "Cachorro  macho caramelo padrão brasileiro. Porte médio, focinho longo, orelhas caídas. Pelagem curta cor marrom claro. Orelhas e focinho mais escuros que o restante do corpo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1m0pqwWfELuQw6h20EPm50hG826fnMQha",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Lhasa"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino peludo, com pelagem longa na cor clara, bege, amarelo ou branco. Orelhas caídas,  focinho médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1u_pFqDWWqlcDsp1LJ8ZZqv1oV0OrkFzS",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino porte pequeno ou médio. Pelagem lisa de comprimento médio. Patas finas e pouco peludas. Orelhas pequenas com pontas caídas e arredondadas. Focinho de comprimento médio. Cor preta com patas, peito e focinho caramelo. Resgatado do bairro Rio Branco em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Au-KwBWqGz1PydNMVWIwk_2QFIpQKX0S",
      "location": "Abrigo em Canoas, rua Augusto Severo 1414",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Amarelo",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de pequeno porte, com patas curtas. Orelhas caídas e pequenas. Focinho fino de comprimento médio. Pelagem curta de coloração marrom claro. Apresenta manchas brancas nas patas, peito e focinho. Resgatado na Rio Branco em Canoas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1n12KI8c9NS76U4EtZjwzIHs4aB9ASVlw",
      "location": "Abrigo em Alvorada Rua São Leopoldo 450.",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, adulto jovem de 2 a 3 anos. Grande porte, pelagem lisa de comprimento mediano e cor branca com manchas marrons."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Bz4ekt0OpT_z_NyP_R2181XTdCW84ljM",
      "location": "Lar temporário com Fernanda 51 985555323",
      "breeds": [
         "Sem raça definida",
         "Lhasa ou Schnauzer"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, peluda, com algumas características da raça schnauzer, cor cinza, focinho de comprimento mediano, orelhas caídas. Resgatada na Lima e Silva"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Wx7-4N4qbIS7ET-Ul6pUQsCQ5WCDB5UR",
      "location": "Lar temporário com Fernanda 51 985555323",
      "breeds": [
         "Sem raça definida",
         "Lhasa"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Caramelo",
         "Cinza"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho, peludo com pêlo tosado. Corpo em cinza, patas na cor bege. Foi resgatado na Lima e Silva em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ANRaU4HjIgvcuMT8nGJtJPLnXPHG4ylH",
      "location": "Lar temporário entrar em contato com @jenidiasss através do Instagram.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte médio. Pelagem lisa preta com manchas brancas nas patas, peito e focinho. Olhos castanhos. Focinho longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LzSCuvZdfYfE_UIdZSDyzDKTFb1a8aYv",
      "location": "Lar temporário com Daiane 51 985093294",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": "Canino filhote de porte médio. Pelagem curta na cor caramelo. Foi encontrado no bairro Carioca em frente à escola Hugo Guerdau."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1o6cVzu_yv0qKnoroDwH1_GOSGM0WLfE7",
      "location": "Lar temporário com Maiele contato: 51 995524622 ou pelo Instagram @maiele_ds",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino de grande porte, pelagem curta na cor branca com manchas marrons nas duas laterais da cabeça envolvendo olhos e orelhas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cusYim1Ybt_Fnx1NmraUXtBaaq4ORWRb",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Bracinho esquerdo rotado"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WQ-WNMF3txUJ6MH1DX-47IuL3DcAGHls",
      "location": "Lar temporário com Maiele contato 51 995524622 ou pelo Instagram @maiele_ds",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo",
         "Rajado"
      ],
      "observations": "Canino de porte médio, pelagem curta na cor preta com patas, focinho e peito de pelagem rajada de bege, marrom e preta. Orelhas caídas, focinho longo. Causa longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Sm14pSalZ03fSEcA-U3M79RcEgS2qKUZ",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "observations": "bracinho esquerdo rotado, pelagem mesclada preto e branco com marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tq7doRKSFxuXfM2ng9rCO4rjz8ZfujR_",
      "location": "Lar temporário com Maiele contato 51 995524622 ou pelo Instagram @maiele_ds",
      "breeds": [
         "Sem raça definida",
         "Boxer",
         "Fila"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo",
         "Rajado"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de grande porte, pelagem curta de coloração rajada em tons de marrom e preto. Focinho longo, cauda longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uLn3dMOHFQoDr67_RXrrcVxnbtutxnJG",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Olho castanho claro; ponta do rabo, peito e patas brancas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SD8ulVtI_jqy1QPDCcFv6aHFeNybwKxp",
      "location": "Lar temporário com Maiele contato 51 995524622 ou pelo Instagram @maiele_ds",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de grande porte, pelagem curta. Focinho longo e arredondado. Orelhas de pontas caídas. Cores bege e preto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DAXj27CkUkuAQPV12GT73mIUtQM_wNEf",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "número 56 do abrigo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Aw5SIBZanQF40LU16Rbcu5-fI6NvNltR",
      "location": "Lar temporário com Maiele contato 51 995524622 ou pelo Instagram @maiele_ds",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de pêlo curto, cor caramelos tem mancha branca no peito e barriga. Orelhas grandes com as pontas caídas. Focinho de comprimento mediano."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12EMilD1p7sZvzlO_y-9wL27Ze-qRMhY9",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "Pelo preto em cima do lombo, parece uma capa"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_iCy3WRZwhMJChX-ffSyzM_wcqdcYYS6",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Tigrada (marrom e preto) com peito branco"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NGHUJKzs-dPrdhrxW2eEDhoJ2bb3JUGt",
      "location": "Lar temporário com Maiele contato 51 995524622 ou pelo Instagram @maiele_ds",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho de pelagem caramelo. Focinho fino e de comprimento médio. Orelhas longas e arredondadas. Patas longas em relação ao corpo. Manchas brancas no focinho, patas e peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RNAcLMnpk9mRlp09gb-_86w7BAICORs2",
      "location": "Lar temporário com Maiele contato 51 995524622 ou pelo Instagram @maiele_ds",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de pelagem curta e cor preta."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CTeYBwqzVP_FgUvmCJf4BBI_TH_ASI2P",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Tumor em perna direita"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gJRkwgBnoZSFDhL1-eAl1n3ne5nDLkIU",
      "location": "Per point em Viamão @petpointshoprs",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea castrada. Pelagem marrom e bege. Olhos claros. Focinho longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nCVpXUWhNm2pN0Ne-8znPo9Xd1Tv7yqQ",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "branca com cabeça marrom e manchas nas costas, numero 59 no abrigo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hHyC9f37mweDHy4KFMjKOpvLjiXfFvud",
      "location": "Pet Point Viamão @petpointshors",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino de grande porte mistura de pastor alemão, focinho longo e preto, orelhas pontudas e em pé. Corpo cor caramelo, marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10YTyjL6JzXy3TruB4TULXJjmYEVwPKLs",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "hérnia umbilical"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1X0YQA7HmepFCPi8hfH_NJm5JuKqVGBVd",
      "location": "Pet Point Viamão @petpointshors",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino de pelagem curta, cor caramelo e preto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16YuJK-J7qOV_q2NXqo1tXQzRG17aSoqJ",
      "location": "Pet Point Viamão @petpointshors",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "observations": "Canino pequeno porte, cor marrom escuro com bege. Focinho de comprimento médio, orelhas com pontas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18pUUMFV605L4urNoKRt4YBqfWRBoEqJe",
      "location": "Campos Sales",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Castrada, jovem, ponto de pele na barriga, patinhas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11piIw351i98FlO3rVcIgInix2R7Nsg8Z",
      "location": "Pet Point Viamão @petpointshors",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino de pêlo curto, cor branca com manchas marrons envolvendo olhos e orelhas. Causa longa e fina. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bKKW7-SdvE79EezzGFFuSyypyCxKA_L3",
      "location": "Alcides contato @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea, aparentemente teve cria recentemente. Corpo segui, cor branca com várias pintinhas marrom clara. Orelhas marrons, cauda longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17ixsTCbi6MLrqy-oPXp2bF1cOU62btnV",
      "location": "Alcides contato @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Canino fêmea de porte médio. Pelagem clara na cor bege clara. Patas longas, orelhas curtas com pontas caídas. Focinho largo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ruB-gVcH2h6c2bHZFgQrOp1r9NrBRM5w",
      "location": "FAPA Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Amarelo",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, pelagem de comprimento médio, cor caramelo. Orelhas em pé, focinho arredondado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FPdM7MkmQgwSRLVs1tgiRaI8kaPbzA4a",
      "location": "Contatar Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho não castrado. Porte grande com pelagem marrom claro, amarelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wFn0loyFyGKbdUIxhu5hp7eBsN9ZbD-0",
      "location": "Contatar Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea com mistura de pastor alemão, porte mediano. Focinho longo, orelhas pontuas e em pé. Pelagem preta e marrom. Cauda longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1z_cMvI164ZuTPmOo1bb2cj3yJPq_QTXA",
      "location": "Lar temporário com Jackson Figueiredo contate através do Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de cor branca, com manchas cinzas, bege e pretas. Aparentemente é idoso. Pequeno porte."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yMF33q7BdmKJN1ZU-6lv5HJdqXxrhvEr",
      "location": "Lar temporário com Jackson Figueiredo contatar através do Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida",
         "Fox"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino de porte pequeno, pelagem curta, cor caramelo. Orelhas grande e pontudas para as laterais externas. Focinho fino e de comprimento médio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14Nc_USaPbAp3sPrSNGNyMdNkBvXepnn7",
      "location": "Lar temporário com Jackson Figueiredo, contatar através do Instagram @pets_resgtadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino de porte médio/grande. Cor preta com manchas brancas e beges nas patas dianteiras e no peito. As patas traseiras são de cor caramelo. Causa longa e peluda com mancha branca na ponta. Orelhas com pontas caídas. Encontrado no Sarandi em 5/5/24."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1h5bjrVGsSlnbltOCm3K8k1JiW77HzWXu",
      "location": "Lar temporário com Jackson Figueiredo, contatar através do Instagram @pets_resgtadaospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino porte médio, grande. De cor preta com mancha branca no focinho. Pelagem curta."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eYZN0tMQ4LxrkvzjO13qGXaY21YrCL7b",
      "location": "Entrar em contato com o Instagram @pets_resgatadospoa para mais informações.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de pelagem curta, cor amarela com mancha branca no focinho e peito. Foi resgatado no Sarandi 5/5/24. Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12XYiIqALMy1UdBob021ca6gBrPhJzqQS",
      "location": "Abrigo Barbosa Gonçalves 61",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino, focinho longo de cor caramelo e preto. Resgatado no Sarandi em Porto Alegre."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15Q4DyqsXJ_ctEszhNfsx9DMXlXF_5Gk5",
      "location": "Abrigo Barbosa Gonçalves 61, Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Cinza"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de porte médio, cor cinza. Pelagem de comprimento médio. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1O9kQoLIRGVOKCYE-EhH_LXUTsW0tZXcc",
      "location": "Abrigo Barbosa Gonçalves 61, Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino de focinho longo, pelagem de cor preta com marrom claro. Resgatado no Sarandi."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hMhjo_iWlXHTCNhI10DtlgMWDWfvPLAz",
      "location": "Resgatado por Jackson Figueiredo, contato através do Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege"
      ],
      "observations": "Canino de porte médio, pelagem branca com pintinhas marrom claras, duas  manchas marrons maiores envolvem orelhas e olhos. Olhos castanho claros."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1j8xxhjNakt0sKmqy4HQCiDSv7Zbf0jyb",
      "location": "Contatar através no Instagram @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "observations": "Canino de cor preta com caramelo. Resgatado no Sarandi."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hAQLJIXh4IXAdJGQjkcq-lfaQ0OdNZ9W",
      "location": "Contatar através do Instagram de @pets_resgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "observations": "Canino branco com manchas marrons claras nas orelhas e olhos. Mancha marrom clara no dorso."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gp9dDZ7CXnlA0hd0Q7g-Ql9cVGvchVyt",
      "location": "Contatar Instagram @petsresgatadospoa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, porte médio, cor caramelo. Resgatado no Sarandi."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NHpuA2m581AhHkVaIPkwAz8MKkoJadHa",
      "location": "Fenac NH",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Canino macho, pitbull preto com\nManchas brancas nas patas e no peito. Bem cuidado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yl-bsq7s6YQNWVucqwbo8zw0c8RuCB7m",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, porte pequeno. Cor preta. Orelhas e cauda peludas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/165Ociuo1JdghGZ1VtUqq27zTLk-XFlxV",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, porte pequeno. Patas curtas, corpo alongado. Peludinho de pelagem lisa preta. Orelhas e cauda peluda."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OyOVQ_th9WQkpXoMJc7sCbrXrfIm77za",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, porte médio. Pelagem curta de cor branca com manchas marrons."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eKkZtWLhHakwfB1lzlXTCu5AtglK5GXU",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, porte pequeno. Patas curtas, pelagem curta. Orelhas grande  com pontas caídas nas laterais. Tem manchas bem brancas nas patas e no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FxwaV58gQFHTA7RE6DjfUFoci12s0HyO",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea de pelagem crespa e comprimento medio possivelmente tosada. Cor branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1e2r5qvY6yG2EBXP-jXgFVdiUEak63194",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino de porte médio, cor preta com\nMancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16ryM7gAHl88KGaHcmMiYUBrbxSPbWEgt",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida",
         "Beagle",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho de cor predominante preta, com patas, focinho e peito caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YXugj8OT7S5U0d0RdxNlva9OvAGEZUR4",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino de pelagem crespa, cor branca com orelhas cinzas. Focinho de comprimento curto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14qSl2FQKv-2IffrlGNAJrSWyh0JcfjxI",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho de porte pequeno. Peludo. Pelagem volumosa e com vários nós. Cor caramelo. Orelhas cinza escuro/preto. Mancha escura perto do rabo. Rabo peludo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12u-3j_0-w4UWSLmHO0TF3nKZZvZQdqpi",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino de corpo esguio, pelagem crespa e branca."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mavdbIadURY8F847eiqvzsHvuaEaC6lB",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino tamanho pequeno, caramelo com preto. Mancha branca no peito. Pêlo curto, causa longa e fina. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1O-B7cH_3AorzceNZ7t385VvDPeOCBR0x",
      "location": "Abrigo Ingrid Novo Hamburgo",
      "breeds": [
         "Pastor Alemão",
         "Filhote"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": "Muito dócil"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_bZg37eXLrjplizqER185Z46E-onktbl",
      "location": "Abrigo Ingrid Novo hamburgo",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Está ceguinha de um olho, muito dócil"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xsOPo2gGnhoSItoekrHt2Pg7nDtZ4EUk",
      "location": "ABRIGO INGRID NOVO HAMBURGO",
      "breeds": [
         "Nao sabemos dizer o que é"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Muito brabo... mas esta com medo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GH6w_LGkbsjelzoJCtW157C2Y57d_4AP",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de médio porte, pelagem curta e preta. Mancha branca no peito. Cego de um olho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CZM6PoOB8_o-2X3j1iTNvqd-sMjnDn3H",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege",
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, porte médio. Cor bege, amarela clara. Mancha branca no peito. Bem cuidada."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1I4NvruCMYL_zCaApdttH1pRhjMqAN14v",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, porte médio/grande. Pelagem amarela com focinho mais escuro preto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1B_IfBd4u3-tty5orL_TOxFE4NE7bcAsG",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, de porte pequeno e pelagem lisa. Orelhas e cauda de pelagem mais comprida. Orelhas caídas e arredondadas estilo orelhas de cocker. Cor preta com mancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bquPXkrBS_GljRsV1Z_00CY3g7MOzx-Y",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho e porte médio. Cor preta. Orelhas caídas, focinho largo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mFXjYQhfU8iyd_OrX4M2vlSTE0FXuMK1",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho de corpo esguio, cor branca. Pêlo curto. Focinho fino, orelhas pontudas, patas finas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/154zAT87sKlzT_ijvcBtWGMnEmg8t3DlJ",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, tamanho pequeno. Pelagem curta de cor branca com manchas pretas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YmFKjS0Dg9Wc8nJ6tqyjB1pvCw08gVEi",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de pêlo curto, focinho longo de cor preta. Tem alguns pontos de pêlos brancos aparentemente por causa da idade. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho, de pelagem curta e cor branca com manchas marrons."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nNBGgIfd5Zz_l3KD-jbgo2WnCHMKhsrF",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": "Canino macho de porte pequeno, pelagem curta. Marrom claro com mancha branca no peito e nas patas. Cabeça e focinho arredondados, orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LtndqgoYTupL454AacH3KJ_jgu-J4MRq",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Adulto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LX7Z0CUArnnt521-_oXAAN6OK03DKcqq",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Rajado",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho de pelagem curta e de cor mesclada cinza, preto e branco. Mancha branca ao redor do focinho. Orelhas caídas. Focinho longo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15ygQseDR0DPWDI6fwtGEGiRfuAedKMbM",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho, porte pequeno, corpo robusto, causa longa. Pelagem curta da cor cinza."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sA98Dj6fKcs_eb9PSvNdxQR_3nWr5QMX",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cor rajado preto e marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1m--E3NC4Lki2PopeUDmhH_DHIUUH2crO",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho de corpo alongado e patas curtas. Pelagem lisa e longa. Orelhas caídas. Da cor preta com patas e peito caramelo com manchas brancas. Cauda longa e peluda."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w8kPyl7p7NmeJTdWHPQx-dF4oNP5OGqp",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Cabeça marrom detalhe em cima dos olhos em caramelo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vctXdjfeRJo9itgBwik-E_3bydJMURMd",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Falhas no pelo na carinha"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zGiKe8rMYAGkni_uTOloGAME2p8tdQ_q",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Corpo rajado preto e marrom pescoço e patas brancas detalhe carinha branca"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sJ_jUyQAyCOYFNg_5XlZrANo1T9lxMvR",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Peito e patinhas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BGMMqeYofCEgwJ2iQV_edlJ4SUkRc1km",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Pelo pouco alto detalhes em preto no fuço e nos olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PM7WY94w74cvYACmDswtp8w-FQRg3ykw",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Caramelo com rajado em preto nas costas e no pescoço ponta do fuço preta"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DLOwGvlscW69fbeWg5Ax5Cxcxj4LBGeJ",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Peito branco ponta do fuço preta orelha peludinha"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YQac0h-fA2cVY7ysUmm1SeMK6CPFgVYa",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Dentinhos do meio em baixo pra frente"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lWG7BhvXwUpBJmFDCjEjDRiEmpYPfxUr",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Patas e peito branco olhos verdes"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZIyY8bB7ZlvyX_RvfmNsrT8efgnoSyVX",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Patas, fuço, peito e em cima dos olhos em marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cKpb33lVqFUgB-TbYi1Tqq8Hdn-Adi_m",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Pata e peito branco, lista branca no meio dos olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1coZXCYuREs8Lxx8qUU_KW5JLp7MxbEyr",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes em bege na carinha"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xDwTW-wESSEnhDgHO14YWrgd6rGi9x29",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sxrOVkBgVHxmFYiMFUnyfDydYJ0L-ygG",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Peito branco pontinha patinhas traseiras brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1K0xVm9pCu1dKQnUu15NGf5iIo_XGZ-A9",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kXDje22GKM3XXVcNnCja0YDdzxCmY9NK",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Patinhas em marrom sobrancelha marrom pelinhos bege nas orelhas / peludinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19S7cxJjiJimEclz4NakmR-zokL55VE--",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida",
         "Rottweiler"
      ],
      "porte": [
         "Pequeno",
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17QFxkJ4pXUzBFrYoQE0QYKx5WGYYE5U_",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Lateral da carinha contornando os olhos em marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ta0xvHsGFUraD4k7_nbeLs8Jg8Vipxj4",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Orelhas e parte superior da cabeça em caramelo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13gB-jw6DkmuC7Q61CkFpOu5kJ-ysZu8d",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fpUpHHYtSC3nR6PHVUnAPAdxx7czVCxo",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida",
         "chow chow"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JmWmGkfnLg6RyIbIkLiHHdQWkSnaobUi",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "chow chow"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "mestiça"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ybyroxIj7YlWKYq0DAb-7UObdbkRUfK0",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ro4-TdC13dUSg1jDtUCfHx2LqwgVh-5k",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Cabeça e parte do corpo rajado com marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Biu8WzSQjxdMLnoWP4r2YDxXXryiI_nu",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "numero 80"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1R6KvmueQhjVcO8oY033yj5CQ9l7cr8aJ",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo",
         "Laranja"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "numero 81"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cwX7q4Ye0CXM5k3StcVcJ2NInCptrktp",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Peludinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AkSyPRBqHtnYa_IrrCEcrhykeXoXQHsO",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qdw01fIf8CTPxem3uvKCfJccVkQfdZsH",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Shih Tzu"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Detalhes amarelados no pelo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cYCZIhVSTAuVyXR3hPYCEIJM8mWM5qBi",
      "location": "Ginásio Agostinho Cavasotto",
      "breeds": [
         "Sem raça definida",
         "Rottweiler"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "Detalhes em marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YqNEdLIT-5GymV1Xc0xIOX6ACmRV6icF",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "numero 83"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Q-WpK833j0xxJ-S-ID3lLNvgJXhiZmZw",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "numero 87 - suspeita de cio - cara preta com focinho branco - mancha preta nas costas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1StxhLhKj-h9fFDN4ngXMmda2mtd8IjRF",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto",
         "Idoso"
      ],
      "observations": "numero 78"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1OlLR5HeFUw0STuExlNjSiyxd_0p1sdwX",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "numero 77 - patinhas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jX-TFq8XMjm8wiEiFQ_ujnlxPg9BNKXq",
      "location": "Lar temporário com Raquel 51 982066423.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, castrada, grande porte, pelagem curta de cor amarelo, marrom claro. Mancha branca cobrindo o focinho e ao redor dos olhos. Orelhas curtas com pontas caídas. Sobrepeso. Bem cuidada. Foi entregue no Gasômetro dia 7/5/24."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LM7AnBOALmVJfLZ-GYlPfj3zelKBGoOV",
      "location": "Fenac NHH",
      "breeds": [
         "Sem raça definida",
         "“Fox”"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho de porte pequeno. Pelagem curta na cor preta. Rabo comprido e fino. Patinhas da frente viradas para fora."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-SN-RDVaLuUOgjvLZ_bki0g7YWIB8MkE",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea de porte pequeno. Pelagem de comprimento mediano, cor caramelo claro. Focinho de comprimento mediano, e orelhas caídas e peludinhas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QLEzF8eD8-sklFe8EDCaDD3qimFkjdWH",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Canino fêmea, porte pequeno. Pelagem longa preta na cabeça e preta com marrom no tronco. Tem lesões ao redor dos olhos."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aj_o339yaNxIYYRiGZlRIQnLcLPD3Ykj",
      "location": "Cena n NH",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, mistura de labrador ou golden retriever na cor preta, peluda com cauda longa. Focinho alongado, orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ff0fYe7LjU1ux4ElwU3TFGXDAVcrEish",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida",
         "Border Collie"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino mistura de collie. Preto com mancha branca no peito e na ponta das patinhas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1y5aTy9XZP14e0YSWEVeelVro-8p6pPxC",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho, pelagem curta na cor bege, caramelo claro. Possui cauda volumosa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-44rnAefjPScnCUBGKgHmVQma_5wyuES",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino preto, porte pequeno. Pelagem curta na cor preta. Causa longa."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eK69ZkkKQJDN1mcpB_oBTTRmLPQRwhZA",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": "numero 76"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IoTLXpFKsZ2A0sxUWI0Wz3eTlN5D3y70",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, pelagem curta caramelo. Porte pequeno."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BnVWvdZHp3LA9YNzXaIU9mpnwYd8M_cr",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Branco",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "numero 75"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kZTRLs_fF_kJPDqaTar87SiImr6G1833",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida",
         "Fox vira lata"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino pequeno de pelagem curta e cauda comprida. Cor preta com mancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19C-33rWChIO_kBoCoHBTzj76cESBpgW-",
      "location": "Franc Nh",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, de cor branca com muitas manchinhas marrons pelo corpo. Cabeça e orelhas marrons."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Zp1ZbHB4YRNSmdp18MJNmWZcFW3v4HbH",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "numero 75 - mancha branca no focinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kgYqtMqglQtZuXhQAOrs0gGLzX5Tj27M",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho de pelo cut cor caramelo com focinho preto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1iQdXRDY3eYWKFupl8VNPCmrz04_F-UNH",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho de pelagem rajada de preto e cinza. Orelhas pretas e mancha ao redor de um olho. Mancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1W1GVc3ly2LhZQ2kMoMmFX257guAJ8o8i",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Amarelo",
         "Caramelo",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": "numero 12"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EqhvULVREsA7ZpbiCzPXMWt_wmF40R9y",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea, pelagem curta. Cor rajada de preto com marrom."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cRmigDw8gMcdhi_cgVbmoktxfHOgdpYU",
      "location": "Estancia velha - R. Barão do Rio Branco, 29",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "numero 7"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1c1VaShQdxSisleEC5AsKM3ITPvUI03Pg",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea de pelagem curta. Cor caramelo claro/amarelo  com branco."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nqlQsXvoiGoTVwKFfjmVvs0qVkh6qPTl",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege",
         "Amarelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de pelagem curta, com mancha preta ao redor dos olhos. Mancha branca e amarela no peito. Dorso preto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YtRYg--e5Jyt1QOqUb6SgvvKlndtenAP",
      "location": "Franc NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho, porte pequeno, pêlo curto de cor branca com manchas marrons. Orelhas moarrons com pontas caídas, focinho longo, corpo magro."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DmKwib-x51GWMA2Q7QlnzBXcsdmPPdUs",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, porte médio, corpo esguio. Pelagem curta preta com patas, peito e focinho caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lNLtXAD_W5rTi3tRWjWjZ35ICpFMeyij",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino fêmea de pequeno porte. Cor marrom e preta. Pelagem curta. Mancha branca ao redor do focinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZBdjtVnaF9wz6mC6GwNEK-fQmkk3vbCr",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino, macho, porte, pequeno perto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18HoY9Mmj-bQMkBvKY4E609BZg-1oNi2k",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino porte pequeno, pelagem de comprimento médio, ondulado. Cor caramelo. Descabelado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JzzhsVwmpQp-FxkGdH7-NWQ6Tg2MqjNd",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho, pêlo curto, cor branca. Focinho alongado. Orelhas em pé. Corpo esguio."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZGgLzoO5R0NjfphAqRz_hEfTLesem8zv",
      "location": "Fenac NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho, porte pequeno. Pêlo curto preto. Mancha branca ao redor do focinho. Focinho alongado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fcoNsnWXfmamfYdeRATH7GV8cDOQB2Rq",
      "location": "Caramelos do Vale",
      "breeds": [
         "Cho chow"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, da raça chow chow cor marrom médio/caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1P5fGO-Dh8bQZb7PNwV5eDQFwkCnoKYDj",
      "location": "Caramelos do Vale",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Amarelo",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Canino macho, porte médio. Cor preta com patas peito e barriga bege. Focinho longo. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1An533HzI0NHUGMHDYR7affNS5qGDcGFl",
      "location": "Caramelos do vale",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino femea, tamanho médio de cor caramelo. Pelejas caídas. Mancha branca no focinho."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aJwBPQxrN-sHSj378QPw1LM7RE9usnZh",
      "location": "Caramelos Do Vale",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea, peludinha. Bicolor marrom claro e branca. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13mzrWI4RPSrl85z6APAeElD65wCsWq4t",
      "location": "Caramelos do Vale",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino fêmea de pêlo curto e cor preta. Mancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GY3aYJ_q3gHp706It56qBRH5UHhMA1oG",
      "location": "Caramelos Do Vale",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino macho de Porte pequeno. Cor caramelo com mancha branca no focinho, peito e patas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11Tgn7nQbVLyUt3nFokJMfWrTlh6mLTlv",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IMdQff3Uft13J1IIuvdici5YK0lKzuzo",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Amarelo"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ycLFvZt32KJ-dlKbvekCIEfqgB9Hk5FV",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rGsixuzVc0h1hz9PSPln4iChgXYpq1oz",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Rxc5xX2sv6X_7rUvNMh7gv8rGJ0eLOo8",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dKjgIm6pn5N3LEiwvVxEViVvCsFc76v2",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1St0M0zHQMLkRWlxjW7jsmkxFGwIv47xF",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pug"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aToOD-ye2yFkSDtY1PlUOKhHA9nHLihd",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1y2mtGFl-myaYjM3WHuwuRRfiaEcQHAqz",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SWOrg3dBffjtmFF5YsMN9y4Tpd3o7eMm",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KURpqM5OeHxT1LVJ6mjT9bVKVsshMTi9",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/124lVZYuCWp4_1-PFh4b_WXUTxF5iPQ8y",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1n48ltzC95GU8qGIJxUYyTE0s67bhz84Q",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dBNLBw_lE_BSLV4HYtb_8Eo3pR5rr1bs",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xwWcJtl8sud0OdGkrwR2xRSd5HPTxGB8",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cNlgGWJKLefbhBp3lS0TipbUa7BgTh2y",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1e7kGXEGpFkHjD6rXP3_6gCVCq1SVCsFm",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rM6SJZ303Lhq9Bxifz8riZg96XLc_Km2",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xaJskbEFlvpgOuxhn_jpvGNdJN831kuN",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12PsVICuWG9_vvDHMqJ7zLr1BgSiwTbQI",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1x7vnW5yzkoNbnMsyHjOgsn0gaqJrU8bC",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vTo7_XM21vGXQKUCAsXZiTa9Og6LUV5v",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1H2Cs0gI8dTjw9m148sxgzzb8rruvXXLk",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jxrTHvyH42Dw4rHBUMcWgT6HJOol3wKg",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Rs-5sk8KcHdFGkQkBp8DD987sv6mzSUw",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cgKuzeuz1Qq7STQG5zz98W4AlU-v_ZMb",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CCLsWe-6GucIoB8EbcMU-rbEoobUjd5e",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EK_hfn3o8XsvjmbG8EVpX3V_NajktT5k",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YzwnzISg0MakNxgHEYhhYJ5ExPvvbgP4",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12l4EcoumhQUbp1bLtoaKAnEji990nla4",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11LzdDIjnS-lSKii3-_gjbGLWagmM80AX",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GaEqD5VDBSrSHkcx8Hvwesyg5p_Gymii",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CL0LeMSDsEutTv_GqsSVbXTQtFSU4N-U",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aktL-XXevB19qDV6gzwokXk13L7zgKyU",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_ncxSSdogyX7qmOPaakyEgykQYsDShve",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1r4EBeNQvql_qj2DoOCBlG-eNAi-9xkPX",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uRJaseYK8VriLbPgNgJISI_G33AKRC_s",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IDa6zdlbBW0-dNfLI_01j7AnR1bEzB4g",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RoSGqDcBqErxdoNOxRz-bUAgEpKir_9j",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1d4pNEDMZA4gxwXOff3PRA7zJUKtBfMWu",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1YTBhj049zX5IPhs0aD_ozZiHscFC7Zv7",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Yorkshire Terrier"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MbJYCFp7eUycpBBIj8LKy7jszHECes4G",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lF10sxmsvd6nU0lLHck3wQKn1lmDRC2z",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EtQoP8DqGrEGe46Q0nrKyxSAyCnRIlHt",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fF2__7veOUniR3ekzYL_vk6xz1hXbG-o",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1l3p40rItJ3H_jySlQdmOKm6x4Ej6N7e7",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Golden Retriever",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Amarelo"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qO6wzPoSClBbyVj7hvxc8CVOZLes1dwm",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FYJ1dAqh2ZBj0VjJiWauXZzlwfqXOi60",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Td0P_LeUUFfNmuBmTNcf--r83eDZI99s",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11-ArA7zQcrLx0NXNRBG0JiIDG7sP_mUY",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Cvo8NNvrVYOW94Ayy5Mf1NJEsgsck3AG",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1XvShwJk7BIlDnFI2Dy3BwDjX6moq2iJf",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1LkQUHqG9pk-ei5lVGZFa3nNMGKirYys3",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1EZ3gNKAGElhlyhC4W-YYLwCDMW6dh_Xe",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida",
         "Maltese",
         "Shih Tzu"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NbVxHhL_U5F1IZza1ZIuWCg9IGjvGCx5",
      "location": "Bem estar animal boqueirão",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hUiHuCzdpKCaHDvOG36OOeedqiB9bsU6",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_UTsCY5BQJ1bQ_vJVmzbw3mphvBwmhu0",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wmsRlEw0Xq8vgREXbLaey0gJrF16OtwT",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tlmMeLygG81wWiLqI67nrfm-Vby5XeJk",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oMZSnDklf46dNgZ1WtTE_BPE4TzxiWXq",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ljOqJbRO4cgJx9Fdkvv-Dwpe3s5XUmEh",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1X1I7KA4hyx-tbrTH92MVk4E-Rl5QE_07",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13fT6pKbIPBUmIVJ6VTnSZvK-9bI0m2BJ",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1HPpOLmBTCtLon4w1kcITqDaA5aEBz0wp",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WSy0Z3RumVptUg09yJc-068moPwdLx8j",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Rajada marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10nR--m-kEeux4RzfyrSiprn5HnAnMMWh",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1iRm25czGnYGfUeRUIPIWOXZRUOJrki3N",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ozVKD4Px_lVM4VN7-IouZJQBUJ3xTrN6",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1k5ZtAiSi6yb5uAp8GqEy1-pDTPe8vJM1",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zaCKgAXRUv8rrcCzBBWtMcWt_QtixnT1",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/133orpRu4uQewGDKGrG9JeY38jqvKHp7s",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Gr7QTysMksGQvtw1EoxpUssEOmsu1UhH",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida",
         "Boxer"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15bPScOSaJ72MEZi6dtX52vnj87LmCc4_",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13PYSKYfG1NoZvBivRcbeAl6p0QeKOSwH",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18EjrvoarEuMjL7z0JF1g7o4lao4jJfEL",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1o8UiUVa9w5dSw8xThyvGL0oP9R-vEq7c",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DCpvnVo8SsTienGsuBlp8vp3X9kvPOPV",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Patas marrom"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MPtnaQiMP7pwqwCURcCuF_-0IQotXuBp",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BNW6znNCeueh96Sry8cxeHaKWDJx707u",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1lHrbrynSUzXrUDzblXOYhZyQmzJKHqfD",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19OaVtDqk9yFFYHYqoUMZGeTdgzxVZIl6",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BXOEkTPL9WZkNEvvg0bctVMhrMdXq07B",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mJFhRGeQOAMG1_dwt2LEJnqKrpq7BhH1",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CLgrcAv5G9_rHKQ-U-FMZwkPyRrVdduQ",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18Ao00spBhdxMGfSF4pQLMxOZuyluAN9o",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12dNh6rbmvF0BDPzZqbbV0ldEEMe73hrk",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cojLKqCZkIGh620nhJiVHB871Aaw1Sg0",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Border Collie"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12g80HvDbBbLy6h6WIuL4_lELxm_1vuWr",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_QDRy3O_ytynEiK0Llez86WjqYsQL975",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VMe8-NPaWKSh96SXrpFxyA3VEa4wea-A",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1M7zeXBi1eNZVs40XQFDd1R64hn9wfYON",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MgkCIQCsrEiTp0ZBxAlzMPw6aqolW39Z",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ixMJMUp1NfPX5AuF6R9raXYDG8sYk8HA",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CUVUKfc-8x5vuPYnQ0ts37Mb8q3EeaRm",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mmslNNZmlyNkv8FFu7g1S2EbfgK_Bg-8",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aFhLG0J6P7XfOjaTS-saY3bzl4L0jZen",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-aNtnyNDRiEJYvQOfy-w0Uod_co1zhE1",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1r8Up3mc_FDyhWYrPEbnGYR3Vnu2XfZp9",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1E_6-LWIzv24Lb7uOAZSwjD1868QLp0CN",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xhh0n7si3HYwjJKd9BwVgzLgUlaIbyx5",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jTgMUsPG1LCxfZpB-ct_7PXLage8Vs4S",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1u67I8kJ3A5l9dYqllfa3DX53kNpWnT4j",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zE4gsgZ31cNgO5HlCbCdnlYBN8p0rY3a",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_xvnSlscBdDMypU1nybCAqzpFraNLzf_",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1B4gkLwsjwGAvnglI9Qu-kH9oC4Yqf1cQ",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sldGTnHLGV8pHGdYXyXvxeAaFjI3je0B",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NhaOv391VIbD2jxOX0nJF0QcG840JrM1",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gfC6ttkQ4OuCXWKwz2tY669nF3ecjyuV",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tP0F8Acdw6VqWIQUPoczGqlBCg6v0RQH",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VzAQUItb-HujVS3VQW3wyU-OA3_Qssw-",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1b2otLpGofzzau-Byj1y9oofE_iXWMWIg",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jg899Sw6oC8p-0Z7jAxVi4F73y3JjeCF",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14TR3FvyOWABZdGsW7CEgdwOEiv6HeBGR",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CDOeJ4DGjQpDAn4TY4wUHHCRg0Bx1tZD",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dwCe4p6pf2GIs5Lze1-eIkt7-0pcK_z4",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xfcTewNqn4ZcoXDll9LEhb0PHZO-fuR1",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gMgPYYjbJ6RmBqR4_a24WXQilKoWLk0z",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17Jl3Nkm5OMg0qHHSDD8H5ezGTpLOD1Xd",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QO8dz1bVhQR5GBVN69rf8G2SU7NaBZJj",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1e9kPxDBNxt5CIyH_mXzo3htvPgnOeBes",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CS4DNhZJvuoTUgJMNP0AstNzHR-tQ2Pc",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oVWyng2xs9e0PQHYTUActwTTFxeFFbiE",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1xhlg5Jvn8QHtKsoOZeQHrd2dJorOyCKJ",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14QFSog7JRIZ_DE6CGG42qZIMU2-RH7bH",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11_L5FV4gQGjAXsx5qUcatVqYvxR-isqZ",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1elUjTmlrF-YOP7UhkjLS50g0j8lyi6Jv",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vUqo272KuwLO_Z20m3unsp4O9TMGbizN",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1v716jbhgxg42S7ksKFrXmZ9IIQsTnPy7",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bDhHmbWsTnJHFQE2WBOfl1-esM8V9pdM",
      "location": "",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14A7Pvjqbo1MOqRHvQAe7e8TVJT4QRk7k",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ty_T9cBc8YwG0ecu2YKh4Mj1ydtYHmfZ",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12OJJjFebdImSgT-_SYGyJ09j6Nlr_vyP",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ml9-vH_xGLrZYZXmMgQrgRO2XW6JIX7z",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1c30FyLRabfzhdIWsfDJLBdO21mX2ZOsv",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sjmDc6ArIFh7mlMbh8SJGOZBYozV7NyE",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/16TmhRUrKBNwTwuhlozI4dfpFI22EPXWe",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rSNmuHwVAd4EtdlZrLf4zhagcy5eAAzF",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ErfWL9hOniCAN-CcZgpePeHfvR0pdurA",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": "Levado para FENAC"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FCcXZH2C0PWongF7d3pDAvJFbyDzcPgx",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15qu6j7zO00OKIF7Fa397J-GAsPdmUFDa",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1clVZvTpj3JJV5p57Ise_BCR1UDJgNEsk",
      "location": "Rua Francisco Alves, 180",
      "breeds": [
         "Rottweiler"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/15bEty3fXuD52lJkB9rcKrfY2NSlkkVNV",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_bfEHuXzIhGBUBLBHJUP66h7m545tCGu",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pua_qTcXLeg0f-um2ZxQwDuof6InqTxQ",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mC1cjsZAunJ5fLRXvBuYasQ04aGWAar3",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13ZtHX0jcv3qFDLJYRUNt5Fa0xI8lRKPd",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11lbCs1KXo4LnLULbTA16qJ7w0RXz0PCu",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1k2_yINWmvvBzyEcuINCV0IRF_xqalFKN",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida",
         "Rottweiler"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JwFD1JdpPgoCGJomuAIPl7Se3VC87SOR",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wjhlf6fR_6pum3aXOoA2buvfGg9q--RN",
      "location": "cachorrosresgatadosnh",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1h3FueLBw1nUu0SHafcc8po3wCNUT3f1p",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13kY7S2gGsUSprLQuGUQ7jmtqn6UTIRVb",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1grc_rsUYnwxCxF3HQYU-_jiou7S5U6TA",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1E5yKWsxx9PMjFOYhxSojuw3bQZ_krRpX",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BG_9KS5Pfj-eG4FvriUxbXl-GyXuTnTX",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cHooH9MFwSwJ1c_uTpadQKzMad1UF7ON",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bm20Nvo6vhUkv7IFuWLgog8KCRunOIal",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cIHO2fZm08xwuemwr2ZQSHIYzHSRdvjP",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1pqkDwYYSi6KLwJkZZvUNzm16QrnldWrD",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kt9RCD0MNb31FCiABkErXTOnn8BBH8zN",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GG5is2A8N_S4MwaAKEO8o8UpRMW1OiQ6",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1CumWwgiQPGrR3e3gqG4VOgE95aUDnUpr",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vYNbjAcVRNm8VRnRPMUZFPCurL8bnI0I",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Golden Retriever",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1A-wNoxe3_jegIM5sgkHCnuv8ZtaDBRbV",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AT_lbVW-XYrmV3h2-I5W9f73UpdKDrpm",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gBY203p9lx7TlDt0yxA2NDhfQmq8dXD7",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fr2z5OleVDXiEb9MzEUt1mVxrqQtpu94",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WdKE_BRoFO0uHW-TOwtHfmd7c9joQbGy",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19ys8hqKCkiFrZVh5Ao_XuFI17e0jSG0H",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17edfD9b-tDE9ALl94K-pXDvxTKvSNkK-",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19MYFL1L7LUeNiGV5_c8j65AqwAmqu4Lp",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JsucQBZba3juUxV1_BbGIqS9PfDKJq8a",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1kWHx2KEfaHdaef3ozEohCCeYuo5YpX3w",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ePgTkGJpMnoKI8AgIt8BaTDOlTKqNerd",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Q30J141PShK6HdWa6DkzgFdEXfmXttLO",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rlsu1X8acTjowXrn2NjC-UavGfDdVgoQ",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rGRNp5dLIupcm-s02mA3_HCmtYk7puIM",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/11GT4XZRagwyHBtxBR7nW1Fjd-X5YwcFc",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1AWr8Xzz3cWgLnqWFMO8kRQ_TggEqXGrQ",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12-cNVUxjRdaqW7gwIyj0Gw9cAu5J2JK7",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1T1QyCtT-uYxHdSIfGvJNrDcNDeHtQBWl",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1y57KIlx9J9GHhk7b7B-bLf1APfwptaBM",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zgA4_S43pH1JSXL4CPJwIOZ9hVyfn4Xd",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Golden Retriever",
         "Labrador Retriever"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Kb8st0o1qpRvMidZr39snHC7qP4QDkc1",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1NuEw678L-rpNf96XgZSx-E28T6EXrcJ0",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Y5YU_q9TmoHZJQyUfdxjc7mNvZ7-rXk1",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mvntosP1UBXk3TEzpfsiRqWhzL22Xbmp",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FwVbWPsouYFsCVri2nV6zhCupHEcYAvG",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "Cego de ambos os olhos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1QuMxv_kqk5NUFaNHS0ySu-X8qJ0o1YuV",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UdJ9Ab6SmgEAY1s--bXh90EZwHHYywI1",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18uMPwllYmfF6amRn7FfhxvJhxk0fQURk",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Lz2nBa0qA1V4wFvLNRYDHzNb1qYgl2TN",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Poodle"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Fêmea",
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ItylzvlNSPfV8LtyvdxO3NMwu_x5gq-s",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1P3yeWHr_X1XCBnus7EJfxe9U8g0CP54o",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17rD5bmoOvCKZuGNsBJpGyQO_AtdOKvPY",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18OHY2-egNeg-cSq_QJH4oVkmqeq_wKG6",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Af-Xc3L9CC8qZiwZxChugA5MJ4p89Buo",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1btwVhuAdVN4bLatAAkOJ3mJhTYldCSCb",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Q3gEMvdUABlQlEQNu7lS1QDeJIW7S79C",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18C0nI-NknZrtxUyxyMNnBUahEXPz69Td",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17Jvp9h2MwB58EsSOEcpE0lArO2ed3Q1z",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wXhAxlLpJJSEuQJOIAv9K77lm32Q9jjv",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1g-94GBUGnMeu2vsfljufTXW0zdasHcSy",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Maltese"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ZVxrh1GG-U1MqBV_UzJdV3f_nfja5v5H",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JuZCZQu5wsVoxAdpNd2G1XDrGw8esdjn",
      "location": "Ulbra Canoas",
      "breeds": [
         "Pug"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Canino macho da raça pug. Cor bege, focinho preto. Focinho curto."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Qj3ey2VrFaQH3cfeiA7qQHtwyqbX3UqZ",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto",
         "Idoso"
      ],
      "observations": "Passou por cirurgia para remoção de mandíbula"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1XrkEB1d2rSJcn533tcRhKL0iKSqBzFPC",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Y_l8MsOjNq8KnwKmyB3QNPsCJTFsNebT",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PMh51OozfAX9VPSIlGEZUZEMuAFnjy6E",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IKtxkmrVTsonpGr-P9U1av5ZFj4gIive",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mJfWUY1IPdUgksdccUXtgu2pJpEFhdBD",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BtMveFxsrdYLfrkcaFHsfZRfMrZW_weS",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hO6ZajzDpQbk4Wju2PX5Xs4St4J6aaWI",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17UKpRFPYuljV0912fFNqrBvgke2I6Y3c",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1wR0TfrwLv1JZrCNTDj2pH1r_wSksq_RD",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1edDYm-JpoehR6EjkytsJIe9JYQNvARqk",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1zQChI0hUc29Cy1hKu7rBUxh57ZF1obVf",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-d6fBRwbtAr-xkLY7kgs2r6wjgDTZ4uy",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bODDnPV_ljR-I_S1iSFSKzn9MVO8spK6",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ubJJpxW6fkrSKOO9l1uuS1ZqjqSHTnN4",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1eVqlyaNKpN25toQkhiQDgsoFFC-6y7Zi",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jO6PUbnBpXE6Ec0-gcyLT7uWHcWsdQfK",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1KkeNmCgu_PDRetwuuGtEtitWq7MI66ST",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18frc2scsAaDbY44XN76-SxtGqJINMFBP",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1M5r1ny9re7ACr_1zz2H1bJDy98_oHlFn",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Cp_c4haqwtai74kyH7PwYTsxm_xy3FRM",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JiYHs0iYm4UJgwpcCh6bKqCy-XllauhA",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qacrqznKwG9f3M8xZon3QD9-mFmkZoGV",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1yynWXo90BnANLQ6ctcmjBeS0XmNJBYTL",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tndcOXz23AqZqh_TfMRj91xSl9997MPA",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1w8uTzGE6LVRLqXxwtwBY30TMAKeZahKw",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dZTV2G3GRW_K30vzuPqDBglt_hBUiZEZ",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1sljSA5gEr_cUVOy2dyK0x4KRMqjL9QIz",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1X6VLsdr-eDeEziaNMzcLAVxG2-K7RYi4",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-a9ouQA2WRtcS82vgXGnuTmO3mJ7nzVD",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1JNpn2XtPdKCXCORjQQxM0Te2tYgt3VND",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qTdiH4wYCD0EKkY4VDqxqTRLPbjfSyHB",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote",
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fVmvU61cZLsw0KumP6av_uXc8O0E-MGX",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1bYqkV0I1uwC9jxOLSaQd-ul6_ku53B2s",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oBdRGGacFC4pWDQX4GkDBZSQ4NDJmp91",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1hPWVkpKlLlhYTnmUKnwNzzf9MqqTfZIH",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Chow chow"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1aS1WxYqO4ahgVJDZTo4ZPGzmqqAacGhB",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13ZRcF3M3ClQR_14Z1u4PHJ69AND6ixSz",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oy0nXfVn5GhYyQO7wT6P5jybz9WuWW45",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1gABEO8SMB-hFMSyR-0JyDDlZnkuRo_8t",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Cinza"
      ],
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1k2BL6R_cnHFIfmzehD3x7CynK97gBNWT",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1V27ozRCKzwQdawaMuTgX_YSRz4fw1bHa",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1mCqjGLa8VhsUvEkXzk4EENm1u0IHhbkm",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19O8tCdUBwWun8CIXsv4BmzyTQEvTe0-K",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1__ancxyUYh8iXaPdxCCZ2bC3qatrEkQh",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vkTRH0ZBk8YtzYe2bp-e6a74n070CAPJ",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13SXcwy4qfbqH1gHc0aSchwJuu4zon52D",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1vHo5RxHd9sSlexMwC-8-0f2LJviDMQut",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1tS4JpBJQeXnHfF_iGTiU79P5T99uyyjQ",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/14FwdCX7MbLV_DcPYXfYcGeOZ4CJN-I3Y",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ika5Dw-ROpyj5TbWzSNs48Oe8Xxczadd",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Cego de um olho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Xm_k8QMTCtcxgw7QLgXu91eItRxDXJWZ",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uaGVGksoK8vlqQRE5sDK2ty_fWkZ81fd",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1reAG-tWilLMDCnclp8G8PbhAxBttx3rP",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1GvYR2a8TeclCjhncdhagRdukYAcx2-L7",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Mancha branca no peito"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18BUWj6u8VVWSMXpm6C16bKUhDnxSE247",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1TytNXhFPHLHVlw7jlxajJrwuldyGuYyF",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UQSbbc8EARsyLjO0VCjt-dydIHnSacz9",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Fm6klGmD9xlbl1ZpP45hoQm6Zy3pFFkl",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1064Y1ohC2LKjlogxwi9b6Gfwcbj8QOAc",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1nPTbbwai50Rco_l4KhI2fHdRvAR13qaw",
      "location": "Restaurante Panorâmico na FENAC - NH",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1VU-23sGOWAxrOlUtlR1IHUYwRbntb50-",
      "location": "Via Atacadista",
      "breeds": [
         "Sem raça definida",
         "Shih Tzu",
         "Lhasa"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de porte pequeno, raça de pelo longo que está tosado. Cor marrom claro. Peludinho."
   },
   {
      "type": "Cachorro",
      "location": "Via Atacadista Canoas",
      "breeds": [
         "Sem raça definida",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de pelo curto, marrom claro. Orelhas grande e pontudas e em pé."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1FUcV0P_ux2il2UxAVz64kpyymsYeXAEi",
      "location": "Via atacadista em Canoas",
      "breeds": [
         "Shih Tzu",
         "Lhasa"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino da raça shit tzu tosado de cor branca com orelhas cinzas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Dd8kPCS3_DrzI1KO6bKnv3zxs5dwqdCP",
      "location": "Abrigo Animal/Bairro Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Am1DtVCzg2hiw4LwmP43CLjChAYrXhfa",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1SZ9Hn3Ktjh4OPaBu_d8lCb6NIXO7p0uL",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rGQNGcFt_nHa7LqhKlY3rsnvqpD-H1O3",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DQK4CcIf9CNP9S0mz17YxgBrN1C6blBt",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/117H0s5LJG2xha9Tt95FCcMwUx25ObT5N",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Ugtx3vq3yeG018J1JSBFya8kmJYzsYKB",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uUslbFwHrAia_UxTEpIpX5hmAAF8OAHl",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/19I9N3wL3SMZmKVq-FWpOXdmjMok0sonw",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Filhote"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dDbWsTocIhAALtgXyXM2KXrcZtM4ahWy",
      "location": "Lar temporário com Letícia 51 993416251",
      "breeds": [
         "Poodle"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Bege",
         "Cinza"
      ],
      "age": [
         "Incerto",
         "Adulto",
         "Idoso"
      ],
      "observations": "Canino de porte pequeno da raça poodle. Cor cinza. Está tosada."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17WweewjSvLBX9ANQUtxFoTqem_ZHBT0K",
      "location": "Abrigo Animal, Três Marias/Esteio",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jwPPj5zYk9EXLcky_WYIFPthweKhK3jf",
      "location": "Via Atacadista Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Branco",
         "Marrom"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino na imagem de porte médio, com pelagem predominantemente castanha e alguns traços brancos, principalmente no rosto e patas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1ULLK1CL9sQ-NIUzDvVHkxVGhtOLFC34k",
      "location": "antiga Dom Braga | Travessão - Dois Irmãos",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "caramelo, pelo curto, fuço preto, rabo mesclado, não castrada"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_H2hmLV6nKuObO5zaOKay2z9Nw12E23a",
      "location": "antiga Dom Braga | Travessão - Dois Irmãos",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Mini"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "caramelo clarinho e branco, pelo curto, sem os dentes superiores"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/10MccbIoYdPu47160SCcSU-HdBzf7_c_Q",
      "location": "antiga Dom Braga | Travessão - Dois Irmãos",
      "breeds": [
         "Pit Bull"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "marrom com manchas brancas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1MaAjYusC2MPnJvsnBVWYWvu2pLrOnHbc",
      "location": "antiga Dom Braga  | Travessão - Dois Irmãos",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "pelo cor marrom, preto e caramelo, parece uma lobinha, tem duas unhas extras no 5o dedinho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1m44y3uzrfYu294Ae1s5MzDuuO67JUpGF",
      "location": "antiga Dom Braga | Travessão - Dois Irmãos",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "branca com manchas caramelo, tumor na pata dianteira, castrada"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1J3broB57w4ruVzm2OeJEsUd-Nvc_xXHc",
      "location": "@resgatados_ipa",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Caramelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto"
      ],
      "observations": "Lar temporário com Isabella Garcia"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1oJWBe0z9SwZpyOcIQs0HyYgDc7KpRTFO",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "Nome dado: Vagabundo // Lar temporário com Michel Carlesso"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1uA5WFdQZcmFAdTyR_MdmCX0z6MOlk0ZZ",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Amendoim - número 53\nLar temporário com Luisa Trindade dos Santos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1_8AOhSficBouRRwXlRUCmNlCwYy5IdYo",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Franjinha\nLar temporário com Manoela Santos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RdTPK2FsGhGcb7zwIurn1bhs6N2vFu9V",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": "Chico. Lar temporário com Eduardo Garcia."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1U7kyP1NB1AjjDmKXv-vIZsH2ta-vfGJa",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Macho",
      "age": [
         "Idoso"
      ],
      "observations": "Velinho. Lar temporário com Jéssica Grunhauser"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Flgk1yDECd__XFEaRTNQJRmh4laeo5uJ",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Joca - número 5\nLar temporário com Caroline dos S Cardenal"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1fuT1oWhgGtsgD12qjM_Zk-jR3pxr2R0a",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Olívia\nLar temporário com Mariana Gomes da Silva"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/17Y11GEyFJqMLBYO4XkHxAAiPeDBaZN7P",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Siricutico\nLT: Gabriel Gens"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12dfI5vp6erJg7dZhcspxP9VTWQJH6JLh",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Marrom",
         "Bege",
         "Cinza"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Chiquinha\nLar temporário com Paula Tupinambá"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WvY7vqlizZ-px2ruiQDx1hA21IAbcqib",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Suplinha\nLar temporário com Ana Paula Soares"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DQ7InnOj0TalnywQ7Vf3U6DTy677ofuy",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Shih Tzu",
         "Lhasa Apso"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Cinza"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Negresco\nLar temporário com Carlos Eduardo Saver"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1dZgbZqW6Hv5Vg7lFValzKcptXstpCVm8",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida",
         "Tricolor"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Ana (castrada)\nLar temporário com Isadora Passos"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1DblURnr5Idkt_G3n7KoNarjrzZ9LV3eV",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Tricolor"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Flávia\nLar temporário com Gimena Pereira"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1soLbKXxXHWx412KGwWBuFNnFQ4IWN8s2",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Fêmea",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Lua\nLar temporário com Maria Fernanda S Shiavo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/18fJfw6slqDvQRAivWMMrQEiyeV0Ic76o",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto",
         "Cinza",
         "Rajado"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Cátia (pata branca, fêmea, castrada)"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qj7JpM6ESbpoyLyiBbHvxm0TV2Blhmhf",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Cinza",
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Bruno (macho não castrado)\nLar temporário com Simone S Monneto"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Kz-RRoBCZSTuABnfKYHKhwZSv6uqgAPn",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Oreo"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1cw9OQY8pBQF3JOYW8p_cQhIJp1ji2IwD",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Maria e Mariana"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1-g8j6ZW7bw913KrgcdHED28ciAUO-QlV",
      "location": "IPA, Casemiro de Abreu 1095/Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Marrom",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "\"Veia\""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1Xp_qpGxR2dPr1AGBnKsqBN7BRhwP6hWz",
      "location": "Mathias Velho hj o",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Amarelo"
      ],
      "gender": "Macho",
      "age": [
         "Incerto",
         "Adulto"
      ],
      "observations": "Cão adulto, cor amarela , dócil , resgate enchente Mathias Velho"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1d3uLw0pEu_AWwB3NsOzE8_ULGOfHUpbP",
      "location": "Mathias Velho - Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Grande"
      ],
      "colors": [
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Fêmea amarela , adulta , dócil , fucinho com pêlos brancos , manchas branco no peito e patas"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1F6RvYTHSfCl8UuDThwpoXgfECo1vcrfS",
      "location": "Mathias Velho - Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Rajado"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Macho mesclado branco e marron , listra branco entre o nariz e a testa , cabeça marron predominante"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1D57rAGSOzVhu00Dw10bnHa0bBOqICLsi",
      "location": "Mathias Velho - Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Bege"
      ],
      "gender": "Fêmea",
      "age": [
         "Idoso"
      ],
      "observations": "Fêmea , idosa , amarela com branco , próximo aos olhos e mais escuro , falta alguns dentinhos , já e uma senhora ."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/115D4zp5EFxoUmSgFkLeB6sm_na5_ICEr",
      "location": "Mathias Velho Canoas",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Fêmea , cor predominante branco, manchas pequenas marron , volta dos olhos marron , cabeça tricolor ,marron preto e uma lista branco meio do fucinho  liga nariz até a testa"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1taXPRKcCcTLWCl-9bGRwJ4crhGVAnfQE",
      "location": "Lar temporário, contará pelo Instagram @bela.bailarina",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno"
      ],
      "gender": "Macho",
      "age": [
         "Incerto"
      ],
      "observations": ""
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1IjbWcNvSze-QAB6brd0XoUps8I8jPgBM",
      "location": "Procura-se Um Amigo Rua Professor Cristiano Fischer 420. Porto Alegre",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Cachorro, cor preta, focinho largo. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BziaIKnYtAcDJn1IaujLO6fvUXmuzSgW",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino, focinho longo e fino. Focinho caramelo. Orelhas caídas. Cabeça e de cor preta. Pelagem curta."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/12LXZz0oHnlOeAE36Y0Xw_I7bvBworG8e",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Chihuahua",
         "Salsicha (Dachshund)"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino porte pequeno. Pelagem curta. Cor preta. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1qwOHfvEbv8h1alGIGrYDibJYhuK0s6ln",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de pelagem curta cor caramelo. Focinho longo. Orelhas caídas. Mancha branca no peito."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UyYIy0wCA-SCRfDUBBwVR2NvWA_6v00K",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Pequeno",
         "Médio"
      ],
      "colors": [
         "Preto",
         "Branco"
      ],
      "observations": "Canino, pelagem curta cor preta com manchas brancas. Orelhas grandes e em pé. Focinho alongado."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1WLGRMNGTl77SN7g2gcTQdbfgcNgY2zp3",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Branco",
         "Marrom"
      ],
      "observations": "Canino de pelagem branca com manchas pretas e marrom escuras."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1PUo3X46vIU4MoyZBjx8iGH96EAHG_CXO",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Labrador Retriever"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Bege",
         "Amarelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino de pelagem curta, cor amarela clara. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/13mL1IFojce7Rx-QAotl4VWT9TYBd55Ht",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Chihuahua",
         "Pinscher"
      ],
      "porte": [
         "Pequeno"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino pequeno, preto com marrom. Focinho alongado. Orelhas caídas."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1BcwoGE9f7MUsVbDXommMn6q3gicEiShq",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino, pelagem curta preta."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1UaapZ-6wMmLoxfhFJMPJTPfh11YieO-Q",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Branco",
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino pelagem curta, caramelo claro com branco."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1T9YkbViHM95fzCG6KodE6H0gXZx2VJuo",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Preto",
         "Marrom",
         "Bege",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino, pelagem bege, focinho e orelhas marrons escuras."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1rDyZlIHI4lagmjk5fu9HQcGiqPE4CBea",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida"
      ],
      "colors": [
         "Marrom",
         "Caramelo"
      ],
      "age": [
         "Incerto"
      ],
      "observations": "Canino branco com manchas marrons claras."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1W1E3hGsQ7FjqvnsTmYDA1DykPARRlwzc",
      "location": "Abrigo Procura-se Um Amigo. Rua Professor Cristiano Fischer 420. Porto Alegre.",
      "breeds": [
         "Sem raça definida",
         "Pastor Alemão"
      ],
      "porte": [
         "Médio",
         "Grande"
      ],
      "colors": [
         "Preto",
         "Marrom"
      ],
      "age": [
         "Incerto",
         "Filhote",
         "Adulto"
      ],
      "observations": "Canino de aparência parecida com a raça Pastor Alemão. Cor preta e caramelo."
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1RKgKOWzs2RbNJbskzQAW2l2TG2tqp5u2",
      "location": "Clínica Veterinária Divet.  @divetcv",
      "breeds": [
         "Labrador Retriever"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Amarelo"
      ],
      "gender": "Fêmea",
      "age": [
         "Adulto"
      ],
      "observations": "Não castrada, jovem, dócil"
   },
   {
      "type": "Cachorro",
      "imgUrl": "https://lh3.googleusercontent.com/d/1jxPNeer7WLLI6Bofz1PJHgSG_eM89EIR",
      "location": "Clínica Veterinária Divet. @divetcv",
      "breeds": [
         "Sem raça definida"
      ],
      "porte": [
         "Médio"
      ],
      "colors": [
         "Preto"
      ],
      "gender": "Macho",
      "age": [
         "Adulto"
      ],
      "observations": "Dócil."
   }
]