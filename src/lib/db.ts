import { MongoClient } from "mongodb";

const dbName = "shadcn-ui";
const env = process.env.NODE_ENV;
const uri = process.env.MONGODB_URI;

const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;
  private constructor() {
    if (!uri) {
      throw new Error("Please added mongodb connection string to env file");
    }

    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();
    if (env === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export const clientPromise = Singleton.instance;

export const getDb = async () => {
  const client = await clientPromise;
  return client.db(dbName);
};
