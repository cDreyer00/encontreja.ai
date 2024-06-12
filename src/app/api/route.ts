import OpenAI from "openai"
import { getImageUrlFromDrive } from "@/services/googleapi"
import Pet, { mountPet } from "@/models/pet"
import { connectToDatabase, collections } from "@/services/db"
import { NextRequest } from "next/server"
import { Filter, AggregationCursor } from "mongodb"

export async function GET(req: NextRequest) {
   return new Response('not allowed');

   // let res = await fixBreeds();
   // return new Response(JSON.stringify(res), { status: 200 });
}

// async function updateValues() {
//    if (!collections.lab)
//       await connectToDatabase();

//    let col = collections.lab;
//    if (!col)
//       return new Response('Erro ao conectar ao banco de dados', { status: 500 });

//    await col.deleteMany({});

//    let pets = dogs.map(fixPet);
//    pets.push(...cats.map(fixPet));
//    await col!.insertMany(pets);
// }

// async function fixBreeds() {
//    if (!collections.lab)
//       await connectToDatabase();

//    let col = collections.lab;
//    if (!col)
//       return new Response('Erro ao conectar ao banco de dados', { status: 500 });

//    let pets = await col.find({}).toArray();
//    for (let pet of pets) {
//       if (pet.breeds?.includes('Pitbull'))
//          console.log(`pitbull found in ${pet._id} img: ${pet.imgUrl}`);
//       let breeds = pet.breeds?.map(b => b.replace('Pitbull', 'Pit Bull'));
//       await col.updateOne({ _id: pet._id }, { $set: { breeds } });
//    }

//    // return pets;
//    return 'ok';
// }

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