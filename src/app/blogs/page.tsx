import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";

async function getBlogs() {
  try {
    const res = await fetch("http://localhost:5000/api/blogs", {
      next: { revalidate: 3600 }, // ISR every hour
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.status, res.statusText);
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log("Blogs data:", data); // For debugging
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

interface Blog {
  id: number;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  // Add other fields as needed
}

export default async function Blogs() {
  let blogs: Blog[] = [];
  
  try {
    blogs = await getBlogs();
  } catch (error) {
    console.error("Error in Blogs page:", error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Blogs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Read my thoughts, tutorials, and insights on technology and development.
          </p>
        </div>
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: Blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">Check back soon for updates!</p>
        )}
      </main>
      <Footer />
    </div>
  );
}