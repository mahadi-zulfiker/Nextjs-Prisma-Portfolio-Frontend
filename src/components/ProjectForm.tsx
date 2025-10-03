/* ===== components/ProjectForm.tsx ===== */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from "@/lib/utils";
import { Save, Image as ImageIcon, Link, Code, X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  thumbnail?: string;
  description: string;
  features: string[];
  liveLink?: string;
  repoLink?: string;
  createdAt: string;
}

interface ProjectFormProps {
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  refreshProjects: () => void;
}

export default function ProjectForm({ editingProject, setEditingProject, refreshProjects }: ProjectFormProps) {
  const [title, setTitle] = useState(editingProject?.title || "");
  const [thumbnail, setThumbnail] = useState(editingProject?.thumbnail || "");
  const [features, setFeatures] = useState(editingProject?.features?.join(", ") || "");
  const [liveLink, setLiveLink] = useState(editingProject?.liveLink || "");
  const [repoLink, setRepoLink] = useState(editingProject?.repoLink || "");
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent SSR by only initializing editor on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editingProject?.description || "",
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none min-h-[150px] p-4 border rounded-lg transition-colors duration-300 focus:border-primary dark:prose-invert bg-background',
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
    
    setIsSubmitting(true);
    
    const data = {
      title,
      thumbnail,
      description: editor.getHTML(),
      features: features.split(",").map((f: string) => f.trim()).filter(Boolean),
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
      toast.success(editingProject ? "Project updated successfully" : "Project created successfully");
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null; // Prevent rendering on server
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-lg font-medium flex items-center gap-2">
          <Code className="h-4 w-4" />
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="text-lg py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50"
          placeholder="Enter project title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="thumbnail" className="text-lg font-medium flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Thumbnail URL
        </Label>
        <div className="flex gap-2">
          <Input
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50 flex-1"
            placeholder="https://example.com/image.jpg"
          />
          {thumbnail && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => setThumbnail("")}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {thumbnail && (
          <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-border">
            <img 
              src={thumbnail} 
              alt="Thumbnail preview" 
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80";
              }}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label className="text-lg font-medium">Description</Label>
        <div className="border rounded-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
          <EditorContent 
            editor={editor} 
            className="min-h-[150px]"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="features" className="text-lg font-medium">Features (comma-separated)</Label>
        <Input
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50"
          placeholder="Feature 1, Feature 2, Feature 3"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="liveLink" className="text-lg font-medium flex items-center gap-2">
            <Link className="h-4 w-4" />
            Live Link
          </Label>
          <Input
            id="liveLink"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50"
            placeholder="https://example.com/live-demo"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="repoLink" className="text-lg font-medium flex items-center gap-2">
            <Code className="h-4 w-4" />
            Repository Link
          </Label>
          <Input
            id="repoLink"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            className="py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="rounded-full px-6 transition-all duration-300 hover:scale-105 group"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
              {editingProject ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              {editingProject ? "Update Project" : "Create Project"}
            </>
          )}
        </Button>
        {editingProject && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingProject(null)}
            className="rounded-full px-6 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}