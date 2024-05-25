import '@/app/globals.css';
import SubmitPet from '@/components/SubmitPet';
import Pet from '@/models/pet';
import { Button } from '@nextui-org/button';

import { useEffect, useState, useRef } from "react";

export default function Submit() {
   const [pets, setPets] = useState<Pet[]>([]);
   const [loadTrigger, setLoadTrigger] = useState<boolean>(false);

   async function loadAll() {
      setLoadTrigger(true);
   }

   return (
      <>
         <div>
            <div>
               <Button onClick={loadAll}>
                  Load all pets
               </Button>
            </div>
            <div>
               <h1 className='text-white'>Uploaded images</h1>
               <div className='flex flex-wrap gap-10'>
                  {/* {pets.map((pet, index) => (
                     <SubmitPet key={index} imgUrl={'pet'} />
                  ))} */}
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
                  <SubmitPet loadTrigger={loadTrigger} imgUrl={'https://lh3.googleusercontent.com/d/16L8deGvO43zm8kXIdaUoW3ZhApjBeiYl'} />
               </div>
            </div>
         </div >
      </>
   )
}