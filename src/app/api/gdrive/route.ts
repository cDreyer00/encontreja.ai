import { NextRequest } from "next/server";
import { getAllImagesFromFolder } from "@/services/googleapi";

export async function GET(req: NextRequest) {   
   let folderUrl = req.nextUrl.searchParams.get('q') as string;
   let id = extractId(folderUrl);
   console.log(id);
   if (!id) return new Response(null, { status: 400 });

   let images = await getAllImagesFromFolder(id);
   // console.log(images);
   return new Response(JSON.stringify(images));
}

function extractId(url: string) {   
   //https://drive.google.com/drive/folders/1-ecGY0xBIkF0bEtfxclEcBVYv3NhAvM4?123   
   // get only code after folders/ until sign '?'
   let regex = /folders\/([^?]+)/;
   let match = url.match(regex);
   return match ? match[1] : null;   
}