import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectsCard";

async function getProjects() {
  try {
    const res = await fetch("http://localhost:5000/api/projects", {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
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
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">No projects available yet</h2>
            <p className="text-muted-foreground">Check back soon for updates!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}