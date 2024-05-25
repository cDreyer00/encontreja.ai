import { useEffect, useState, useImperativeHandle } from 'react';
import Pet from '@/models/pet';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/react';

export interface SubmitPetProps {
   imgUrl: string;
   loadTrigger?: boolean;
}

export default function SubmitPet({ imgUrl, loadTrigger }: SubmitPetProps) {
   const [progressState, setProgressState] = useState<string | undefined>(undefined);
   const [pet, setPet] = useState<Pet | undefined>(undefined);

   useEffect(() => {
      if(loadTrigger){
         getAiResponse()
            .then(pet => {
               setPet(pet);
               setProgressState('success');
            })

         setProgressState('loading');
      }
   } , [loadTrigger]);

   async function getAiResponse() {
      if (!imgUrl) return;
      let res = await fetch(`/api/analisar?img=${encodeURIComponent(imgUrl)}`)

      if (!res.ok) {
         console.error('Error fetching AI response');
         return;
      }

      let data = await res.json();
      return data;
   }

   function handleInfos() {
      console.log(pet)
   }

   return (
      <>
         <div>
            <img src={imgUrl} width={200} height={200} />
            {
               progressState === 'loading' ? (
                  <Spinner />
               ) : progressState === 'error' ? (
                  <p>❌</p>
               ) : progressState === 'success' ? (
                  <div>
                     <p>✅</p>
                     <Button onClick={handleInfos}>
                        Get AI response
                     </Button>
                  </div>
               ) : (
                  <></>
               )
            }
         </div>
      </>
   )
}