import { MongoClient, Collection, Db } from "mongodb";
import Pet from "@/models/pet";
import User from "@/models/user";

export const collections: {
   pets?: Collection<Pet>,
   users?: Collection<User>,
   lab?: Collection<Pet>,
   backup?: Collection<Pet>,
   frontTests?: Collection<Pet>,
} = {}

export const petsCollection = async (): Promise<Collection<Pet>> => {
   if (!collections.pets)
      await connectToDatabase();
   return collections.pets!;
}

export const usersCollection = async (): Promise<Collection<User>> => {
   if (!collections.users)
      await connectToDatabase();
   return collections.users!;
}

export const labCollection = async (): Promise<Collection<Pet>> => {
   if (!collections.lab)
      await connectToDatabase();
   return collections.lab!;
}

export const backupCollection = async (): Promise<Collection<Pet>> => {
   if (!collections.backup)
      await connectToDatabase();
   return collections.backup!;
}

const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME
const connString = `mongodb+srv://admin:${dbPass}@cluster0.nidkkdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export async function connectToDatabase() {
   try {
      const client: MongoClient = new MongoClient(connString);
      await client.connect();
      const db: Db = client.db(dbName);

      const petsCollection: Collection<Pet> = db.collection('pets');
      collections.pets = petsCollection;

      const userCollection: Collection<User> = db.collection('users');
      collections.users = userCollection;

      /// experiments \\\
      const tempColelction: Collection<Pet> = db.collection('lab');
      collections.lab = tempColelction;

      const backupCollection: Collection<Pet> = db.collection('backup');
      collections.backup = backupCollection;

      const frontTestsCollection: Collection<Pet> = db.collection('frontTests');
      collections.frontTests = frontTestsCollection;
      /// ============ \\\
   }
   catch (error) {
      console.error(error);
   }
}