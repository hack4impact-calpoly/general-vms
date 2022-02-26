import { DB } from '../db/db';
import dotenv from 'dotenv';

const port = process.env.PORT;
const postgres = process.env.POSTGRES;
const tokenLength: number = parseInt(process.env.tokenLength);

export function getConfig() { 
  dotenv.config();
  const config = {
        port, 
        postgres,
        auth: {
                tokenLength
        }
  }
  return config;            
}

export async function runMigrations() {	
  const config = getConfig(); 
  const db = await DB.create(config);
  await db.migrate();
}
