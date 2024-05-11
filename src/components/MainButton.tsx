import { Chivo } from "next/font/google";

const chivo = Chivo({
   weight: '700',
   subsets: ['latin'],
})

export default function MainButton({ label, text, onClick }: { label: string; text: string; onClick?: () => void }) {
   return (
      <>
         <button
            className={`border-solid border-1 border-soft-blue w-96 h-3/5 flex justify-center self-center hover:scale-110 transition-all`}
            onClick={onClick}
         >
            <div className={`flex flex-col w-2/3 h-full justify-center`}>
               <div className={`${chivo.className} text-soft-blue text-2xl text-center`}>
                  {label}
               </div>

               <div className={`text-5xl text-center mt-5`}>
                  {text}
               </div>
            </div>
         </button>
      </>
   );
}