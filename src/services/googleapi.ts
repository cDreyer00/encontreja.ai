import { google } from 'googleapis';
import fs from 'fs';

// Function to download an image from Google Drive
export async function getImageUrlFromDrive(fileId: string): Promise<string | null> {
   try {
      // Set up OAuth2 client
      const authData = JSON.parse(fs.readFileSync('src/services/credentials.json', 'utf8'));
      const auth = new google.auth.GoogleAuth({
         credentials: authData,
         scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });

      const drive = google.drive({
         version: 'v3',
         auth: auth
      });

      // Retrieve the image URL (replace 'YOUR_IMAGE_FILE_ID' with the actual file ID)
      const response = await drive.files.get({
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