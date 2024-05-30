import '@/app/globals.css';
import PetForm, { PetFormProps } from '@/components/SubmitPet';
import Pet, { MountPet } from '@/models/pet';

import { useEffect, useState } from "react";
import { Button, Input } from '@nextui-org/react';

export default function Submit() {
   const [petsProps, setPetsProps] = useState<PetFormProps[]>([/* {
      id: 0,
      pet: MountPet(testPets[0]),
   },
   {
      id: 0,
      pet: MountPet(testPets[0]),
   }, */]);
   const [location, setLocation] = useState<string>('');
   const [totalPets, setTotalPets] = useState<number>(0);
   const [driveFolder, setDriveFolder] = useState<string>('');

   useEffect(() => {
      // Prevent default behavior when dragging files
      window.addEventListener('dragover', (e) => {
         e.preventDefault();
      }, false);
      window.addEventListener('drop', (e) => {
         e.preventDefault();
      }, false);

   }, []);

   function dragOverHandler(ev: React.DragEvent<HTMLDivElement>) {
      ev.preventDefault();
   }

   function dropHandler(ev: React.DragEvent<HTMLDivElement>) {
      ev.preventDefault();
      let files = ev.dataTransfer.files;
      if (files.length == 0) return;

      let newPets = []
      for (let i = 0; i < files.length; i++) {
         let isImg = files[i].type.split('/')[0] === 'image';
         if (!isImg) continue
         let id = totalPets + newPets.length as number;
         let pet = MountPet({ imgUrl: URL.createObjectURL(files[i]) });
         newPets.push({ id, pet });
      }

      setPetsProps([...petsProps, ...newPets]);
      setTotalPets(totalPets + newPets.length);
   }

   function handleUpdate(props: PetFormProps) {
      let newPets = petsProps.map(p => p.id === props.id ? { ...p, ...props } : p);
      setPetsProps(newPets);
   }

   function handleDelete(id: number) {
      let newPets = petsProps.filter(p => p.id !== id);
      setPetsProps(newPets);
   }

   async function handleLoadDriveImages() {
      let res = await fetch(`/api/gdrive?q=${driveFolder}`);
      if (!res.ok) {
         console.error('Failed to fetch images from drive');
         return;
      }

      let data = await res.json();

      let newPets = data.map((img: string, i: number) => {
         let id = totalPets + i;
         let pet = MountPet({ imgUrl: img });
         return { id, pet };
      });

      setPetsProps([...petsProps, ...newPets]);
   }

   async function handleSubmit(id: number) {
      let pet = petsProps.find(p => p.id === id)?.pet;
      if (!pet) return;

      let res = await fetch('/api/pet', {
         method: 'POST',
         body: JSON.stringify(pet)
      });

      if (!res.ok) {
         console.error('Failed to submit pet');
         return;
      }

      handleDelete(id);
   }

   function handleLoadAll() {
      let availablePets = petsProps.filter(p => !p.state || p.state === 'error');

      for (let i = 0; i < availablePets.length; i++) {
         let props = availablePets[i];
         if (!props.pet?.imgUrl) continue;

         startAnalysesProcess(props.pet.imgUrl)
            .then((res) => {
               console.log(`Pet ${i} analyzed, res:`, res)
               props.pet = { ...props.pet, ...res }
               props.state = 'success';
               handleUpdate(props);
            })
            .catch(() => {
               props.state = 'error';
               handleUpdate(props);
            });

         props.state = 'loading';
         handleUpdate(props);
      }
   }

   async function startAnalysesProcess(img: string) {
      try {
         let file = await convertToFile(img);
         let url = await submitImgToDrive(file);
         let data = await getAiResponse(url);
         data.imgUrl = url;
         return data;
      } catch (e) {
         console.error(e);
         throw new Error(e as string);
      }
   }

   async function submitImgToDrive(img: File): Promise<string> {
      let tempFolderId = '1v4_bvJ9P8JJWICK9dLATd6IQCMJRiiuY';

      let form = new FormData();
      form.append('image', img);
      form.append('folderId', tempFolderId);

      let res = await fetch('api/image', {
         method: 'POST',
         body: form,
      });

      if (!res.ok) {
         throw new Error('Failed to submit image to drive');
      }

      let data = await res.json();
      return data.imgUrl;
   }

   async function getAiResponse(imgUrl: string) {
      let res = await fetch(`/api/analisar?img=${imgUrl}`)
      
      if (!res.ok) {
         throw new Error('Failed to fetch AI response');
      }
      
      let data = await res.json();
      console.log('AI response:', data);
      return data;
   }

   async function convertToFile(url: string) {
      let res = await fetch(url);
      let blob = await res.blob();
      return new File([blob], 'img');
   }

   function handleRetry(id: number) {
      let props = petsProps.find(p => p.id === id) as PetFormProps;
      if (!props) return;

      props = { ...props, state: 'loading' };
      handleUpdate(props);

      startAnalysesProcess(props.pet.imgUrl!)
         .then((res) => {
            props.pet = { ...props.pet, ...res }
            props.state = 'success';
            handleUpdate(props);
         })
         .catch(() => {
            props.state = 'error';
            handleUpdate(props);
         });

   }

   return (
      <>
         <div
            id='container'
            className="min-h-screen h-max w-full bg-soft-black">
            <div className='flex flex-col gap-5 justify-center align-middle'>
               <div
                  onDrop={dropHandler}
                  onDragOver={dragOverHandler}
                  className="border-solid border-2 border-white p-5 w-[90vw] h-20 self-center">
                  <p className='text-white'>Drag one or more files to this <i>drop zone</i>.</p>
               </div>

               <div className='text-white w-96 flex flex-col gap-5 self-center'>
                  <Input placeholder='Location' onChange={(e) => setLocation(e.target.value)} value={location} width={400} height={300} />
                  <div className='flex flex-row gap-5'>
                     <Input placeholder='drive folder url' onChange={(e) => setDriveFolder(e.target.value)} value={driveFolder} width={400} height={300} />
                     <Button onClick={handleLoadDriveImages}>
                        Load
                     </Button>
                  </div>

               </div>
            </div>

            {petsProps.length > 0 && (
               <div className=''>
                  <div>
                     <Button onClick={handleLoadAll}>
                        Load all pets
                     </Button>
                  </div>
                  <div className='m-5 flex justify-center'>
                     <div className='flex flex-col gap-10'>
                        {petsProps.map((props, i) => (
                           <PetForm
                              key={i} id={props.id} pet={props.pet}
                              state={props.state}
                              onSubmit={(id) => handleSubmit(id)}
                              onUpdate={(props) => handleUpdate(props)}
                              onDelete={(id) => handleDelete(id)}
                              onRetry={(id) => handleRetry(id)}
                           />
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}

let testPets = [
   {
      type: 'dog',
      breeds: ['labrador'],
      colors: ['black'],
      age: ['adult'],
      size: ['large'],
      imgUrl: 'https://lh3.googleusercontent.com/d/1NFtxlSa-gOvB0w3Wz0V31OZxdPAtgZCD'
   }
]