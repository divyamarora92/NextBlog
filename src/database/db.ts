import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { BlogPost } from '@/types/blog';

type Data = {
  posts: BlogPost[];
};

const adapter = new JSONFile<Data>('db.json');
const defaultData: Data = { posts: [] };

const db = new Low<Data>(adapter, defaultData);

export async function getDB() {
  await db.read();
  return db;
}
