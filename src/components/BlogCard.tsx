import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <Link href={`/blogs/${blog.slug}`} className="text-primary hover:underline">
          Read More
        </Link>
      </CardContent>
    </Card>
  );
}