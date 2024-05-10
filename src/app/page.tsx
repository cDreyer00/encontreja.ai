'use client';

import React, { useEffect, useState } from "react";
import Pet from "@/models/pet";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function handleChangePage(page: string) {
    router.push(page);
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">EncontreJá.Ai</h1>
          <p className="mb-4">Encontre seu pet perdido nas enchentes do RS</p>
          <div className="text-sm">
            <button className="text-white border border-gray-700 px-6 py-2 hover:bg-gray-800 transition duration-150 ease-in-out">
              Como funciona?
            </button>
          </div>
        </div>

        <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm w-1/3 mx-2">
              <h2 className="font-semibold mb-2">Escolha uma das opções ao lado</h2>
              <div className="flex flex-col">
                <button className="text-white border border-gray-700 px-4 py-2 mb-2 hover:bg-gray-800 transition duration-150 ease-in-out" onClick={() => handleChangePage('/tutor')}>
                  TUTOR
                </button>
                <button className="text-white border border-gray-700 px-4 py-2 hover:bg-gray-800 transition duration-150 ease-in-out" onClick={() => handleChangePage('/abrigo')}>
                  ABRIGO
                </button>
              </div>
            </div>
            <div className="text-sm w-2/3 mx-2">
              <p>Com ajuda de voluntários, é feito um cadastramento fotográfico de animais abrigados das enchentes.</p>
              <p className="mt-4">Ao subir sua foto, nossa IA cruza informações e traz resultados baseados nas informações visuais disponíveis no arquivo gerado pelos voluntários.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}