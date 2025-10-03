/* ===== app/page.tsx ===== */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-lg mb-8">
            Showcase of my projects, blogs, and more.
          </p>
          <Image
            src="/next.svg" // Replace with your logo or hero image
            alt="Portfolio Logo"
            width={180}
            height={38}
            className="mx-auto mb-8"
          />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/about"
            className="p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p>Learn more about my background and skills.</p>
          </Link>
          <Link
            href="/projects"
            className="p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Projects</h2>
            <p>Explore my personal projects.</p>
          </Link>
          <Link
            href="/blogs"
            className="p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Blogs</h2>
            <p>Read my latest articles.</p>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}