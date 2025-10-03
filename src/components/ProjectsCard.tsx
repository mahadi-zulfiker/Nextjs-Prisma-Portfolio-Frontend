import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    thumbnail?: string;
    description: string;
    features: string[] | string; // Accept both array and string
    liveLink?: string;
    repoLink?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Use Unsplash image if no thumbnail is provided
  const imageUrl = project.thumbnail || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80`;
  
  // Ensure features is always an array
  let featuresArray: string[] = [];
  try {
    if (Array.isArray(project.features)) {
      featuresArray = project.features;
    } else if (typeof project.features === 'string') {
      // Handle both comma-separated strings and JSON strings
      try {
        // Try to parse as JSON array first
        const parsed = JSON.parse(project.features);
        if (Array.isArray(parsed)) {
          featuresArray = parsed;
        } else {
          // If not an array, treat as comma-separated
          featuresArray = project.features.split(',').map(f => f.trim()).filter(Boolean);
        }
      } catch (e) {
        // If JSON parsing fails, treat as comma-separated
        featuresArray = project.features.split(',').map(f => f.trim()).filter(Boolean);
      }
    }
  } catch (error) {
    console.error("Error processing features:", error);
    // Fallback to empty array
    featuresArray = [];
  }
  
  return (
    <Card className="overflow-hidden rounded-xl hover:shadow-card-hover transition-all duration-300 group border-border/50 hover:border-primary/30">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={project.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback image on error
            e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80";
          }}
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
          {featuresArray.slice(0, 3).map((feature, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20"
            >
              {feature}
            </span>
          ))}
          {featuresArray.length > 3 && featuresArray.length > 0 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full border border-border">
              +{featuresArray.length - 3} more
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