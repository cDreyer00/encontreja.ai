import { NextRequest } from "next/server";
import { connectToDatabase, collections } from "@/services/db";

export async function GET(req: NextRequest): Promise<Response> {
   const params = req.nextUrl.searchParams;
   const category = params.get('q');
   console.log(`category: ${category}`);

   if (category === 'abrigo') {
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
                           genders,
                           locations: await getAllLocations(),
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
   'pelo curto brasileiro'
]

const colors = [
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