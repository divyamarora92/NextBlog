// app/posts/[slug]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        
        if (!res.ok) {
          throw new Error(res.status === 404 
            ? 'Post not found' 
            : 'Failed to fetch post');
        }

        const data: BlogPost = await res.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, router]);

  const handleDelete = async () => {
    if (!post || !confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete post');

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p>Post not found</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <time 
          dateTime={post.date} 
          className="text-gray-500 text-sm"
        >
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </header>

      <div className="prose max-w-none mb-8">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <Link
          href={`/edit-post/${post.slug}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
        >
          Edit Post
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          aria-label="Delete post"
        >
          Delete Post
        </button>
      </div>
    </article>
  );
}