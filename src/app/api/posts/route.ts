import { NextResponse } from 'next/server';

// Temporary in-memory storage
let posts: any[] = [];

export async function POST(request: Request) {
  const newPost = await request.json();
  
  // Add simple ID and date
  const postWithId = {
    ...newPost,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    slug: newPost.title.toLowerCase().replace(/\s+/g, '-')
  };

  posts.unshift(postWithId); // Add to beginning of array
  
  return NextResponse.json(postWithId, { status: 201 });
}

// Also add GET for later use
export async function GET() {
  return NextResponse.json(posts);
}