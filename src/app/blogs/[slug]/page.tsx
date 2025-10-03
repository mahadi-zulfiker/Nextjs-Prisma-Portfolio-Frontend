import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:5000/api/blogs");
  const blogs = await res.json();
  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

async function getBlog(slug: string) {
  const res = await fetch(`http://localhost:5000/api/blogs/${slug}`, {
    next: { revalidate: 3600 }, // ISR
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }
  return res.json();
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">{blog.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div
              className="prose max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}