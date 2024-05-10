'use client';

import Image from "next/image";
import kv from '@vercel/kv'
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    getPrefs()
      .then((prefs) => {
        if (!prefs) {
          // new record
          var newPrefs = {
            name: 'John Doe',
            age: '30',
          }

          updatePrefs(newPrefs)
        }

        setData(prefs)
      })

  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold">{JSON.stringify(data)}</h1>
      </div>
    </main>
  );
}

export async function getPrefs() {
  const prefs = await kv.get('prefs');
  return prefs || {};
}

export async function updatePrefs(prefs: Record<string, string>) {
  return kv.set('prefs', prefs);
}
