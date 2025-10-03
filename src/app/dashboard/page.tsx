/* ===== app/dashboard/page.tsx ===== */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogForm from "@/components/BlogForm";
import ProjectForm from "@/components/ProjectForm";

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
}

interface Project {
  id: number;
  title: string;
  thumbnail?: string;
  description: string;
  features: string[];
  liveLink?: string;
  repoLink?: string;
}

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchBlogs(token);
    fetchProjects(token);
  }, [router]);

  const fetchBlogs = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      setBlogs(await res.json());
    } catch (error) {
      toast.error("Error fetching blogs");
    }
  };

  const fetchProjects = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch projects");
      setProjects(await res.json());
    } catch (error) {
      toast.error("Error fetching projects");
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token")!;
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      toast.success("Blog deleted");
      fetchBlogs(token);
    } catch (error) {
      toast.error("Error deleting blog");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token")!;
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Project deleted");
      fetchProjects(token);
    } catch (error) {
      toast.error("Error deleting project");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logged out");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>
          <BlogForm
            editingBlog={editingBlog}
            setEditingBlog={setEditingBlog}
            refreshBlogs={() => fetchBlogs(localStorage.getItem("token")!)}
          />
          <ul className="mt-4">
            {blogs.map((blog) => (
              <li key={blog.id} className="flex justify-between items-center mb-2">
                <span>{blog.title}</span>
                <div>
                  <button onClick={() => setEditingBlog(blog)} className="mr-2 text-blue-500">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteBlog(blog.id)} className="text-red-500">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
          <ProjectForm
            editingProject={editingProject}
            setEditingProject={setEditingProject}
            refreshProjects={() => fetchProjects(localStorage.getItem("token")!)}
          />
          <ul className="mt-4">
            {projects.map((project) => (
              <li key={project.id} className="flex justify-between items-center mb-2">
                <span>{project.title}</span>
                <div>
                  <button onClick={() => setEditingProject(project)} className="mr-2 text-blue-500">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProject(project.id)} className="text-red-500">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}