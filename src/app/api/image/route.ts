// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//    const formData = await req.formData();
//    let file = formData.get("file");
//    if (!file) {
//       return new Response("No file found", { status: 400 });
//    }

//    var imgUrl = await submit({ img: file, expiration: 99999999 });
//    console.log(`imgUrl: ${imgUrl}`);
//    return new Response(imgUrl);
// }



// async function submit({ img, expiration = 3600 }: { img: FormDataEntryValue; expiration?: number }) {
//    try {
//       let formData = new FormData();
//       formData.append('image', img);

//       let data = await response.json();
//       console.log('data:', data); // Add this logging statement

//       return data.data.url;
//    }
//    catch (err) {
//       throw err;
//    }
// }