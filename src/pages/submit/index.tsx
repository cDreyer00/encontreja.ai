import '@/app/globals.css';

import { useEffect, useState } from "react";

export default function Submit() {
   const [images, setImages] = useState<File[]>([]);

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
      console.log('File(s) dropped');
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
      console.log(images);
   }

   function dragOverHandler(ev: React.DragEvent<HTMLDivElement>) {
      console.log("File(s) in drop zone");

      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();
   }

   return (
      <>
         <div
            id='container'
            className="h-screen w-full bg-soft-black">
            <div
               id="drop_zone"
               onDrop={dropHandler}
               onDragOver={dragOverHandler}
               className="border-solid border-2 border-white p-5 w-[30vw] h-48">
               <p className='text-white'>Drag one or more files to this <i>drop zone</i>.</p>
            </div>

            <div>
               <h1 className='text-white'>Uploaded images</h1>
               <div className='flex flex-wrap'>
                  {images.map((img, i) => (
                     <img key={i} src={URL.createObjectURL(img)} alt={img.name} className='w-24' />
                  ))}
               </div>
            </div>
         </div>
      </>
   )
}