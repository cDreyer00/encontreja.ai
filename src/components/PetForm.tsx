import { FormEventHandler, useEffect, useState } from 'react';

import Pet, { PetType, PetAge, PetGender, PetBreed } from '@/models/pet';
import { Input, Checkbox, CheckboxGroup, Listbox, ListboxItem, ListboxSection, SelectItem, Select, Image, Button } from '@nextui-org/react';


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
   const [size, setSize] = useState<string[]>();

   const [allBreeds, setAllBreeds] = useState<string[]>([]);
   const [allColors, setAllColors] = useState<string[]>([]);
   const [allSizes, setAllSizes] = useState<string[]>([
      'Mini',
      'Pequeno',
      'Médio',
      'Grande',
      'Gigante',
   ]);

   const [allAges, setAllAges] = useState<string[]>([
      'Indefinido',
      'Jovem',
      'Adulto',
      'Idoso',
   ]);

   let tempFolderId = '1v4_bvJ9P8JJWICK9dLATd6IQCMJRiiuY';
   let dogImgsDbFolderId = '15JrJPxhehgRqtF__GuHtAWGd0atJH5_EfR3pVyMHXd8-INhlMsiWujNW_r0qCdsYNzyBf_dE';
   let catImgsDbFolderId = '1mO0QHnMX8HanFElrvh3CoOv9Ey2f0PO39Y0RqQp4M_QPBpltFyFLkKuGMfpo3bF-0GBZ_QbY';

   const formSectionClass = 'mt-4';

   useEffect(() => {

      getCategoryValues(`raca_${type}`)
         .then((data) => setAllBreeds(data))
         .catch((err) => console.error(err))

      getCategoryValues(`cor`)
         .then((data) => setAllColors(data))
         .catch((err) => console.error(err))
   }, [type]);

   async function getCategoryValues(category: string) {
      let res = await fetch(`/api/categoria?q=${category}`)
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

      if (!age) {
         alert('age is required');
         return;
      }

      if (!gender) {
         return;
      }

      let folderId = type === 'cachorro' ? dogImgsDbFolderId : catImgsDbFolderId;
      let body = {
         "imgUrl": imgUrl,
         "folderId": folderId
      }

      let res = await fetch('/api/image', {
         method: 'POST',
         body: JSON.stringify(body),
      })

      if (!res.ok) {
         alert('Failed to submit image');
         return;
      }

      let driveImg = await res.json();

      const pet = new Pet(
         type,
         gender,
         location,
         age,
         breeds,
         color,
         driveImg.imgUrl,
         size,
         observations as string,
      );


      onSubmit(pet);
      alert('pet sendo cadastrado...');
      fetch('/api/pet', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(pet)
      })
         .then((res) => {
            if (res.ok) {
               alert('Pet cadastrado com sucesso!');
               clearForm();
            } else {
               alert('Erro ao cadastrar pet');
            }
         })
         .catch((err) => {
            console.error(err);
            alert('Erro ao cadastrar pet');
         });

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

   }

   return (
      <form className="max-w-[70%] w-auto h-auto max-h-screen mt-8 mx-auto flex flex-row align-middle justify-center gap-10">
         <div>
            <input type="file" accept="image/*" onChange={(e) => onImageUpdate(e)} />
            <Image
               src={imgUrl}
               alt="Imagem do pet"
               width={200}
               height={200}
               className="rounded"
            />
         </div>
         <div>
            <div className={formSectionClass}>
               <Select
                  label="Pet"
                  selectionMode='single'
                  onChange={(e) => setType(e.target.value)}
                  value={type}
               >
                  <SelectItem key='cachorro' value={'cachorro'}>cachorro</SelectItem>
                  <SelectItem key='gato' value={'gato'}>gato</SelectItem>
               </Select>
            </div>

            <div className={formSectionClass}>
               <Input label='Local/Abrigo' value={location} onValueChange={setLocation} />
            </div>

            <div className={formSectionClass}>
               <Select
                  label="Genero/Sexo"
                  selectionMode='single'
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
               >
                  <SelectItem key="indefinido" value="indefinido">Indefinido</SelectItem>
                  <SelectItem key="macho" value="macho">Macho</SelectItem>
                  <SelectItem key="fêmea" value="fêmea">Fêmea</SelectItem>
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


            {(type && imgUrl && location && breeds && color && age && size && gender &&
               <Button type="submit" className={`${formSectionClass}`} onClick={handleSubmit}>
                  Enviar
               </Button>
            )}
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