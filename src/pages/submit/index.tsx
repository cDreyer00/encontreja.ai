import '@/app/globals.css';
import SubmitPet from '@/components/SubmitPet';
import Pet from '@/models/pet';

import { useEffect, useState } from "react";
import PetsAIManager from '@/components/PetsAIManager';
import { Input } from '@nextui-org/react';

export default function Submit() {
   const [images, setImages] = useState<File[]>([]);
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

   function dropHandler(ev: React.DragEvent<HTMLDivElement>) {
      ev.preventDefault();
      let files = ev.dataTransfer.files;
      if (files.length == 0) return;

      let imgs = images.map(img => img.name);
      for (let i = 0; i < files.length; i++) {
         let isImg = files[i].type.split('/')[0] === 'image';
         if (!isImg) continue
         if (imgs.includes(files[i].name)) continue
         imgs.push(files[i].name);
      }

      setImages([...images, ...Array.from(files)]);
   }

   function dragOverHandler(ev: React.DragEvent<HTMLDivElement>) {
      ev.preventDefault();
   }

   function handleRemoveImg(index: number) {
      let imgs = images.filter((_, i) => i !== index);
      setImages(imgs);
   }

   return (
      <>
         <div
            id='container'
            className="min-h-screen h-max w-full bg-soft-black">
            <div className='flex flex-row gap-10'>
               <div
                  onDrop={dropHandler}
                  onDragOver={dragOverHandler}
                  className="border-solid border-2 border-white p-5 w-[30vw] h-48">
                  <p className='text-white'>Drag one or more files to this <i>drop zone</i>.</p>
               </div>

               <div className='text-white w-96 flex flex-col gap-5'>
                  <Input placeholder='Location' onChange={(e) => setLocation(e.target.value)} value={location} width={500} height={300} />
               </div>
            </div>

            {(images.length > 0 &&
               <PetsAIManager images={images} sharedLocation={location} removeImg={handleRemoveImg} />
            )}
         </div>
      </>
   )
}