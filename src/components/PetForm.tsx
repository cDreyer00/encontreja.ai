import { useState } from 'react';

export default function PetForm() {
   const [pet, setPet] = useState<string>('');
   const [raca, setRaca] = useState<string>('');
   const [idade, setIdade] = useState<string>('');

   const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setPet(event.target.value);
   };

   const handleRacaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRaca(event.target.value);
   };

   const handleIdadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setIdade(event.target.value);
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Handle form submission here
      console.log({ pet, raca, idade });
   };

   return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 text-black">
         <div className="mb-4">
            <label htmlFor="pet" className="block text-gray-700 text-sm font-bold mb-2">Pet</label>
            <select id="pet" value={pet} onChange={handlePetChange} className="w-full border border-gray-300 rounded p-2">
               <option value="dog">Cachorro</option>
               <option value="cat">Gato</option>
            </select>
         </div>
         <div className="mb-4">
            <label htmlFor="raca" className="block text-gray-700 text-sm font-bold mb-2">Raça</label>
            <input type="text" id="raca" value={raca} onChange={handleRacaChange} className="w-full border border-gray-300 rounded p-2" />
         </div>
         <div className="mb-4">
            <label htmlFor="idade" className="block text-gray-700 text-sm font-bold mb-2">Idade</label>
            <select id="idade" value={idade} onChange={handleIdadeChange} className="w-full border border-gray-300 rounded p-2">
               <option value="Jovem">Indefinido</option>
               <option value="Jovem">Jovem</option>
               <option value="Adulto">Adulto</option>
               <option value="Idoso">Idoso</option>
            </select>
         </div>
         {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button> */}
      </form>
   );
}