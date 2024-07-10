// import '@/app/globals.css';
// import PetForm, { PetFormProps } from '@/components/SubmitPet';
// import Pet, { MountPet } from '@/models/pet';

// import { useEffect, useState } from "react";
// import { Button, Input } from '@nextui-org/react';

// export default function Lab() {
//    const [petsProps, setPetsProps] = useState<PetFormProps[]>([]);
//    const [location, setLocation] = useState<string>('');
//    const [totalPets, setTotalPets] = useState<number>(0);

//    const [labProps, setLabProps] = useState<LabComponentProps[]>([
//       {
//          id: 0,
//          text: 'teste',
//          imgUrl: 'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b',
//       },
//       {
//          id: 1,
//          text: 'teste2',
//          imgUrl: 'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b',
//       },
//       {
//          id: 2,
//          text: 'teste3',
//          imgUrl: 'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b',
//       },
//       {
//          id: 3,
//          text: 'teste4',
//          imgUrl: 'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b',
//       },
//    ]);

//    // let pet = {
//    //    id: 0,
//    //    pet: {
//    //       type: 'cachorro',
//    //       breeds: ['sem raça definida'],
//    //       colors: ['marrom', 'preto'],
//    //       age: ['adulto'],
//    //       size: ['pequeno', 'médio'],
//    //       imgUrl: 'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b',
//    //    }
//    // } as PetFormProps;

//    useEffect(() => {
//       // Prevent default behavior when dragging files
//       window.addEventListener('dragover', (e) => {
//          e.preventDefault();
//       }, false);
//       window.addEventListener('drop', (e) => {
//          e.preventDefault();
//       }, false);

//       console.log(petsProps)

//    }, [petsProps]);

//    function dragOverHandler(ev: React.DragEvent<HTMLDivElement>) {
//       ev.preventDefault();
//    }

//    function dropHandler(ev: React.DragEvent<HTMLDivElement>) {
//       ev.preventDefault();
//       let files = ev.dataTransfer.files;
//       if (files.length == 0) return;

//       let newPets = []
//       for (let i = 0; i < files.length; i++) {
//          let isImg = files[i].type.split('/')[0] === 'image';
//          if (!isImg) continue
//          let id = totalPets + newPets.length as number;
//          let pet = MountPet({ imgUrl: URL.createObjectURL(files[i]) });
//          newPets.push({ id, pet });
//       }

//       setPetsProps([...petsProps, ...newPets]);
//       setTotalPets(totalPets + newPets.length);
//    }

//    function handleUpdate(newProps: PetFormProps) {
//       let props = petsProps.map(p => p.id === newProps.id ? { ...p, ...newProps } : p);
//       setPetsProps(props);
//    }

//    function handleDelete(id: number) {
//       let newPets = petsProps.filter(p => p.id !== id);
//       setPetsProps(newPets);
//    }

//    async function handleSubmit(id: number) {
//       let pet = petsProps.find(p => p.id === id)?.pet;
//       if (!pet) return;
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       handleDelete(id);
//    }

//    function handleLoadAll() {
//       for (let i = 0; i < petsProps.length; i++) {
//          let props = petsProps[i];
//          if (!props.pet?.imgUrl) continue;

//          startAnalysesProcess(props.pet.imgUrl)
//             .then((res) => {
//                let pet = { ...props.pet, ...res };
//                handleUpdate({ ...props, pet, state: 'success' });
//             })
//             .catch(() => handleUpdate({ ...props, state: 'error' }));

//          props.state = 'loading';
//          handleUpdate(props);
//       }
//    }

//    function loadAllLab() {
//       for (let i = 0; i < labProps.length; i++) {
//          let props = labProps[i];
//          let random = Math.random();
//          new Promise(resolve => setTimeout(resolve, random * 3000))
//             .then(() => {
//                props.text = props.text + ' - loaded';
//                let newProps = labProps.map(p => p.id === props.id ? { ...p, ...props } : p);
//                setLabProps(newProps);

//                // let newProps = labProps.map(p => p.id === props.id ? { ...p, text: p.text + ' - loaded' } : p);
//                // setLabProps(newProps);
//             })

//          // let newProps = labProps.map(p => { p.text = 'loading'; return p; });
//          // setLabProps(newProps);
//       }
//    }

//    async function startAnalysesProcess() {
//       try {
//          let random = Math.random();
//          await new Promise(resolve => setTimeout(resolve, random * 3000))
//          return { text: 'loaded' };
//       } catch (e) {
//          console.error(e);
//          throw new Error(e as string);
//       }
//    }
//    function updateLabProps(props: LabComponentProps) {
//       let newProps = labProps.map(p => p.id === props.id ? { ...p, ...props } : p);
//       setLabProps(newProps);
//    }

//    async function submitImgToDrive(img: File): Promise<string> {
//       let tempFolderId = '1v4_bvJ9P8JJWICK9dLATd6IQCMJRiiuY';

