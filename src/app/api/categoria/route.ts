import { NextRequest } from "next/server";
import { connectToDatabase, collections } from "@/services/db";

export async function GET(req: NextRequest): Promise<Response> {
   const params = req.nextUrl.searchParams;
   const category = params.get('q');
   console.log(`category: ${category}`);
   if(category === 'abrigo'){
      let locations = await getAllLocations();
      return new Response(JSON.stringify(locations));      
   }

   const res =
      category === 'raca_cachorro' ? dogBreeds :
      category === 'raca_gato' ? catBreeds :
      category === 'cor' ? colors :
      category === 'idade' ? ages :
      category === 'tamanho' ? sizes :
      category === 'genero' ? genders :
      {
         dogBreeds,
         catBreeds,
         colors,
         ages,
         sizes,
         genders
      }
      
   return new Response(JSON.stringify(res));
}

async function getAllLocations(): Promise<string[]> {
   if (!collections.pets)
      await connectToDatabase();

   let col = collections.pets;
   if (!col)
      throw new Error('Error connecting to database');

   // get all values from location field
   let locations = await col.distinct('location');
   locations = locations.filter((location) => location && location.trim().length > 0);
   return locations as string[];
}

const dogBreeds = [
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
   'lhasa',
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
]

const catBreeds = [
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
]

const colors = [
   'preto',
   'branco',
   'marrom',
   'bege',
   'amarelo',
   'caramelo',
   'cinza',
   'rajado',
   'laranja',
]

const ages = [
   'incerto',
   'filhote',
   'adulto',
   'idoso',
]

const sizes = [
   'incerto',
   'mini',
   'pequeno',
   'médio',
   'grande',
   'gigante',
]

const genders = [
   'incerto',
   'macho',
   'fêmea',
]