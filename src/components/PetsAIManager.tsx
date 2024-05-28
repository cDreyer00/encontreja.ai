// import '@/app/globals.css';
// import SubmitPet from '@/components/SubmitPet';
// import Pet, { MountPet } from '@/models/pet';
// import { Button } from '@nextui-org/button';
// import { url } from 'inspector';

// import { useEffect, useState } from "react";

// interface SubmitPetProps {
//    images: File[];
//    sharedLocation: string;
//    removeImg?: (index: number) => void;
// }

// export default function PetsAIManager({ images, sharedLocation, removeImg }: SubmitPetProps) {
//    const [loadTrigger, setLoadTrigger] = useState<boolean>(false);
//    const [pets, setPets] = useState<Pet[]>([]);

//    useEffect(() => {
//       if (images.length === 0) return;

//       images.map((img) => {
//          const pet = MountPet({ imgUrl: URL.createObjectURL(img) });
//          setPets([...pets, pet]);
//       });

//    }, [images]);

//    async function loadAll() {
//       setLoadTrigger(!loadTrigger);
//    }

//    function handleRemoveImg(index: number) {
//       if (removeImg) removeImg(index);
//    }

//    return (
//       <>
//          <div>
//             <div>
//                <Button onClick={loadAll}>
//                   Load all pets
//                </Button>
//             </div>
//             <div>
//                <h1 className='text-white'>Uploaded images</h1>
//                <div className='flex flex-wrap gap-10'>
//                   {pets.map((img, i) => (
//                      <SubmitPet key={i} pet={img} loadTrigger={loadTrigger} location={sharedLocation} onSubmit={(pet: Pet) => handleRemoveImg(i)} />
//                   ))}
//                </div>
//             </div>
//          </div>
//       </>
//    )
// }