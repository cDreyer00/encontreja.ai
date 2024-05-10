import { MongoClient, Collection, Db } from "mongodb";
import Pet from "@/models/pet";

export const collections: { pets?: Collection<Pet> } = {}

const dbPass = process.env.DB_PASS
const collectionName = process.env.DB_COLLECTION_NAME as string
const dbName = process.env.DB_NAME
const connString = `mongodb+srv://admin:${dbPass}@cluster0.nidkkdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export async function connectToDatabase() {
   try {
      const client: MongoClient = new MongoClient(connString);
      await client.connect();
      const db: Db = client.db(dbName);
      const petsCollection: Collection<Pet> = db.collection(collectionName);
      collections.pets = petsCollection;
   }
   catch (error) {
      console.error(error);
   }
}