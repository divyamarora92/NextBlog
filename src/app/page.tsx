'use client';
import { useEffect, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/types/blog';



export default function HomePage() {
  const [posts,setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

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