//       let form = new FormData();
//       form.append('image', img);
//       form.append('folderId', tempFolderId);

//       let res = await fetch('api/image', {
//          method: 'POST',
//          body: form,
//       });

//       if (!res.ok) {
//          throw new Error('Failed to submit image to drive');
//       }

//       let data = await res.json();
//       return data.imgUrl;
//    }

//    async function getAiResponse(imgUrl: string) {
//       let res = await fetch(`/api/analisar?img=${imgUrl}`)
//       if (!res.ok) {
//          throw new Error('Failed to fetch AI response');
//       }

//       let data = await res.json();
//       return data;
//    }

//    async function convertToFile(url: string) {
//       let res = await fetch(url);
//       let blob = await res.blob();
//       return new File([blob], 'img');
//    }

//    async function handleRetry(id: number) {
//       let pet = petsProps.find(p => p.id === id)?.pet;
//       if (!pet) return;

//       let res = await startAnalysesProcess(pet.imgUrl!);
//       let newPets = petsProps.map(p => p.id === id ? { id, pet: res } : p);
//       setPetsProps(newPets);
//    }

//    return (
//       <>
//          <div
//             id='container'
//             className="min-h-screen h-max w-full bg-soft-black">
//             <div className='flex flex-col gap-5 justify-center align-middle'>
//                <div
//                   onDrop={dropHandler}
//                   onDragOver={dragOverHandler}
//                   className="border-solid border-2 border-white p-5 w-[90vw] h-20 self-center">
//                   <p className='text-white'>Drag one or more files to this <i>drop zone</i>.</p>
//                </div>

//                <div className='text-white w-96 flex flex-col gap-5 self-center'>
//                   <Input placeholder='Location' onChange={(e) => setLocation(e.target.value)} value={location} width={400} height={300} />
//                </div>
//             </div>

//             {/* <PetForm
//                id={pet.id} pet={pet.pet}
//                state={pet.state}
//                onSubmit={() => { }}
//                onUpdate={(props) => { setPet(props) }}
//                onDelete={() => { }}
//                onRetry={() => { }}
//             /> */}

//             <div>
//                <div>
//                   <Button onClick={loadAllLab}>
//                      Load all pets
//                   </Button>
//                </div>
//                <div>
//                   <h1 className='text-white'>Uploaded images</h1>
//                   <div className='flex flex-wrap gap-10'>
//                      {/* {petsProps.map((props) => (
//                            <PetForm
//                               key={props.id} id={props.id} pet={props.pet}
//                               state={props.state}
//                               onSubmit={(id) => handleSubmit(id)}
//                               onUpdate={(props) => handleUpdate(props)}
//                               onDelete={(id) => handleDelete(id)}
//                               onRetry={(id) => handleRetry(id)}
//                            />
//                         ))} */}

//                      {labProps.map((props) => (
//                         <LabComponent
//                            key={props.id}
//                            id={props.id}
//                            text={props.text}
//                            imgUrl={props.imgUrl}
//                            onUpdate={(props) => updateLabProps(props)} />
//                      ))}
//                   </div>
//                </div>
//             </div>
//          </div>
//       </>
//    )
// }

// interface LabComponentProps {
//    id: number,
//    text: string,
//    imgUrl: string,
//    onUpdate?: (props: LabComponentProps) => void,
// }

// function LabComponent(props: LabComponentProps) {
//    function handleUpdateText(text: string) {
//       props.onUpdate?.({ ...props, text });
//    }

//    return (
//       <div>
//          <Input placeholder='text' value={props.text} onChange={(e) => handleUpdateText(e.target.value)} />
//          <img src={props.imgUrl} />
//       </div>
//    )
// }

// let allDogs =
//    [
//       {
//          "type": "cachorro",
//          "breeds": ["sem raça definida"],
//          "colors": ["marrom", "preto"],
//          "age": ["adulto"],
//          "size": ["pequeno", "médio"],
//          "gender": "incerto",
//          "observations": "pelagem curta com padrão mesclado. Pele visivel com manchas escuras."
//       },
//       {
//          "type": "cachorro",
//          "breeds": ["sem raça definida"],
//          "colors": ["preto"],
//          "age": ["adulto", "idoso"],
//          "size": ["médio"],
//          "gender": "incerto",
//          "observations": "pelo preto, possui pelos brancos no focinho indicando possível idade avançada, coleira com pingentes"
//       },
//       {
//          "type": "cachorro",
//          "breeds": ["sem raça definida", "pinscher"],
//          "colors": ["caramelo", "marrom avermelhado"],
//          "age": ["adulto", "idoso"],
//          "size": ["pequeno", "médio"],
//          "gender": "incerto",
//          "observations": "pelo curto predominantemente caramelo. Orelhas semi-eretas."
//       }
//    ]
