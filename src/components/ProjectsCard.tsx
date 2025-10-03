/* ===== components/ProjectCard.tsx ===== */
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
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      {project.thumbnail && (
        <img src={project.thumbnail} alt={project.title} className="w-full h-40 object-cover mb-4" />
      )}
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="mb-4">{project.description}</p>
      <ul className="list-disc pl-4 mb-4">
        {project.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
      {project.liveLink && (
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-4">
          Live Demo
        </a>
      )}
      {project.repoLink && (
        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          Repository
        </a>
      )}
    </div>
  );
}