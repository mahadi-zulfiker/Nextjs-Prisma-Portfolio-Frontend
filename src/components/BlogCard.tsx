import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card className="hover:shadow-card-hover transition-all duration-300 overflow-hidden rounded-xl animate-fadeIn">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
        <Button asChild variant="outline" className="w-full rounded-full">
          <Link href={`/blogs/${blog.slug}`}>
            Read Article
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}