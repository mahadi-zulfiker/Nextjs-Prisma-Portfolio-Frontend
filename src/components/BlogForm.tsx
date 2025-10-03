/* ===== components/BlogForm.tsx ===== */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from "@/lib/utils";
import { Save, FileText, X } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

interface BlogFormProps {
  editingBlog: Blog | null;
  setEditingBlog: (blog: Blog | null) => void;
  refreshBlogs: () => void;
}

export default function BlogForm({ editingBlog, setEditingBlog, refreshBlogs }: BlogFormProps) {
  const [title, setTitle] = useState(editingBlog?.title || "");
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form state when editingBlog changes
  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title || "");
    } else {
      setTitle("");
    }
  }, [editingBlog]);

  // Prevent SSR by only initializing editor on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editingBlog?.content || "",
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none min-h-[200px] p-4 border rounded-lg transition-colors duration-300 focus:border-primary dark:prose-invert bg-background',
      },
    },
    immediatelyRender: false, // Explicitly disable SSR rendering
  });

  // Update editor content when editingBlog changes
  useEffect(() => {
    if (editor && editingBlog) {
      editor.commands.setContent(editingBlog.content || "");
    } else if (editor) {
      editor.commands.clearContent();
    }
  }, [editor, editingBlog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !editor?.getHTML()) {
      toast.error("Title and content are required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token")!;
      const url = editingBlog
        ? `https://next-prisma-portfolio-backend.vercel.app/api/blogs/${editingBlog.id}`
        : "https://next-prisma-portfolio-backend.vercel.app/api/blogs";
      const method = editingBlog ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content: editor.getHTML() }),
      });
      if (!res.ok) throw new Error("Failed to save blog");
      toast.success(editingBlog ? "Blog updated successfully" : "Blog created successfully");
      setTitle("");
      editor?.commands.clearContent();
      setEditingBlog(null);
      refreshBlogs();
    } catch (error) {
      toast.error("Error saving blog");
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
          <FileText className="h-4 w-4" />
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="text-lg py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50"
          placeholder="Enter blog title"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-lg font-medium">Content</Label>
        <div className="border rounded-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
          <EditorContent 
            editor={editor} 
            className="min-h-[200px]"
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
              {editingBlog ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              {editingBlog ? "Update Blog" : "Create Blog"}
            </>
          )}
        </Button>
        {editingBlog && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingBlog(null)}
            className="rounded-full px-6 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}