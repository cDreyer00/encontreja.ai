import { useEffect, useState, useImperativeHandle } from 'react';
import Pet, { MountPet } from '@/models/pet';
import { Button } from '@nextui-org/button';
import { Spinner, Input } from '@nextui-org/react';

export interface PetFormProps {
   id: number
   pet: Pet;
   state?: 'loading' | 'error' | 'success';
   submitDisabled?: boolean;
   onUpdate?: (props: PetFormProps) => void;
   onSubmit?: (id: number) => void;
   onDelete?: (id: number) => void;
   onRetry?: (id: number) => void;
}

export default function PetForm(props: PetFormProps) {

   function handleRetry() {
      if (props.onRetry) props.onRetry(props.id)
   }

   function handleSubmit() {
      if (props.onSubmit) props.onSubmit(props.id)
   }

   function handleDelete() {
      if (props.onDelete) props.onDelete(props.id)
   }

   function handleUpdatePet(newPet: Pet) {
      let pet = { ...props.pet, ...newPet }
      if (props.onUpdate) props.onUpdate({ ...props, pet })
   }

   return (
      <>
         <div className='flex flex-row gap-10'>
            <div>
               <button onClick={() => window.open(props.pet.imgUrl)}>
                  <img src={props.pet.imgUrl} width={500} referrerPolicy="no-referrer" />
               </button>

               <div>
                  {props.state === 'loading' && (
                     <Spinner />
                  )}

                  {props.state === 'error' && (
                     <div>
                        <p>❌</p>
                        {/* <Button onClick={handleRetry}>
                        Retry
                     </Button> */}
                     </div>
                  )}

                  {props.state === 'success' && (
                     <div>
                        <p>✅</p>
                        <Button onClick={handleSubmit} isDisabled={props.submitDisabled}>
                           submit
                        </Button>
                        {/* <Button onClick={handleRetry}>
                        Retry
                     </Button> */}
                     </div>
                  )}
               </div>
               <Button onClick={handleDelete}>
                  Delete
               </Button>
            </div>

            <div className='w-[900px]'>
                  <div className='flex flex-col gap-3'>
                     <div>
                        <label className='mb-1 text-white'>Tipo</label>
                        <Input placeholder='type' value={!props.pet.type ? '' : props.pet.type} onChange={(e) => handleUpdatePet({ ...props.pet, type: e.target.value })} />
                     </div>

                     <div>
                        <label className='mb-1 text-white'>Raças [ , ]</label>
                        <Input placeholder='breeds' value={!props.pet.breeds ? '' : props.pet.breeds!.join(',')} onChange={(e) => handleUpdatePet({ ...props.pet, breeds: e.target.value.split(',') })} />
                     </div>

                     <div>
                        <label className='mb-1 text-white'>Cores [ , ]</label>
                        <Input placeholder='colors' value={!props.pet.colors ? '' : props.pet.colors!.join(',')} onChange={(e) => handleUpdatePet({ ...props.pet, colors: e.target.value.split(',') })} />
                     </div>

                     <div>
                        <label className='mb-1 text-white'>Tamanho [ , ]</label>
                        <Input placeholder='size' value={!props.pet.size ? '' : props.pet.size!.join(',')} onChange={(e) => handleUpdatePet({ ...props.pet, size: e.target.value.split(',') })} />
                     </div>

                     <div>
                        <label className='mb-1 text-white'>Idade [ , ]</label>
                        <Input placeholder='age' value={!props.pet.age ? '' : props.pet.age!.join(',')} onChange={(e) => handleUpdatePet({ ...props.pet, age: e.target.value.split(',') })} />
                     </div>

                     <div>
                        <label className='mb-1 text-white'>Genero</label>
                        <Input placeholder='gender' value={!props.pet.gender ? '' : props.pet.gender} onChange={(e) => handleUpdatePet({ ...props.pet, gender: e.target.value })} />
                     </div>

                     <div>
                        <label className='mb-1 text-white'>Observações</label>
                        <Input placeholder='observations' value={!props.pet.observations ? '' : props.pet.observations} onChange={(e) => handleUpdatePet({ ...props.pet, observations: e.target.value })} />
                     </div>

                  </div>
            </div>
         </div>
      </>
   )
}