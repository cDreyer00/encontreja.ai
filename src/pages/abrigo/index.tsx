'use client'
import "@/app/globals.css"
import { useState, useEffect } from "react"
import PetForm from "@/components/PetForm"
import Pet from "@/models/pet"
// import { ExtractPetInfos } from "@/app/assistant"

export default function Abrigo() {
   const [img, setImg] = useState<File>()
   const [imgUrl, setImgUrl] = useState<string>()
   const [petInfos, setPetInfos] = useState<Pet>()

   async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const file: File | null = e.target.files?.[0] || null;
      if (!file) return;

      // validate if is image
      if (!file.type.includes('image')) {
         alert('Invalid file type');
         return;
      }

      setImg(file);
      const imgUrl = await submitImageToImgbb(file);
      setPetInfos(imgUrl);
      setImgUrl(imgUrl);
   }

   async function submitImageToImgbb(img: File) {
      if (!img) return;

      const apiKey = '187ff376e1ea89f898c252a97fe5648a';
      const apiUrl = 'https://api.imgbb.com/1/upload';

      const formData = new FormData();
      formData.append('image', img);
      formData.append('key', apiKey);

      try {
         const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
         });

         if (!response.ok) {
            throw new Error('Failed to upload image');
         }

         const jsonResponse = await response.json();
         return jsonResponse.data.url;
      } catch (error) {
         console.error('Error uploading image:', error);
         throw error;
      }
   }

   async function GetAI(imgUrl: string) {
      try {
         const assistanteRequest = await fetch(`/api/assistant?image=${imgUrl}`);
         const assistanteResponse = await assistanteRequest.json();
         setPetInfos(assistanteResponse);
      }
      catch (error) {
         console.error('Error getting AI:', error);
         throw error;
      }
   }

   async function handleSubmitPet() {

   }

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
            <div className="flex flex-row gap-6">
               <div>
                  {img && (
                     <div>
                        <img src={URL.createObjectURL(img)} alt="Pet" className="rounded-lg shadow-lg" style={{ maxHeight: "500px" }} />
                     </div>
                  )}
               </div>
               <div>
                  {img && (
                     <PetForm />
                  )}
               </div>
            </div>
            <div>
               <button onClick={handleSubmitPet} className="bg-white text-black px-4 py-2 text-sm font-semibold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-opacity-50">
                  Enviar
               </button>
            </div>
            <div className="mt-8">
               <pre>{JSON.stringify(petInfos)}</pre>
            </div>
            <div>
               <button onClick={() => GetAI(imgUrl!)}> TEST </button>
            </div>
            <h1 className="text-6xl font-bold">
               EncontreJá.Ai
            </h1>
         </div>
      </>
   )
}