'use client'
import "@/app/globals.css"
import { useState, useEffect } from "react"

export default function Abrigo() {
   const [img, setImg] = useState<File>()

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file: File | null = e.target.files?.[0] || null;
      if (!file) return;
      // validate if is image
      if (!file.type.includes('image')) {
         alert('Invalid file type');
         return;
      }

      setImg(file);
   };

   return (
      <>
         <div className="bg-black h-screen flex flex-col justify-center items-center text-white">
            <div className="mb-8">
               <button
                  className="bg-white text-black px-4 py-2 text-sm font-semibold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-opacity-50"
                  onClick={() => document.getElementById('fileInput')?.click()}
               >
                  Clique aqui para subir a foto do pet.
               </button>
               <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
            <div>
               {img && (
                  <div>
                     <img src={URL.createObjectURL(img)} alt="Pet" className="rounded-lg shadow-lg" style={{ maxHeight: "500px" }} />
                  </div>
               )}
            </div>
            <h1 className="text-6xl font-bold">
               EncontreJá.Ai
            </h1>
         </div>
      </>
   )
}