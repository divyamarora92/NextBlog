import { NextResponse } from 'next/server';
import { getDB } from '@/database/db';

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const db = await getDB();
  const post = db.data!.posts.find(p => p.slug === params.slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const db = await getDB();
  const index = db.data!.posts.findIndex(p => p.slug === params.slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const [deletedPost] = db.data!.posts.splice(index, 1);
  await db.write();

  return NextResponse.json(deletedPost);
}
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const db = await getDB();
  const { slug } = params;
  const index = db.data!.posts.findIndex(p => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const updatedData = await request.json();
  const newSlug = updatedData.title.toLowerCase().replace(/\s+/g, '-');

  const updatedPost = {
    ...db.data!.posts[index],
    ...updatedData,
    slug: newSlug,
    date: new Date().toISOString(),
  };

  db.data!.posts[index] = updatedPost;
  await db.write();

  return NextResponse.json(updatedPost);
}
