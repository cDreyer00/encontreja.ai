import '@/app/globals.css';
import PetForm, { PetFormProps } from '@/components/SubmitPet';
import Pet, { MountPet } from '@/models/pet';

import { useEffect, useState } from "react";
import { Button, Input } from '@nextui-org/react';

export default function Submit() {
   const [petsProps, setPetsProps] = useState<PetFormProps[]>([]);


   const [location, setLocation] = useState<string>('');

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
         let id = petsProps.length + newPets.length as number;
         let pet = MountPet({ imgUrl: URL.createObjectURL(files[i]) });
         newPets.push({ id, pet });
      }

      setPetsProps([...petsProps, ...newPets]);
   }

   function handleUpdate(props: PetFormProps) {
      let newPets = petsProps.map(p => p.id === props.id ? { ...p, ...props } : p);
      setPetsProps(newPets);
   }

   function handleDelete(id: number) {
      let newPets = petsProps.filter(p => p.id !== id);
      setPetsProps(newPets);
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
      for (let i = 0; i < petsProps.length; i++) {
         let props = petsProps[i];
         if (!props.pet?.imgUrl) continue;
         
         startAnalysesProcess(props.pet.imgUrl)
            .then((res) => handleUpdate({ ...props, pet: res, state: 'success' })) 
            .catch(() => handleUpdate({ ...props, state: 'error' }));
         
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
      return data;
   }

   async function convertToFile(url: string) {
      let res = await fetch(url);
      let blob = await res.blob();
      return new File([blob], 'img');
   }

   async function handleRetry(id: number) {
      let pet = petsProps.find(p => p.id === id)?.pet;
      if (!pet) return;

      let res = await startAnalysesProcess(pet.imgUrl!);
      let newPets = petsProps.map(p => p.id === id ? { id, pet: res } : p);
      setPetsProps(newPets);
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
               </div>
            </div>

            {petsProps.length > 0 && (
               <div>
                  <div>
                     <Button onClick={handleLoadAll}>
                        Load all pets
                     </Button>
                  </div>
                  <div>
                     <h1 className='text-white'>Uploaded images</h1>
                     <div className='flex flex-wrap gap-10'>
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