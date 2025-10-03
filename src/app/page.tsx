import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Showcasing innovative projects, insightful blogs, and my journey in tech.
          </p>
          <Image
            src="/placeholder.svg?height=180&width=180" // Updated to a better placeholder
            alt="Portfolio Logo"
            width={180}
            height={180}
            className="mx-auto mb-8 rounded-full shadow-lg"
          />
          <Button asChild>
            <Link href="/projects">Explore Projects</Link>
          </Button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Discover my background, skills, and passions.</p>
              <Button variant="link" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View my latest creations and innovations.</p>
              <Button variant="link" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Read my thoughts on tech and development.</p>
              <Button variant="link" asChild>
                <Link href="/blogs">Read Blogs</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}