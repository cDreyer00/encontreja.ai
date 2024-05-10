import * as mongodb from "mongodb";

export const collections: { pets?: mongodb.Collection } = {}
const uri = "mongodb+srv://testdb:<password>@cluster0.nidkkdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connString = process.env.DB_CONN_STRING as string
const collectionName = process.env.DB_COLLECTION_NAME as string
const dbName = process.env.DB_NAME


export async function connectToDatabase() {
   const client: mongodb.MongoClient = new mongodb.MongoClient(connString);

   await client.connect();

   const db: mongodb.Db = client.db(dbName);

   const petsCollection: mongodb.Collection = db.collection(collectionName);

   collections.pets = petsCollection;

   console.log(`Successfully connected to database: ${db.databaseName} and collection: ${petsCollection.collectionName}`);
}

