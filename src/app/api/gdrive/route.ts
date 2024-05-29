import { NextRequest } from "next/server";
import { getAllImagesFromFolder } from "@/services/googleapi";

export async function GET(req: NextRequest) {   
   let folderUrl = req.nextUrl.searchParams.get('q') as string;
   let id = extractId(folderUrl);
   if (!id) return new Response(null, { status: 400 });

   let images = await getAllImagesFromFolder(id);
   // console.log(images);
   return new Response(JSON.stringify(images));
}

function extractId(url: string) {
   let regex =  /\/folders\/(.*)/g;
   let match = regex.exec(url);
   return match ? match[1] : null;   
}