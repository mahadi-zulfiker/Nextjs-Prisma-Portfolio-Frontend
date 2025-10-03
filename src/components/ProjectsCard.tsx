import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  return (
    <Card className="overflow-hidden rounded-xl hover:shadow-card-hover transition-all duration-300 animate-fadeIn">
      {project.thumbnail ? (
        <div className="relative h-48 w-full">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary/30">No Image</div>
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
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
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {project.features.length > 3 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
              +{project.features.length - 3} more
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {project.liveLink && (
            <Button variant="outline" size="sm" asChild className="flex-1 rounded-full">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
          {project.repoLink && (
            <Button variant="outline" size="sm" asChild className="flex-1 rounded-full">
              <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                Repository
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}