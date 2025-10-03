"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogForm from "@/components/BlogForm";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([fetchBlogs(token), fetchProjects(token)]).then(() => setLoading(false));
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
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <section className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Manage Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              <BlogForm
                editingBlog={editingBlog}
                setEditingBlog={setEditingBlog}
                refreshBlogs={() => fetchBlogs(localStorage.getItem("token")!)}
              />
              {loading ? (
                <div className="space-y-4 mt-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <ul className="mt-4 space-y-2">
                  {blogs.map((blog) => (
                    <li key={blog.id} className="flex justify-between items-center p-2 border rounded">
                      <span>{blog.title}</span>
                      <div className="space-x-2">
                        <Button variant="link" onClick={() => setEditingBlog(blog)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteBlog(blog.id)}>
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Manage Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectForm
                editingProject={editingProject}
                setEditingProject={setEditingProject}
                refreshProjects={() => fetchProjects(localStorage.getItem("token")!)}
              />
              {loading ? (
                <div className="space-y-4 mt-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <ul className="mt-4 space-y-2">
                  {projects.map((project) => (
                    <li key={project.id} className="flex justify-between items-center p-2 border rounded">
                      <span>{project.title}</span>
                      <div className="space-x-2">
                        <Button variant="link" onClick={() => setEditingProject(project)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}