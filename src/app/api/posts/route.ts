import { NextResponse } from 'next/server';
import { getDB } from '@/database/db';

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const db = await getDB();

  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    slug: title.toLowerCase().replace(/\s+/g, '-'),
    date: new Date().toISOString()
  };

  db.data!.posts.unshift(newPost);
  await db.write();

  return NextResponse.json(newPost, { status: 201 });
}

export async function GET() {
  const db = await getDB();
  return NextResponse.json(db.data!.posts);
}
