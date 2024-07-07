'use client';

import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
import Pet from '@/models/pet';
import PetCard from '@/components/PetCard';
import { Hanken_Grotesk } from 'next/font/google';

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

const hanken_grotesk = Hanken_Grotesk({
   weight: '500',
   subsets: ['latin'],
})

interface IParams {
   // [key: string]: string;
}

interface IGetPetParams extends IParams {
   [key: string]: string | string[] | undefined | number | number[];

   type?: string;
   breeds?: string;
   colors?: string;
   age?: string[];
   size?: string;
   amount?: string;
}

export default function Catalogo() {
   const [pets, setPets] = useState<Pet[]>([])

   let params = useSearchParams();

   useEffect(() => {
      let p = exportParams(params) as any;
      if (!p.type) return;

      p = params!.toString();
      console.log('p:', p);
      fetch(`/api/pet?${p}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setPets(data);
         })
         .catch((error) => {
            console.error('Error fetching pets:', error);
         });
   }, [params])

   function exportParams(params: ReadonlyURLSearchParams | null): IGetPetParams {
      console.log('params:', params)
      if (!params) return {};
      let obj: IGetPetParams = {};

      params.forEach((value, key) => {
         if (Array.isArray(obj[key])) {
            // check if obj is typeof number
            if (typeof obj[key] === 'number') {
               let val = value.split(',').map((v) => parseInt(v));
               obj[key] = val;
            }
            else {
               obj[key] = value.split(',');
            }
            return;
         }


         obj[key] = value;
      });

      return obj;
   }

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