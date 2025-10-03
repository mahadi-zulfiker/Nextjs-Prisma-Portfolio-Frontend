/* ===== src\app\blogs\[slug]\page.tsx ===== */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Blog = {
  slug: string;
  title: string;
  content: string;
  createdAt: string;
};

// Define the props type explicitly, with params as a Promise
interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://next-prisma-portfolio-backend.vercel.app/api/blogs");
    if (!res.ok) {
      console.error("Failed to fetch blogs for static params:", res.status);
      return [];
    }
    const blogs: Blog[] = await res.json();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getBlog(slug: string) {
  try {
    const res = await fetch(`https://next-prisma-portfolio-backend.vercel.app/api/blogs/${slug}`, {
      next: { revalidate: 3600 }, // ISR
    });
    if (!res.ok) {
      console.error(`Failed to fetch blog ${slug}:`, res.status);
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    throw error;
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  // Await the params Promise to get the slug
  const { slug } = await params;

  let blog = null;

  try {
    blog = await getBlog(slug);
  } catch (error) {
    console.error("Error in BlogPage:", error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl">Blog Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The requested blog post could not be found.</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

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