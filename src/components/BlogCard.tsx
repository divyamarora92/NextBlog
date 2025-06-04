import Link from 'next/link';
import { BlogPost } from '@/types/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="border p-4 rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        {post.content}
      </p>
    </div>
  );
}