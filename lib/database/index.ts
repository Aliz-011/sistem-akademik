import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import dotenv from 'dotenv';
import ws from 'ws';

dotenv.config();
neonConfig.webSocketConstructor = ws;

const sql = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaNeon(sql);

const prismaSingleton = () => new PrismaClient();

declare global {
  var client: undefined | ReturnType<typeof prismaSingleton>;
}

export const prisma = globalThis.client ?? prismaSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.client = prisma;
