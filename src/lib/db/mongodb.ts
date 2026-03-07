import { Db, MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Iltimos, .env.local faylida MONGODB_URI ni aniqlang');
}

const uri = process.env.MONGODB_URI;
const options = {};

// Global obyektni e'lon qilish (development rejimida ulanishni saqlab qolish uchun)
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Development rejimida global o'zgaruvchidan foydalanamiz, 
  // aks holda har safar kod o'zgarganda yangi ulanish ochilaveradi.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production rejimida yangi client yaratamiz
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Ma'lumotlar bazasi obyektini qaytaruvchi funksiya
 */
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  // DB nomini .env dan olish tavsiya etiladi, lekin sizda "ungarovai" ekan
  return client.db("ungarovai");
}

/**
 * Kolleksiya nomlari uchun konstanta
 */
export const COLLECTIONS = {
  USERS: 'users',
  ASSESSMENTS: 'assessments',
  SESSIONS: 'sessions',
  ACCOUNTS: 'accounts',
} as const;

export default clientPromise;