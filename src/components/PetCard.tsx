import Pet from "@/models/pet";
import Image from "next/image";

export default function PetCard({ pet }: { pet: Pet }) {

   function handleCardClick() {
      alert(JSON.stringify(pet));
   }

   return (
      <button className={`flex flex-col justify-items-center m-auto w-80`} onClick={handleCardClick}>
         <img
            src={pet.imgUrl}
            alt="Imagem do pet"
            style={{
               maxWidth: '100%',
               height: 'auto',
            }}
         />

         <div className="w-full h-12 bg-soft-blue flex">
            <h2 className="text-center m-auto self-center text-xl"> {pet.location} </h2>
         </div>
      </button>
   );
}