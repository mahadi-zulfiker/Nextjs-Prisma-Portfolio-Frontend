import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Github, Linkedin, Mail, User, Code, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="text-center mb-24 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Hi, I'm Mahadi Zulfiker
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-3xl mx-auto">
            Full-Stack Developer specializing in the MERN stack, building responsive, scalable web applications.
          </p>
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-card">
              <Image
                src="https://i.ibb.co.com/LXQ6FzDJ/Mahadi-Pro.jpg"
                alt="Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 text-lg group">
              <Link href="/projects">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card className="hover:shadow-card-hover transition-all duration-300 rounded-xl border-0 bg-gradient-to-br from-background to-accent/10 animate-slideIn hover:scale-[1.02]">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Learn about my journey, skills, and experience as a Full-Stack Developer.</p>
              <Button variant="outline" asChild className="rounded-full group">
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-card-hover transition-all duration-300 rounded-xl border-0 bg-gradient-to-br from-background to-primary/10 animate-slideIn hover:scale-[1.02]" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Explore my projects built with the MERN stack and modern technologies.</p>
              <Button variant="outline" asChild className="rounded-full group">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-card-hover transition-all duration-300 rounded-xl border-0 bg-gradient-to-br from-background to-accent/10 animate-slideIn hover:scale-[1.02]" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Read articles about web development, programming, and tech insights.</p>
              <Button variant="outline" asChild className="rounded-full group">
                <Link href="/blogs">
                  Read Blogs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
        
        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl mb-24">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Let's connect!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}