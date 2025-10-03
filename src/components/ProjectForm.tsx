/* ===== components/ProjectForm.tsx ===== */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface ProjectFormProps {
  editingProject: any | null;
  setEditingProject: (project: any | null) => void;
  refreshProjects: () => void;
}

export default function ProjectForm({ editingProject, setEditingProject, refreshProjects }: ProjectFormProps) {
  const [title, setTitle] = useState(editingProject?.title || "");
  const [thumbnail, setThumbnail] = useState(editingProject?.thumbnail || "");
  const [description, setDescription] = useState(editingProject?.description || "");
  const [features, setFeatures] = useState(editingProject?.features.join(", ") || "");
  const [liveLink, setLiveLink] = useState(editingProject?.liveLink || "");
  const [repoLink, setRepoLink] = useState(editingProject?.repoLink || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }
    const data = {
      title,
      thumbnail,
      description,
      features: features.split(",").map((f: string) => f.trim()),
      liveLink,
      repoLink,
    };
    try {
      const token = localStorage.getItem("token")!;
      const url = editingProject
        ? `http://localhost:5000/api/projects/${editingProject.id}`
        : "http://localhost:5000/api/projects";
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save project");
      toast.success(editingProject ? "Project updated" : "Project created");
      setTitle("");
      setThumbnail("");
      setDescription("");
      setFeatures("");
      setLiveLink("");
      setRepoLink("");
      setEditingProject(null);
      refreshProjects();
    } catch (error) {
      toast.error("Error saving project");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="thumbnail" className="block mb-1">Thumbnail URL</label>
        <input
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="features" className="block mb-1">Features (comma-separated)</label>
        <input
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="liveLink" className="block mb-1">Live Link</label>
        <input
          id="liveLink"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="repoLink" className="block mb-1">Repo Link</label>
        <input
          id="repoLink"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {editingProject ? "Update Project" : "Create Project"}
      </button>
      {editingProject && (
        <button
          type="button"
          onClick={() => setEditingProject(null)}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
}