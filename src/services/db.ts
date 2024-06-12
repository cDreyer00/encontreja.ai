import { MongoClient, Collection, Db } from "mongodb";
import Pet from "@/models/pet";

export const collections: {
   pets?: Collection<Pet>,
   lab?: Collection<Pet>,
   backup?: Collection<Pet>,
   frontTests?: Collection<Pet>,

} = {}

const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME
const connString = `mongodb+srv://admin:${dbPass}@cluster0.nidkkdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export async function connectToDatabase() {
   try {
      const client: MongoClient = new MongoClient(connString);
      await client.connect();
      const db: Db = client.db(dbName);
      
      const petsCollection: Collection<Pet> = db.collection('pets');
      const tempColelction: Collection<Pet> = db.collection('lab');
      const backupCollection: Collection<Pet> = db.collection('backup');
      const frontTestsCollection: Collection<Pet> = db.collection('frontTests');

      collections.pets = petsCollection;
      collections.lab = tempColelction;
      collections.backup = backupCollection;
      collections.frontTests = frontTestsCollection;
   }
   catch (error) {
      console.error(error);
   }
}

// async function insertOnePet(pet: Pet, updateImg: boolean = true): Promise<void> {
//    if (!collections.temp)
//       await connectToDatabase();

//    if (updateImg)
//       pet = await updatePetImage(pet);

//    await collections.temp?.insertOne(pet);
// }

// async function insertManyPets(pets: Pet[], updateImg: boolean = true): Promise<void> {
//    if (!collections.temp)
//       await connectToDatabase();

//    if (!updateImg) {
//       for (let pet of pets) {
//          pet = await updatePetImage(pet);
//       }
//    }

//    await collections.temp?.insertMany(pets);
// }