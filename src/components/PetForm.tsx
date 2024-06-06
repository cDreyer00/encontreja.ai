import { FormEventHandler, useEffect, useState, useMemo } from 'react';

import Pet, { mountPet } from '@/models/pet';
import { Input, Checkbox, CheckboxGroup, Listbox, ListboxItem, ListboxSection, SelectItem, Select, Image, Button } from '@nextui-org/react';
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter
} from "@nextui-org/modal";

type SubmitPet = (pet: Pet) => void;

export default function PetForm({ onSubmit }: { onSubmit: SubmitPet }) {
   const [type, setType] = useState<string>("");
   const [location, setLocation] = useState<string>();
   const [breeds, setBreed] = useState<string[]>([]);
   const [color, setColor] = useState<string[]>();
   const [observations, setObservations] = useState<string>();
   const [imgUrl, setImgUrl] = useState<string>();
   const [age, setAge] = useState<string[]>();
   const [gender, setGender] = useState<string>("");
   const [size, setSize] = useState<string[]>();

   const [allBreeds, setAllBreeds] = useState<string[]>([]);
   const [allColors, setAllColors] = useState<string[]>([]);
   const [allSizes, setAllSizes] = useState<string[]>([]);

   const [allAges, setAllAges] = useState<string[]>([]);
   const [allCategories, setAllCategories] = useState<{
      dogBreeds: string[],
      catBreeds: string[],
      colors: string[],
      sizes: string[],
      ages: string[]
   }>();

   const [isLoading, setIsLoading] = useState<boolean>();

   let tempFolderId = '1v4_bvJ9P8JJWICK9dLATd6IQCMJRiiuY';
   const formSectionClass = 'mt-4';

   useEffect(() => {
      if (!allCategories) {
         getCategories().then((data) => {
            setAllCategories(data);
            setAllColors(data.colors);
            setAllAges(data.ages);
            setAllSizes(data.sizes);
         })
         return;
      }

      if (type === 'cachorro')
         setAllBreeds(allCategories.dogBreeds);
      else if (type === 'gato')
         setAllBreeds(allCategories.catBreeds);

   }, [type]);

   useMemo(() => {
      if (!allCategories) return;

      if (type === 'cachorro')
         setAllBreeds(allCategories.dogBreeds);
      else if (type === 'gato')
         setAllBreeds(allCategories.catBreeds);
   }, [allCategories]);

   async function getCategories() {
      let res = await fetch(`/api/categoria`)
      if (!res.ok) throw new Error('Failed to fetch category values')
      let data = await res.json()
      return data;
   }

   const removeArrStrItem = (str: string, arr: Array<string>) => {
      let newArr: string[] = []
      for (let i = 0; i < arr.length; i++) {
         if (arr[i] === str) continue;
         newArr.push(arr[i])
      }

      return newArr;
   }

   async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();

      const pet = mountPet({
         type,
         gender,
         location,
         age,
         breeds,
         color,
         imgUrl,
         size,
         observations: observations as string,
      });


      onSubmit(pet);
   }

   function clearForm() {
      setType('');
      setLocation('');
      setBreed([]);
      setColor([]);
      setObservations('');
      setImgUrl('');
      setAge([]);
      setGender('');
      setSize([]);
   }

   async function onImageUpdate(e: React.ChangeEvent<HTMLInputElement>) {
      setIsLoading(true);

      let file = e.target.files![0]
      let url = URL.createObjectURL(file)
      setImgUrl(url)

      let formData = new FormData()
      formData.append('image', file)
      formData.append('folderId', tempFolderId)
      let res = await fetch('/api/image', {
         method: 'POST',
         body: formData
      })

      if (!res.ok) {
         console.error('Failed to upload image')
         setImgUrl('')
         alert('Failed to upload image')
         return;
      }
      let data = await res.json()

      setImgUrl(data.imgUrl)

      let aiRes = await fetch(`/api/analisar?img=${data.imgUrl}`)
      let pet = await aiRes.json()
      setType(pet.type)
      setBreed(pet.breeds)
      setColor(pet.colors)
      setObservations(pet.observations)
      setAge(pet.age)
      setSize(pet.size)

      setIsLoading(false);
   }

   return (
      <form className="max-w-[70%] w-auto h-auto max-h-screen mt-8 mx-auto flex flex-row align-middle justify-center gap-10">
         {isLoading && (
            <Modal isOpen={true}>
               <ModalContent>
                  <ModalHeader>Carregando...</ModalHeader>
                  <ModalBody>
                     <p>Analisando imagem do seu pet, por favor aguarde...</p>
                  </ModalBody>
               </ModalContent>
            </Modal>
         )}
         <div>
            <input type="file" accept="image/*" onChange={(e) => onImageUpdate(e)} />
            <Image
               src={imgUrl}
               alt="Imagem do pet"
               width={200}
               height={200}
               className="rounded"
               referrerPolicy='no-referrer'
            />
         </div>
         <div>
            {imgUrl && (
               <>
                  <div className={formSectionClass}>
                     <Select
                        label="Pet"
                        selectionMode='single'
                        onChange={(e) => setType(e.target.value)}
                        selectedKeys={[type]}
                     >
                        {['cachorro', 'gato'].map((type) => (
                           <SelectItem key={type.toLowerCase()} value={type.toLowerCase()}>{type}</SelectItem>
                        ))}
                     </Select>
                  </div>

                  {/* <div className={formSectionClass}>
                     <Input label='Local/Abrigo' value={location} onValueChange={setLocation} />
                  </div> */}

                  <div className={formSectionClass}>
                     <Select
                        label="Genero/Sexo"
                        selectionMode='single'
                        onChange={(e) => setGender(e.target.value)}
                        selectedKeys={[type]}
                     >
                        {['incerto', 'macho', 'fêmea'].map((gender) => (
                           <SelectItem key={gender.toLocaleLowerCase()} value={gender.toLocaleLowerCase()}>{gender}</SelectItem>
                        ))}
                     </Select>
                  </div>

                  <div className={formSectionClass}>
                     <CheckboxGroup
                        label="Raça"
                        orientation='horizontal'
                        onValueChange={setBreed}
                        value={breeds}>
                        {allBreeds.map((breed) => (
                           <Checkbox key={breed.toLowerCase()} value={breed.toLowerCase()}
                              classNames={{
                                 base: 'max-w-xs',
                              }}
                           ><p className={`text-white`}>{breed}</p></Checkbox>
                        ))}
                     </CheckboxGroup>
                  </div>

                  <div className={formSectionClass}>
                     <CheckboxGroup
                        label="cor da pelagem"
                        orientation='horizontal'
                        value={color}
                        onValueChange={setColor}
                     >
                        {allColors.map((color) => (
                           <Checkbox key={color.toLowerCase()} value={color.toLowerCase()}
                              classNames={{
                                 base: 'max-w-xs',
                              }}
                           ><p className={`text-white`}>{color}</p></Checkbox>
                        ))}
                     </CheckboxGroup>
                  </div>

                  <div className={formSectionClass}>
                     <CheckboxGroup
                        label="Tamanho"
                        orientation='horizontal'
                        onValueChange={setSize}
                        value={size}
                     >
                        {allSizes.map((size) => (
                           <Checkbox key={size.toLowerCase()} value={size.toLowerCase()}
                              classNames={{
                                 base: 'max-w-xs',
                              }}
                           ><p className={`text-white`}>{size}</p></Checkbox>
                        ))}
                     </CheckboxGroup>
                  </div>

                  <div className={formSectionClass}>
                     <CheckboxGroup
                        label="Idade"
                        orientation='horizontal'
                        onValueChange={setAge}
                        value={age}
                     >
                        {allAges.map((age) => (
                           <Checkbox key={age.toLowerCase()} value={age.toLowerCase()}
                              classNames={{
                                 base: 'max-w-xs',
                              }}
                           ><p className={`text-white`}>{age}</p></Checkbox>
                        ))}
                     </CheckboxGroup>
                  </div>

                  <div className={formSectionClass}>
                     <Input label='Observações' value={observations} onValueChange={setObservations} />
                  </div>
               </>
            )}

            <Button type="submit" className={`${formSectionClass}`} onClick={handleSubmit} isDisabled={!type || !imgUrl || breeds!.length < 1}>
               Enviar
            </Button>
         </div>
      </form>
   );
}

// function MultiSelectDropdown({ formFieldName, options }: { formFieldName: string, options: string[] }) {
//    return (
//       <form>
//          <select name='select' multiple className='size-56'>
//             <option>one</option>
//             <option>two</option>
//             <option>three</option>
//          </select>
//       </form>
//    );
// }