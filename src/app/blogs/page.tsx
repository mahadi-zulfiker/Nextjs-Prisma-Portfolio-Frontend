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

export default async function Blogs() {
  let blogs = [];
  
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
        
        {blogs && blogs.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No blogs available yet</h2>
            <p className="text-muted-foreground">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs && blogs.map((blog: any) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}