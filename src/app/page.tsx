'use client';

import Image from "next/image";
import kv from '@vercel/kv'
import React, { useEffect, useState } from "react";
import Pet from "@/models/pet";

export default function Home() {
  const [data, setData] = useState<Pet>();

  useEffect(() => {
    fetch("/api/register")
      .then((response) => response.json())
      .then((data) => setData(data));
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold">{JSON.stringify(data)}</h1>
      </div>
    </main>
  );
}