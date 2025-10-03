import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="hover:shadow-xl transition-shadow overflow-hidden">
      {project.thumbnail && (
        <Image 
          src={project.thumbnail} 
          alt={project.title} 
          width={400} 
          height={200} 
          className="w-full h-40 object-cover" 
          loading="lazy"
        />
      )}
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="prose max-w-none mb-4 dark:prose-invert" 
          dangerouslySetInnerHTML={{ __html: project.description }} 
        />
        <ul className="list-disc pl-4 mb-4 space-y-1">
          {project.features.map((feature, idx) => (
            <li key={idx} className="text-sm">{feature}</li>
          ))}
        </ul>
        <div className="space-x-2">
          {project.liveLink && (
            <Button variant="outline" asChild>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
          {project.repoLink && (
            <Button variant="outline" asChild>
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