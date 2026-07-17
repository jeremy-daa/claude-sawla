import { MongoClient } from "mongodb";

declare global {
  var sawlaMongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getSawlaToursDb() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  const clientPromise =
    global.sawlaMongoClientPromise ??
    new MongoClient(uri, {
      connectTimeoutMS: 8000,
      serverSelectionTimeoutMS: 8000,
    })
      .connect()
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          global.sawlaMongoClientPromise = undefined;
        }
        throw error;
      });

  if (process.env.NODE_ENV !== "production") {
    global.sawlaMongoClientPromise = clientPromise;
  }

  const connectedClient = await clientPromise;
  return connectedClient.db("sawla-tours");
}
