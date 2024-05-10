import { FormEventHandler, useState } from 'react';

import Pet, { PetType, PetAge, PetGender, PetBreed } from '@/models/pet';
import { Input, Checkbox, CheckboxGroup, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';

export default function PetForm() {
   const [type, setType] = useState<string>();
   const [location, setLocation] = useState<string>('');
   const [breeds, setBreed] = useState<string[]>();
   const [color, setColor] = useState<string[]>();
   const [observations, setObservations] = useState<string>('');
   const [imgUrl, setImgUrl] = useState<string>('');
   const [age, setAge] = useState<string>();

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

   return (
      <form className="max-w-96 mx-auto mt-8 text-black">
         <div>
            <Listbox
               label="Pet"
               selectionMode='single'
               disallowEmptySelection
               selectedKeys={type}

               onSelectionChange={(set) => setType(set as string)}
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

         <div>
            <Input label='Observações' />
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