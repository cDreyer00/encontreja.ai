import { useState } from 'react';

import Pet, { PetType, PetAge, PetGender, PetBreed } from '@/models/pet';
import { Input, Checkbox, CheckboxGroup, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';

export default function PetForm() {
   const [type, setType] = useState<string>();
   const [location, setLocation] = useState<string>('');
   const [breed, setBreed] = useState<string[]>([]);
   const [color, setColor] = useState<string>('');
   const [observations, setObservations] = useState<string>('');
   const [imgUrl, setImgUrl] = useState<string>('');
   const [age, setAge] = useState<string>();

   const breeds = [
      'Sem raça definida',
      'Beagle',
      'Border Collie',
      'Boxer',
      'Bulldog Francês',
      'Bulldog Inglês',
      'Cavalier King Charles Spaniel',
      'Chihuahua',
      'Cocker Spaniel',
      'Doberman',
      'Golden Retriever',
      'Husky Siberiano',
      'Labrador Retriever',
      'Maltese',
      'Pastor Alemão',
      'Pinscher',
      'Poodle',
      'Pug',
      'Rottweiler',
      'Salsicha (Dachshund)',
      'Shih Tzu',
      'Yorkshire Terrier',
   ]

   const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setType(event.target.value);
   };

   const handleBreedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (event.target.checked) {
         setBreed([...breed, value]);
      } else {
         setBreed(removeArrStrItem(value, breed));
      }
   };

   const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setAge(event.target.value);
   };

   const handleDescription = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setObservations(event.target.value);
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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
      <form className="max-w-96 mx-auto mt-8 text-black">
         <div>
            <Listbox
               label="Pet"
               selectionMode='single'
               disallowEmptySelection
            >
               <ListboxItem key='cachorro'>cachorro</ListboxItem>
               <ListboxItem key='gato'>gato</ListboxItem>
            </Listbox>
         </div>

         <div>
            <Input label='Local/Abrigo' />
         </div>

         <div>
            <CheckboxGroup
               label="Raça"
               defaultValue={["Sem raça definida"]}
               orientation='horizontal'

            >
               {breeds.map((breed) => (
                  <Checkbox key={breed} value={breed}
                     classNames={{
                        base: 'max-w-xs',
                     }}
                  >{breed}</Checkbox>
               ))}
            </CheckboxGroup>
         </div>

         <div>
            <Input label={'cor da pelagem (separar com virgula)'} />
         </div>

         <div>
            <Listbox
               label="Genero/Sexo"
               selectionMode='single'
               disallowEmptySelection
            >
               <ListboxItem key="Macho">Macho</ListboxItem>
               <ListboxItem key="Fêmea">Fêmea</ListboxItem>
            </Listbox>
         </div>

         <div>
            <CheckboxGroup
               label="Idade"
               defaultValue={["indefinido"]}
               orientation='horizontal'

            >
               <Checkbox value="indefinido">indefinido</Checkbox>
               <Checkbox value="jovem">jovem</Checkbox>
               <Checkbox value="adulto">adulto</Checkbox>
               <Checkbox value="idoso">idoso</Checkbox>
            </CheckboxGroup>
         </div>
         {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button> */}
      </form>
   );
}

function MultiSelectDropdown({ formFieldName, options }: { formFieldName: string, options: string[] }) {
   return (
      <form>
         <select name='select' multiple className='size-56'>
            <option>one</option>
            <option>two</option>
            <option>three</option>
         </select>
      </form>
   );
}