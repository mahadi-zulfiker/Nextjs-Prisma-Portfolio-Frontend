/* ===== app/blogs/page.tsx ===== */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";

async function getBlogs() {
  const res = await fetch("http://localhost:5000/api/blogs", {
    next: { revalidate: 3600 }, // ISR every hour
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}