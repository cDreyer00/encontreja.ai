import { submitImageToDrive, getImageUrlFromDrive, submitImgUrlToDrive } from "@/services/googleapi";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   console.log("=================================== START ===================================")
   let body = await exportBody(req);

   console.log(body)
   console.log('=================================== FINISH ===================================')

   if (body.isUrl) {
      let fileId = await submitImgUrlToDrive(body.folderId, body.img as string);
      if (!fileId) return new Response('Failed to submit image URL', { status: 500 });
      let url = getImageUrlFromDrive(fileId);
      let data = { fileId: fileId, imgUrl: url }
      return new Response(JSON.stringify(data), { status: 200 });
   }

   let fileId = await submitImageToDrive(body.folderId, body.img as File);
   if (!fileId) return new Response('Failed to submit image', { status: 500 });
   let url = getImageUrlFromDrive(fileId);
   let data = { fileId: fileId, imgUrl: url }
   return new Response(JSON.stringify(data), { status: 200 });
}

interface ImgReq {
   img: File | string;
   folderId: string;
   isUrl: boolean;
}

async function exportBody(req: NextRequest): Promise<ImgReq> {
   let dataType = req.headers.get('content-type');
   let isJson = dataType?.includes('application/json');

   if (!isJson) {
      let data = await req.formData();
      let img = data.get('image') as File;
      let folderId = data.get('folderId') as string;
      return { img, folderId, isUrl: false };
   }
   else {
      let data = await req.json();
      data.img = data.imgUrl as string;
      data.isUrl = true;
      console.log("JSON data:", data);
      return data;
   }
}