import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
import Pet from '@/models/pet';

export default function Catalogo() {
   const [pets, setPets] = useState<Pet[]>([
      new Pet(
         'gato',
         'macho',
         'rua tal',
         ['idoso'],
         ['indf', 'aaa2'],
         ['colors'],
         'https://i.ibb.co/7b4KfP3/IMG-5502.webp',
         'observations',
      )
   ])

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
      const query = queryString({type: 'cachorro'});
      console.log(query);

      fetch(`/api/pet?${query}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            // setPets(data);
         })
         .catch((error) => {
            console.error('Error fetching pets:', error);
         });
   }, [])


   return (
      <div>
         <h1>Catalogo</h1>
         {pets.map((pet, i) => (
            <div key={i}>
               <img src={pet.imgUrl} />
               <h2>{pet.breeds.join(', ')}</h2>
            </div>
         ))}
      </div>
   )
}