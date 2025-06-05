import { BlogPost } from '@/types/blog';

type Data = {
  posts: BlogPost[];
};

const db: Data = { posts: [] };

export async function getDB() {
  return db;
}