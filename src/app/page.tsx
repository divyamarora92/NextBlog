'use client';
import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/types/blog';

// Mock data - will be replaced with real data later
const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My First Blog Post',
    content: 'Creating Blog post app',
    slug: 'my-first-blog-post',
    date: '2024-06-01',
  },
  {
    id: '2',
    title: 'Understanding TypeScript',
    content: 'TypeScript helps catch errors early in your development process...',
    slug: 'understanding-typescript',
    date: '2024-06-02',
  },
];

export default function HomePage() {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </section>
  );
}