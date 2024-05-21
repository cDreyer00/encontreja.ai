import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
   const params = req.nextUrl.searchParams;
   const category = params.get('q');

   const res =
      category === 'raca_cachorro' ? dogBreeds :
      category === 'raca_gato'     ? catBreeds :
      category === 'cor'           ? colors :
      category === 'idade'         ? ages :
      category === 'tamanho'       ? sizes :
      category === 'genero'        ? genders :
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

const sizes =[
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