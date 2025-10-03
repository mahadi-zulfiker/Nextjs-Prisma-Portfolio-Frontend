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
      <main className="flex-1 container mx-auto px-4 py-24">
        <section className="text-center mb-24 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-3xl mx-auto">
            Showcasing innovative projects, insightful blogs, and my journey in tech.
          </p>
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-card">
              <Image
                src="/placeholder.svg?height=224&width=224"
                alt="Portfolio Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <Button asChild size="lg" className="rounded-full px-8 text-lg">
            <Link href="/projects">Explore Projects</Link>
          </Button>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card className="hover:shadow-card-hover transition-all duration-300 rounded-xl border-0 bg-gradient-to-br from-background to-accent/10 animate-slideIn">
            <CardHeader>
              <CardTitle className="text-2xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Discover my background, skills, and passions.</p>
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/about">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-card-hover transition-all duration-300 rounded-xl border-0 bg-gradient-to-br from-background to-primary/10 animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-2xl">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">View my latest creations and innovations.</p>
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/projects">View Projects</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-card-hover transition-all duration-300 rounded-xl border-0 bg-gradient-to-br from-background to-accent/10 animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-2xl">Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Read my thoughts on tech and development.</p>
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/blogs">Read Blogs</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
        
        <section className="text-center py-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Let us Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Interested in working together or have questions? Feel free to reach out!
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}