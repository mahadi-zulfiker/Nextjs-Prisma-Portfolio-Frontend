/* ===== components/BlogForm.tsx ===== */
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

interface BlogFormProps {
  editingBlog: any | null;
  setEditingBlog: (blog: any | null) => void;
  refreshBlogs: () => void;
}

export default function BlogForm({ editingBlog, setEditingBlog, refreshBlogs }: BlogFormProps) {
  const [title, setTitle] = useState(editingBlog?.title || "");
  const [content, setContent] = useState(editingBlog?.content || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
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
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error("Failed to save blog");
      toast.success(editingBlog ? "Blog updated" : "Blog created");
      setTitle("");
      setContent("");
      setEditingBlog(null);
      refreshBlogs();
    } catch (error) {
      toast.error("Error saving blog");
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
        <label htmlFor="content" className="block mb-1">Content</label>
        {/* <ReactQuill value={content} onChange={setContent} /> */}
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {editingBlog ? "Update Blog" : "Create Blog"}
      </button>
      {editingBlog && (
        <button
          type="button"
          onClick={() => setEditingBlog(null)}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
}