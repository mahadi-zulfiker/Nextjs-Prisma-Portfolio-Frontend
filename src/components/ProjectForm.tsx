
/* ===== components/ProjectForm.tsx ===== */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface ProjectFormProps {
  editingProject: any | null;
  setEditingProject: (project: any | null) => void;
  refreshProjects: () => void;
}

export default function ProjectForm({ editingProject, setEditingProject, refreshProjects }: ProjectFormProps) {
  const [title, setTitle] = useState(editingProject?.title || "");
  const [thumbnail, setThumbnail] = useState(editingProject?.thumbnail || "");
  const [features, setFeatures] = useState(editingProject?.features.join(", ") || "");
  const [liveLink, setLiveLink] = useState(editingProject?.liveLink || "");
  const [repoLink, setRepoLink] = useState(editingProject?.repoLink || "");
  const [isMounted, setIsMounted] = useState(false);

  // Prevent SSR by only initializing editor on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editingProject?.description || "",
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none min-h-[150px] p-2 border rounded',
      },
    },
    immediatelyRender: false, // Explicitly disable SSR rendering
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !editor?.getHTML()) {
      toast.error("Title and description are required");
      return;
    }
    const data = {
      title,
      thumbnail,
      description: editor.getHTML(),
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
      editor?.commands.clearContent();
      setFeatures("");
      setLiveLink("");
      setRepoLink("");
      setEditingProject(null);
      refreshProjects();
    } catch (error) {
      toast.error("Error saving project");
    }
  };

  if (!isMounted) {
    return null; // Prevent rendering on server
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>
      <div>
        <Label>Description</Label>
        <EditorContent editor={editor} />
      </div>
      <div>
        <Label htmlFor="features">Features (comma-separated)</Label>
        <Input
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="liveLink">Live Link</Label>
        <Input
          id="liveLink"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="repoLink">Repo Link</Label>
        <Input
          id="repoLink"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
        />
      </div>
      <div className="space-x-2">
        <Button type="submit">
          {editingProject ? "Update Project" : "Create Project"}
        </Button>
        {editingProject && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setEditingProject(null)}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}