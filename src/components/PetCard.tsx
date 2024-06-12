import Pet from "@/models/pet";
import Image from "next/image";

export default function PetCard({ pet }: { pet: Pet }) {

   function handleCardClick() {
      alert(JSON.stringify(pet));
   }

   return (
      <div>
         <img src={pet.imgUrl} onClick={handleCardClick} referrerPolicy="no-referrer" />
      </div>
   );
}