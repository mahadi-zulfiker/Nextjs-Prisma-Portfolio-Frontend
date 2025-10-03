/* ===== app/blogs/[slug]/page.tsx ===== */
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </main>
      <Footer />
    </div>
  );
}