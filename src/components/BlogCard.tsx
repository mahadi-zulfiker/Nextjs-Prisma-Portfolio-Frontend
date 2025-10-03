/* ===== components/BlogCard.tsx ===== */
import Link from "next/link";

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <Link href={`/blogs/${blog.slug}`} className="text-blue-500">
        Read More
      </Link>
    </div>
  );
}