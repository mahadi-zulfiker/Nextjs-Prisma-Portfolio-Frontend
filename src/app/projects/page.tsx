import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code } from "lucide-react";
import Link from "next/link";

async function getProjects() {
  try {
    const res = await fetch("https://next-prisma-portfolio-backend.vercel.app/api/projects", {
      next: { revalidate: 3600 }, // ISR every hour
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status, res.statusText);
      throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log("Projects data:", data); // For debugging
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

interface Project {
  id: number;
  title: string;
  thumbnail?: string;
  description: string;
  features: string[];
  liveLink?: string;
  repoLink?: string;
}

export default async function Projects() {
  let projects: Project[] = [];
  
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Error in Projects page:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="rounded-full p-2 mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">My Projects</h1>
        </div>
        
        <div className="text-center mb-16 animate-fadeIn">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my latest creations and innovations in web development and design.
          </p>
        </div>
        
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-accent/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Code className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">No projects available yet</h2>
            <p className="text-muted-foreground mb-6">Check back soon for updates!</p>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}