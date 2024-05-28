import { useEffect, useState, useImperativeHandle } from 'react';
import Pet, { MountPet } from '@/models/pet';
import { Button } from '@nextui-org/button';
import { Spinner, Input } from '@nextui-org/react';

export interface PetFormProps {
   id: number
   pet: Pet;
   state?: 'loading' | 'error' | 'success';
   onUpdate?: (props: PetFormProps) => void;
   onSubmit?: (id: number) => void;
   onDelete?: (id: number) => void;
   onRetry?: (id: number) => void;
}

export default function PetForm(props: PetFormProps) {

   function handleRetry(){
      if(props.onRetry) props.onRetry(props.id)
   }

   function handleSubmit(){
      if(props.onSubmit) props.onSubmit(props.id)
   }

   function handleDelete(){
      if(props.onDelete) props.onDelete(props.id)
   }

   function handleUpdate(props: PetFormProps){
      let pet = props.pet
      if(props.onUpdate) props.onUpdate({ ...props, pet })
   }

   function handleLog() {
      console.log(props.pet)
   }

   return (
      <>
         <div>
            <button onClick={handleLog}>
               <img src={props.pet.imgUrl} width={300} height={300} />
            </button>
            <div>
               {props.state === 'loading' && (
                  <Spinner />
               )}

               {props.state === 'error' && (
                  <div>
                     <p>❌</p>
                     <Button onClick={handleRetry}>
                        Retry
                     </Button>
                  </div>
               )}

               {props.state === 'success' && (
                  <div>
                     <p>✅</p>
                     <Button onClick={handleSubmit}>
                        submit
                     </Button>
                     <Button onClick={handleRetry}>
                        Retry
                     </Button>
                  </div>
               )}
            </div>
            <Button onClick={handleDelete}>
               Delete
            </Button>
            <div>
               {props.pet.type && (
                  <div>
                     <Input placeholder='type' value={!props.pet.type ? '' : props.pet.type} onChange={(e) => handleUpdate({ ...props.pet, type: e.target.value })} />
                     <Input placeholder='breeds' value={!props.pet.breeds ? '' : props.pet.breeds!.join(',')} onChange={(e) => handleUpdate({ ...props.pet, breeds: e.target.value.split(',') })} />
                     <Input placeholder='colors' value={!props.pet.colors ? '' : props.pet.colors!.join(',')} onChange={(e) => handleUpdate({ ...props.pet, colors: e.target.value.split(',') })} />
                     <Input placeholder='size' value={!props.pet.size ? '' : props.pet.size!.join(',')} onChange={(e) => handleUpdate({ ...props.pet, size: e.target.value.split(',') })} />
                     <Input placeholder='age' value={!props.pet.age ? '' : props.pet.age!.join(',')} onChange={(e) => handleUpdate({ ...props.pet, age: e.target.value.split(',') })} />
                     <Input placeholder='observations' value={!props.pet.observations ? '' : props.pet.observations} onChange={(e) => handleUpdate({ ...props.pet, observations: e.target.value })} />
                  </div>
               )}
            </div>
         </div>
      </>
   )
}