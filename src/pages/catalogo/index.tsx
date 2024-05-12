import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
import Pet from '@/models/pet';
import PetCard from '@/components/PetCard';
import { Hanken_Grotesk } from 'next/font/google';

const hanken_grotesk = Hanken_Grotesk({
   weight: '500',
   subsets: ['latin'],
})

export default function Catalogo() {
   const [pets, setPets] = useState<Pet[]>([])

   const queryString = (params: Object) => Object.entries(params)
      .map(([key, value]) => {
         // If the value is an array, serialize it
         if (Array.isArray(value)) {
            return value.map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
         }
         // Otherwise, encode key and value normally
         return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');

   useEffect(() => {

      const query = queryString({ type: 'Cachorro', age: ['Filhote'], breed: [`Poodle`]});

      fetch(`/api/pet?${query}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setPets(data);
         })
         .catch((error) => {
            console.error('Error fetching pets:', error);
         });
   }, []);

   return (
      <div className={`${hanken_grotesk.className} w-full h-screen`}>
         <div className='w-max flex p-5 border-solid border-1 border-black m-10'>
            <h1>RESULTADOS ENCONTRADOS</h1>
         </div>

         <div className={`grid grid-cols-4 gap-x-4 gap-y-10`}>
            {pets.map((pet, i) => (
               <div key={i} className='h-auto flex'>
                  <PetCard pet={pet} />
               </div>
            ))}
         </div>
      </div>
   )
}