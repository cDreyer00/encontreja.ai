import Pet from "@/models/pet";
import Image from "next/image";

export default function PetCard({ pet }: { pet: Pet }) {

   function handleCardClick() {
      alert(JSON.stringify(pet));
   }

   return (
      <div>
         <img src="https://lh3.googleusercontent.com/d/17xj7GKQEHA8JfYpFQg_DvA8Yic2HOBqI" />
      </div>
   );
}