import { useState } from 'react';

import Pet, { PetType, PetAge, PetGender, PetBreed } from '@/models/pet';

export default function PetForm() {
   const [petInfos, setPetInfos] = useState<Pet>(new Pet('cachorro', 'indefinido', ['indefinido'], ['vira-lata'], '', 'undefined'));

   const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      let pet = petInfos;
      let type: PetType = event.target.value as PetType;
      pet.type = type;
      setPetInfos(pet);
   };

   const handleRacaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let pet = petInfos;
      let newBreed = event.target.value as PetBreed
      if (petInfos.breed.includes(newBreed))
         pet.breed = removeArrStrItem(newBreed, pet.breed);
      else
         pet.breed.push(newBreed);

      // if(pet.breed.length > 1)
      //    pet.breed = removeArrStrItem('indefinido', pet.breed);

      setPetInfos(pet);
   };

   const handleIdadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      let pet = petInfos;
      let age = event.target.value as PetAge;
      if (petInfos.breed.includes(age))
         pet.breed = removeArrStrItem(age, pet.age);
      else
         pet.breed.push(age);

      if (pet.breed.length > 1)
         pet.breed = removeArrStrItem('indefinido', pet.age);

      setPetInfos(pet);
   };

   const handleDescription = (event: React.ChangeEvent<HTMLSelectElement>) => {
      let pet = petInfos;
      let desc = event.target.value as string
      if (desc === undefined)
         return;

      pet.observations = desc;

      setPetInfos(pet);
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Handle form submission here
      // console.log({ pet, raca, idade });
   };

   const removeArrStrItem = (str: string, arr: Array<string>) => {
      let newArr: string[] = []
      for (let i = 0; i < arr.length; i++) {
         if (arr[i] === str) continue;
         newArr.push(arr[i])
      }
      return newArr;
   }

   return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 text-black">
         <div className="mb-4">
            <label htmlFor="pet" className="block text-gray-700 text-sm font-bold mb-2">Pet</label>
            <select id="pet" value={petInfos.type} onChange={handlePetChange} className="w-full border border-gray-300 rounded p-2">
               <option value="dog">Cachorro</option>
               <option value="cat">Gato</option>
            </select>
         </div>
         <div className="mb-4">
            <label htmlFor="raca" className="block text-gray-700 text-sm font-bold mb-2">Raça</label>
            <input type="text" id="raca" value={petInfos.breed} onChange={handleRacaChange} className="w-full border border-gray-300 rounded p-2" />
         </div>
         <div className="mb-4">
            <label htmlFor="idade" className="block text-gray-700 text-sm font-bold mb-2">Idade</label>
            <select id="idade" value={petInfos.age} onChange={handleIdadeChange} className="w-full border border-gray-300 rounded p-2">
               <option value="Jovem">Indefinido</option>
               <option value="Jovem">Jovem</option>
               <option value="Adulto">Adulto</option>
               <option value="Idoso">Idoso</option>
            </select>
         </div>
         <div className="mb-4">
            <label htmlFor="idade" className="block text-gray-700 text-sm font-bold mb-2">Idade</label>
            <textarea value={petInfos.observations}></textarea>
         </div>
         {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button> */}
      </form>
   );
}