'use client';

import React, { useEffect, useState } from "react";
import Pet from "@/models/pet";
import { useRouter } from "next/navigation";
import { Chivo, Hanken_Grotesk } from "next/font/google";
import PetForm from "@/components/PetForm";
import Submit from "@/pages/submit";

const containerClass = "h-screen text-white flex flex-row"

const chivo = Chivo({
  weight: '700',
  subsets: ['latin'],
})

const hanken_grotesk = Hanken_Grotesk({
  weight: '500',
  subsets: ['latin'],
})


export default function Home() {
  const router = useRouter();

  async function onSubmit(pet: Pet) {
    // let url = '/api/pet'
    // let response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(pet)
    // })
  }

  return (
    <>
      {/* <div className={`${containerClass} bg-soft-black justify-center align-middle`}>
        <PetForm onSubmit={onSubmit} />
      </div> */}
      <Submit />
    </>
  );
}

/// old
// return (
//   <>
//     {/* ================================================== */}

//     <div className={containerClass}>
//       <div className="bg-soft-blue h-full min-w-2/5">
//         <div className={`${hanken_grotesk.className} text-7xl text-black text-end mt-10 mr-5`}>
//           Encontrejá.Ai
//         </div>
//         <div>
//           IMAGEM
//         </div>
//       </div>

//       <div className="bg-soft-black w-full h-full flex flex-col">
//         <div className="m-8 text-[7rem] w-2/3 self-center leading-[150px]">
//           NÓS AJUDAMOS VOCÊ A ENCONTRAR SEU <a className="text-soft-blue">PET</a> PERDIDO NAS ENCHENTES DO RS
//         </div>

//         <div className={`${chivo.className} mt-5 text-3xl self-center w-2/3`}>
//           Com auxílio de Inteligência Artificial
//         </div>
//       </div>
//     </div>

//     {/* ================================================== */}

//     <div className={`${containerClass} bg-soft-black flex flex-col`}>
//       <div className="w-auto m-20">
//         <div className="text-7xl text-center">
//           COMO PODEMOS AJUDAR <a className="text-soft-blue">VOCÊ?</a>
//         </div>
//       </div>

//       <div className={`flex flex-row gap-10 justify-center h-full`}>
//         <MainButton label="TUTOR" text="ESTOU A PROCURA DO MEU PET PERDIDO" onClick={() => handleChangePage('buscar')} />
//         <MainButton label="ABRIGO E LARES TEMPORÁRIOS" text="QUERO CADASTRAR ANIMAIS ENCONTRADOS" onClick={() => handleChangePage('abrigo')} />
//       </div>
//     </div>
//   </>
// );