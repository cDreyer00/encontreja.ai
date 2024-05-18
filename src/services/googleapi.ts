import { google, drive_v3 } from 'googleapis';
import fs from 'fs';
import { Readable } from 'stream';

let drive: drive_v3.Drive | null = null

let credentials = process.env.GOOGLE_CREDENTIALS;

async function connectToDrive() {
   const authData = JSON.parse(credentials!);
   const auth = new google.auth.GoogleAuth({
      credentials: authData,
      scopes: ['https://www.googleapis.com/auth/drive']
   });

   drive = google.drive({
      version: 'v3',
      auth: auth
   });
}

function bufferToStream(buffer: Buffer): Readable {
   const stream = new Readable();
   stream.push(buffer);
   stream.push(null);
   return stream;
}


// Function to download an image from Google Drive
export async function getImageUrlFromDrive(fileId: string): Promise<string | null> {
   return `https://lh3.googleusercontent.com/d/${fileId}`;

   try {
      if (!drive) await connectToDrive();
      if (!drive) return null;

      const response = await drive!.files.get({
         fileId: fileId,
         fields: 'webContentLink' // Get the web content link of the file
      });

      const contet = response.data.webContentLink;
      console.log('Content:', contet);
      return contet!;
   } catch (error) {
      console.error('Error getting image URL:', error);
      return null;
   }
}

export async function submitImageToDrive(folderId: string, image: File): Promise<string | null> {
   try {
      if (!drive) await connectToDrive();
      if (!drive) return null;

      const buffer = await image.arrayBuffer();
      const bufferStream = bufferToStream(Buffer.from(buffer));

      const fileMetadata = {
         name: image.name,
         parents: [folderId]
      };

      const media = {
         mimeType: image.type,
         body: bufferStream
      };

      const response = await drive.files.create({
         requestBody: fileMetadata,
         media: media,
         fields: 'id'
      });

      const fileId = response.data.id;
      console.log('File ID:', fileId);
      return fileId!;
   } catch (error) {
      console.error('Error submitting image:', error);
      return null;
   }
}