import { google } from 'googleapis';

// Function to download an image from Google Drive
export async function getImageUrl(fileId: string): Promise<string | null> {
   try {
      // Set up OAuth2 client
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

// getImageUrl(fileId)
//    .then(() => console.log('Image downloaded successfully'))
//    .catch(err => console.error('Error downloading image:', err));

const authData = {
   "type": "service_account",
   "project_id": "drive-nodejs-378420",
   "private_key_id": "8396c697ccba774c9055bdae3b225ac56b9a276d",
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1qjJIUvZyl76W\np92wY7xej955VdJeoFjW4/wyd2ve6c/EhlDaia20PzGnf1cmocNH47dz8OCE0rTj\nCiTY0vbH67dGhBjDcf1ooxBjfUvZrdiGGqY9a/oAzTSYRfrZvRi6epACZHluX/Py\nurLf05JCZAcShTOBDF1BZzFpNlmTSZ1QVOLRsr5Sziy4dNGFg52XFdeYGq0uogxS\nMVOgLuswB/S2pajSnRW8FOSPqA9UQ/BvkAu5N5lpHaukwLdY/2HSKZjctxuNIxPp\nHk5Xggq+GwVPJSGqTxnGQfdPKx2PqIKMTs2ctVxWevlXhNP/TR63aJLn7FpvuY9R\n+4tFP5UzAgMBAAECggEAQC+Lx5EEgXWLAej6w41hq1mSxfUkOInYCckQvPYD14Vu\nAuZgH+7gQFzJmwA7lys1d6uGEIFtmpBmGAfn//H9/qISpegbZcbbPcLLkhNdnuI1\nLCCzVuVVNj5K1Hh5SsBswcp3IllErFJbu4nqlHnI5gs4knscuP5Y3rhqtV1eJdMU\nlqAe/UzVxMRI9mN/7kxImn4+Ja7boO7aC87rJbctMMGZksqCqG5XjyJlw9F2LHAH\nx/6s738EVGoH3QSwrsqhfw4f964AyWVh2pHwzGavhZQS5DvkTo97G3AkfIZrXve4\nyjXzvw03+BJXesacxookW8eF4jIQzijLXzbTxzDyeQKBgQD/rv8DC/iHhADau6by\nx79EB5Zu3bl1DttQbTjHlaVWr1fycZMoppIB1MoStr9fBoYXZTjwXXgfSql7vfww\nVfIy7eZLVXsicSUaMA0vTKfPFfYRrQjLaro2VPt3TU+k+kAzkGmT6m4sfE08kioO\n+6phmNERTJo6YDxtsYMLvJPMOwKBgQC148AL0EbGffCsf578IpNvXs9lPDqQqnnF\nH8gyCnTaCcZdh7tLQS/xa8omMb0oMVODBAtl9dTk0XPYywoX1KF248fX/erbnSdh\nvasW+qDggVlPz+qzsnVEb1fp3+rZw64VavEMxu+ev6h89jKU4xmHGMRL7c7PsE3B\n49eEMZJjaQKBgCC8gCwcsUJwlUdsNVDqYEPOkOU7AE7Liyr+AQIU1+mEY8dH4WaY\nBSO04faJbXE2PZ7rN+IWpZWkEpUkWxC5QFxi91R36l8bi3uR4W5H60hpcGsM845P\n6O2h7dx1ipf97pBrkgj9QAP0GlOCB16JvGPolAQaAbktry8ARl4PVAEXAoGAK+uX\nxwJ+5JUqlWynpjhvI3hgWhCmD6Kqjrfy7mpp9vBfTtxklHJkMkaV5I0kIN1wTfWf\nDvrCcpJFB/dXM5PrfTrZWcV9fZRAGzDibEUOrcduGoCZKtUPzfuY3eds3TKMCa3u\nEOjEma+r7qjAZAVGd8G6PJ9qzenDjOsIcmpJ7+kCgYApTuJgxiGylWq+Ms8yn7qE\naDILVI4VbT3K2a1ES22QA9lndW44EzOYsunNEXMIZEJ8L/2dC1FWG7LybamZojDi\ntS71Jmt2+WbCMpnnJ9bXL5uYlipFWZlQe/m9RPU9cXfBF2YSLk2uaL6IW+0u+mSI\nhtYjl0rp2s+RZgyQ8AgQZw==\n-----END PRIVATE KEY-----\n",
   "client_email": "drive-in-node@drive-nodejs-378420.iam.gserviceaccount.com",
   "client_id": "106500503291152232181",
   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
   "token_uri": "https://oauth2.googleapis.com/token",
   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/drive-in-node%40drive-nodejs-378420.iam.gserviceaccount.com",
   "universe_domain": "googleapis.com"
}