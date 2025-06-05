import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/database/db';
import { BlogPost } from '@/types/blog';

// GET /api/posts/[slug]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = await getDB();
  const post = db.data?.posts.find((p) => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

// DELETE /api/posts/[slug]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = await getDB();
  const index = db.data?.posts.findIndex((p) => p.slug === slug);

  if (index === -1 || index === undefined) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const [deletedPost] = db.data!.posts.splice(index, 1);
  await db.write();

  return NextResponse.json(deletedPost);
}

// PUT /api/posts/[slug]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = await getDB();
  const index = db.data?.posts.findIndex((p) => p.slug === slug);

  if (index === -1 || index === undefined) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const updatedData = await req.json();
  const newSlug = updatedData.title.toLowerCase().replace(/\s+/g, '-');

  const updatedPost: BlogPost = {
    ...db.data!.posts[index],
    ...updatedData,
    slug: newSlug,
    date: new Date().toISOString(),
  };

  db.data!.posts[index] = updatedPost;
  await db.write();

  return NextResponse.json(updatedPost);
}