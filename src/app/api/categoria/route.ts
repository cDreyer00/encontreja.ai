import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
   const params = req.nextUrl.searchParams;
   const category = params.get('q');

   const res = 
      category === 'raca' ? breedValues : 
      category === 'cor' ? colorValues :
      [];

   return new Response(JSON.stringify(res));
}

const breedValues = [
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

const colorValues = [
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