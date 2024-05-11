import { FormEventHandler, useState } from 'react';

import Pet, { PetType, PetAge, PetGender, PetBreed } from '@/models/pet';
import { Input, Checkbox, CheckboxGroup, Listbox, ListboxItem, ListboxSection, SelectItem, Select } from '@nextui-org/react';

type SubmitPet = (pet: Pet) => void;

export default function PetForm({ onSubmit }: { onSubmit: SubmitPet }) {
   const [type, setType] = useState<string>();
   const [location, setLocation] = useState<string>();
   const [breeds, setBreed] = useState<string[]>();
   const [color, setColor] = useState<string[]>();
   const [observations, setObservations] = useState<string>();
   const [imgUrl, setImgUrl] = useState<string>();
   const [age, setAge] = useState<string[]>();
   const [gender, setGender] = useState<string>();

   const allBreeds = [
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

   const removeArrStrItem = (str: string, arr: Array<string>) => {
      let newArr: string[] = []
      for (let i = 0; i < arr.length; i++) {
         if (arr[i] === str) continue;
         newArr.push(arr[i])
      }

      return newArr;
   }

   function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();

      if (!type) {
         alert('type is required');
         return;
      }
      if (!location) {
         alert('location is required');
         return;
      }
      if (!breeds) {
         alert('breeds is required');
         return;
      }
      if (!color) {
         alert('color is required');
         return;
      }

      // if (!imgUrl){
      //    alert('imgUrl is required');
      //    return;
      // }

      if (!age) {
         alert('age is required');
         return;
      }

      if (!gender) {
         return;
      }

      const pet = new Pet(
         type,
         gender,
         location,
         age,
         breeds,
         color,
         observations as string,
         imgUrl,
      );

      onSubmit(pet);
   }

   return (
      <form className="max-w-96 mx-auto mt-8 text-black">
         <div>
            <Select
               label="Pet"
               selectionMode='single'
               disallowEmptySelection
               onChange={(e) => setType(e.target.value)}
               value={type}
            >
               <SelectItem key='cachorro'>cachorro</SelectItem>
               <SelectItem key='gato'>gato</SelectItem>
            </Select>
         </div>

         <div>
            <Input label='Local/Abrigo' value={location} onValueChange={setLocation} />
         </div>

         <div>
            <CheckboxGroup
               label="Raça"
               defaultValue={["Sem raça definida"]}
               orientation='horizontal'
               onValueChange={setBreed}
               value={breeds}
            >
               {allBreeds.map((breed) => (
                  <Checkbox key={breed} value={breed}
                     classNames={{
                        base: 'max-w-xs',
                     }}
                  >{breed}</Checkbox>
               ))}
            </CheckboxGroup>
         </div>

         <div>
            <CheckboxGroup
               label="cor da pelagem"
               orientation='horizontal'
               value={color}
               onValueChange={setColor}
            >
               <Checkbox value='Preto' key='Preto'>Preto</Checkbox>
               <Checkbox value='Branco' key='Branco'>Branco</Checkbox>
               <Checkbox value='Marrom' key='Marrom'>Marrom</Checkbox>
               <Checkbox value='Bege' key='Bege'>Bege</Checkbox>
               <Checkbox value='Amarelo' key='Amarelo'>Amarelo</Checkbox>
               <Checkbox value='Caramelo' key='Caramelo'>Caramelo</Checkbox>
               <Checkbox value='Cinza' key='Cinza'>Cinza</Checkbox>
               <Checkbox value='Rajado' key='Rajado'>Rajado</Checkbox>
               <Checkbox value='Laranja' key='Laranja'>Laranja</Checkbox>
            </CheckboxGroup>
         </div>

         <div>
            <Select
               label="Genero/Sexo"
               onChange={(e) => setGender(e.target.value)}
               value={gender}
            >
               <SelectItem key="Macho">Macho</SelectItem>
               <SelectItem key="Fêmea">Fêmea</SelectItem>
            </Select>
         </div>

         <div>
            <CheckboxGroup
               label="Idade"
               defaultValue={["indefinido"]}
               orientation='horizontal'
               onValueChange={setAge}
               value={age}
            >
               <Checkbox value="indefinido">indefinido</Checkbox>
               <Checkbox value="jovem">jovem</Checkbox>
               <Checkbox value="adulto">adulto</Checkbox>
               <Checkbox value="idoso">idoso</Checkbox>
            </CheckboxGroup>
         </div>

         <div>
            <Input label='Observações' value={observations} onValueChange={setObservations} />
         </div>
         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>Enviar</button>
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