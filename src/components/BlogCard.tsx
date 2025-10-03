import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <Card className="hover:shadow-card-hover transition-all duration-300 overflow-hidden rounded-xl animate-fadeIn group border-border/50 hover:border-primary/30 hover:scale-[1.02]">
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=300&q=80`} 
          alt={blog.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
        <Button asChild variant="outline" className="w-full rounded-full group/button">
          <Link href={`/blogs/${blog.slug}`}>
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}