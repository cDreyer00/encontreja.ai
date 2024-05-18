import { submitImageToDrive, getImageUrlFromDrive } from "@/services/googleapi";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.formData();
   const image = body.get('image') as File;
   const folderId = body.get('folderId') as string;

   console.log(`req recieved, image: ${image}, folderId: ${folderId}`)

   const res = await submitImageToDrive(folderId, image);
   if(!res) return new Response('Failed to upload image', { status: 500 });
   let imgUrl = await getImageUrlFromDrive(res);

   let data = { fileId: res, imgUrl: imgUrl }
   return new Response(JSON.stringify(data), { status: 200 });
}
