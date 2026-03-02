import { Db, MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const uri = process.env.MONGODB_URI;

// mongodb+srv:// URIs use TLS automatically — no manual TLS options needed
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db("ungarovai");
}

export const COLLECTIONS = {
  USERS: 'users',
  ASSESSMENTS: 'assessments',
  SESSIONS: 'sessions',
  ACCOUNTS: 'accounts',
} as const;

export default clientPromise;