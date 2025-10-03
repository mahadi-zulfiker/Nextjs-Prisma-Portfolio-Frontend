"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: number;
  title: string;
  thumbnail?: string;
  description: string;
  features: string[] | string; // Accept both array and string
  liveLink?: string;
  repoLink?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://next-prisma-portfolio-backend.vercel.app/api/projects");
        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Projects data:", data);
        // Ensure we have an array
        const projectsArray = Array.isArray(data) ? data : [];
        setProjects(projectsArray);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        // Ensure we have an empty array on error
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-destructive/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Code className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Error Loading Projects</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        ) : projects && projects.length > 0 ? (
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