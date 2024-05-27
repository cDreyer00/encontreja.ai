import { useEffect, useState, useImperativeHandle } from 'react';
import Pet, { MountPet } from '@/models/pet';
import { Button } from '@nextui-org/button';
import { Spinner, Input } from '@nextui-org/react';

export interface SubmitPetProps {
   // img: File;
   loadTrigger?: boolean;
   location?: string;
   pet?: Pet;
   onSubmit?: (pet: Pet) => void;
}

export default function SubmitPet({ loadTrigger, location, pet, onSubmit }: SubmitPetProps) {
   const [progressState, setProgressState] = useState<string | undefined>(undefined);

   // inputs
   const [type, setType] = useState<string | undefined>(undefined);
   const [gender, setGender] = useState<string | undefined>('')
   const [age, setAge] = useState<string[] | undefined>([])
   const [breeds, setBreeds] = useState<string[] | undefined>([])
   const [colors, setColors] = useState<string[] | undefined>([])
   const [size, setSize] = useState<string[] | undefined>([])
   const [observations, setObservations] = useState<string | undefined>('')

   // url to post
   const [imgUrl, setImgUrl] = useState<string | undefined>('')

   useEffect(() => {
      if (loadTrigger) {
         if (progressState === 'loading' || progressState === 'success') return;

         submit(img)
            .then(() => setProgressState('success'))
            .catch(() => setProgressState('error'))

         if (pet) {
            setType(pet.type);
            setAge(pet.age);
            setBreeds(pet.breeds);
            setColors(pet.colors);
            setSize(pet.size);
            setObservations(pet.observations);
            setImgUrl(pet.imgUrl);
         }

         setProgressState('loading');
      }

   }, [loadTrigger]);

   function getPet() {
      if (!type) return undefined;

      if(pet)
            return pet;

      return MountPet({
         type, gender,
         size, location,
         observations, imgUrl,
         age, breeds,
         colors
      });
   }

   async function submit(img: string) {
      try {
         let file = await convertToFile(img);
         let url = await submitImgToDrive(file);
         let { type, gender, colors, breeds, size, observations, age } = await getAiResponse(url);

         setType(type);
         setGender(gender);
         setColors(colors);
         setBreeds(breeds);
         setSize(size);
         setObservations(observations);
         setAge(age);

         setImgUrl(url);

      } catch (e) {
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

   function handleInfos() {
      console.log(getPet());
   }

   function handleRetry() {
      setProgressState('loading');
      setType(undefined)
      submit(pet?.imgUrl!)
         .then(() => setProgressState('success'))
         .catch(() => setProgressState('error'))
   }

   async function handleSubmit() {
      let pet = getPet();
      if (!pet) return;

      let res = await fetch('/api/pet', {
         method: 'POST',
         body: JSON.stringify(pet)
      });

      if (!res.ok) {
         console.error('Failed to submit pet');
         return;
      }

      console.log('Pet submitted');
      if (onSubmit) onSubmit(pet);
   }

   function DeleteMe() {
      if (onSubmit) onSubmit({});
   }

   async function convertToFile(url: string) {
      let res = await fetch(url);
      let blob = await res.blob();
      return new File([blob], 'img');
   }

   return (
      <>
         <div>
            <button onClick={handleInfos}>
               <img src={pet?.imgUrl} width={500} height={500} />
            </button>
            <div>
               {progressState === 'loading' && (
                  <Spinner />
               )}

               {progressState === 'error' && (
                  <div>
                     <p>❌</p>
                     <Button onClick={handleRetry}>
                        Retry
                     </Button>
                  </div>
               )}

               {progressState === 'success' && (
                  <div>
                     <p>✅</p>
                     <Button onClick={handleSubmit}>
                        submit
                     </Button>
                     <Button onClick={handleRetry}>
                        Retry
                     </Button>
                  </div>
               )}
            </div>
            <Button onClick={DeleteMe}>
               Delete
            </Button>
            <div>
               {getPet() && (
                  <div>
                     <Input placeholder='type' value={type} onChange={(e) => setType(e.target.value)} />
                     <Input placeholder='breeds' value={breeds!.join(',')} onChange={(e) => setBreeds(e.target.value.split(','))} />
                     <Input placeholder='colors' value={colors!.join(',')} onChange={(e) => setColors(e.target.value.split(','))} />
                     <Input placeholder='size' value={size!.join(',')} onChange={(e) => setSize(e.target.value.split(','))} />
                     <Input placeholder='age' value={age!.join(',')} onChange={(e) => setAge(e.target.value.split(','))} />
                     <Input placeholder='observations' value={observations} onChange={(e) => setObservations(e.target.value)} />
                  </div>
               )}
            </div>
         </div>
      </>
   )
}