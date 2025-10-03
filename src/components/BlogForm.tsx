/* ===== components/BlogForm.tsx ===== */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface BlogFormProps {
  editingBlog: any | null;
  setEditingBlog: (blog: any | null) => void;
  refreshBlogs: () => void;
}

export default function BlogForm({ editingBlog, setEditingBlog, refreshBlogs }: BlogFormProps) {
  const [title, setTitle] = useState(editingBlog?.title || "");
  const [isMounted, setIsMounted] = useState(false);

  // Prevent SSR by only initializing editor on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editingBlog?.content || "",
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none min-h-[200px] p-2 border rounded',
      },
    },
    immediatelyRender: false, // Explicitly disable SSR rendering
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !editor?.getHTML()) {
      toast.error("Title and content are required");
      return;
    }
    try {
      const token = localStorage.getItem("token")!;
      const url = editingBlog
        ? `http://localhost:5000/api/blogs/${editingBlog.id}`
        : "http://localhost:5000/api/blogs";
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
      toast.success(editingBlog ? "Blog updated" : "Blog created");
      setTitle("");
      editor?.commands.clearContent();
      setEditingBlog(null);
      refreshBlogs();
    } catch (error) {
      toast.error("Error saving blog");
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
        <Label>Content</Label>
        <EditorContent editor={editor} />
      </div>
      <div className="space-x-2">
        <Button type="submit">
          {editingBlog ? "Update Blog" : "Create Blog"}
        </Button>
        {editingBlog && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setEditingBlog(null)}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}