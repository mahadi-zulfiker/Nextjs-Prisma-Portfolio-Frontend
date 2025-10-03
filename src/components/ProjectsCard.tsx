import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    thumbnail?: string;
    description: string;
    features: string[];
    liveLink?: string;
    repoLink?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Use Unsplash image if no thumbnail is provided
  const imageUrl = project.thumbnail || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80`;
  
  return (
    <Card className="overflow-hidden rounded-xl hover:shadow-card-hover transition-all duration-300 animate-fadeIn group border-border/50 hover:border-primary/30">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={project.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="prose max-w-none mb-4 text-sm line-clamp-3 dark:prose-invert" 
          dangerouslySetInnerHTML={{ __html: project.description }} 
        />
        <div className="flex flex-wrap gap-1 mb-4">
          {project.features.slice(0, 3).map((feature, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20"
            >
              {feature}
            </span>
          ))}
          {project.features.length > 3 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full border border-border">
              +{project.features.length - 3} more
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {project.liveLink && (
            <Button variant="outline" size="sm" asChild className="flex-1 rounded-full group/button">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                Live Demo
              </a>
            </Button>
          )}
          {project.repoLink && (
            <Button variant="outline" size="sm" asChild className="flex-1 rounded-full group/button">
              <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Repository
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}