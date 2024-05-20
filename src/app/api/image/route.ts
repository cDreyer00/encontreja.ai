import { submitImageToDrive, getImageUrlFromDrive, submitImgUrlToDrive } from "@/services/googleapi";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   let body = await exportBody(req);

   if (body.isUrl) {
      let fileId = await submitImgUrlToDrive(body.folderId, body.img as string);
      if (!fileId) return new Response('Failed to submit image URL', { status: 500 });
      let url = await getImageUrlFromDrive(fileId);
      return new Response(url, { status: 200 });
   }

   let fileId = await submitImageToDrive(body.folderId, body.img as File);
   if (!fileId) return new Response('Failed to submit image', { status: 500 });
   let url = await getImageUrlFromDrive(fileId);
   return new Response(url, { status: 200 });
}

interface ImgReq {
   img: File | string;
   folderId: string;
   isUrl: boolean;
}

async function exportBody(req: NextRequest): Promise<ImgReq> {
   try {
      let data = await req.formData();
      let img = data.get('image') as File;
      let folderId = data.get('folderId') as string;
      return { img, folderId, isUrl: false };
   } catch (e) {}

   try {
      let data = await req.json();
      data.img = data.imgUrl as string;
      data.isUrl = true;
      return data;
   } catch (e) {
      console.error('Failed to parse request body as JSON');      
   }

   throw new Error('Failed to parse request body');
}