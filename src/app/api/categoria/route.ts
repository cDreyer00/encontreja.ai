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

const catBreeds = [
   'Sem raça definida',
   'Azul Russo',
   'Bengal',
   'British Shorthair',
   'Gato da Floresta Norueguesa',
   'Mau Egípcio',
   'Maine Coon',
   'Persa',
   'Ragdoll',
   'Scottish Fold',
   'Siamês',
   'Sphynx',
   'Abissínio',
]

const colors = [
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

const ages = [
   'Incerto',
   'Filhote',
   'Adulto',
   'Idoso'
]

const sizes = [
   'Incerto',
   'Mini',
   'Pequeno',
   'Médio',
   'Grande',
   'Gigante'
]

const genders = [
   'Incerto',
   'Macho',
   'Fêmea'
]