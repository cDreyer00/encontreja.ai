'use client';

import React, { useEffect, useState } from "react";
import Pet from "@/models/pet";
import { redirect, useRouter } from "next/navigation";
import { Chivo, Hanken_Grotesk } from "next/font/google";
import PetForm from "@/components/PetForm";
import Submit from "@/pages/submit";
import MainButton from "@/components/MainButton";

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
    let q = queryString(pet);
    router.push(`/catalogo?${q}`);
  }

  function queryString(params: Object) {
    return Object.entries(params)
      .map(([key, value]) => {
        if(value === undefined) return;
        // If the value is an array, serialize it
        if (Array.isArray(value)) {
          return value.map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
        }
        // Otherwise, encode key and value normally
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
  }

  return (
    <>
      <div className={`${containerClass} bg-soft-black flex flex-col`}>
        <div className="w-auto m-20">
          <PetForm
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}