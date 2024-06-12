import "@/app/globals.css"
import React, { useState } from 'react'

export default function Buscar() {
   const [img, setImg] = useState<File>()

   async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
      const file: File | null = e.target.files?.[0] || null;
      if (!file) return;

      // validate if is image
      if (!file.type.includes('image')) {
         alert('Invalid file type');
         return;
      }

      setImg(file);
   }

   async function handleSubmit() {
      if (!img) {
         alert('Por favor, anexe uma imagem do seu pet');
         return;
      }

      const imgUrl = await submitImageToImgbb(img);
      alert(`Imagem enviada com sucesso! ${imgUrl}`)
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

   return (
      <>
         <div className={`h-screen w-full`}>
            <div className={`w-2/6 h-full flex flex-col justify-center m-auto`}>
               <label
                  className={`border-solid border-1 border-black h-auto w-auto`}
                  htmlFor="imgInput"
               >
                  {img ? (
                     <div className="self-center m-5 flex justify-center align-middle">
                        <img src={img ? URL.createObjectURL(img) : ''} alt="Imagem" height={300} width={300} className="self-center" />
                     </div>
                  ) : (
                     <div className={`text-center text-4xl mx-20 my-10`}>
                        Clique aqui para anexar a foto do seu pet
                     </div>
                  )}
                  <input id='imgInput' type="file" accept="image/*" onChange={handleImageUpload} hidden />
               </label>

               <div className={`text-2xl text-center my-10 max-w-[90%] self-center`}>
                  Escolha uma foto nítida que seu pet esteja em destaque e com boa resolução
               </div>
               <button className={`bg-black text-white w-[50%] h-12 self-center`} onClick={handleSubmit}>
                  <div>
                     EncontreJá.Ai
                  </div>
               </button>
               {/* {img && (
               
            )} */}
            </div>
         </div>
      </>
   )
}