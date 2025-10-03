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
import { cn } from "@/lib/utils";
import { ArrowLeft, LogOut, FileText, Code, BarChart3, Lightbulb } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

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

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"blogs" | "projects">("blogs");
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
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token")!;
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      toast.success("Blog deleted successfully");
      fetchBlogs(token);
    } catch (error) {
      toast.error("Error deleting blog");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem("token")!;
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Project deleted successfully");
      fetchProjects(token);
    } catch (error) {
      toast.error("Error deleting project");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Button asChild variant="ghost" className="rounded-full p-2 mr-2">
              <button onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your content and portfolio</p>
            </div>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="rounded-full group">
            <LogOut className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-card rounded-xl border-border/50">
              <CardHeader className="pb-4">
                <div className="flex border-b border-border">
                  <Button
                    variant="ghost"
                    className={cn(
                      "rounded-none px-6 pb-3 font-semibold",
                      activeTab === "blogs" 
                        ? "border-b-2 border-primary text-primary" 
                        : "text-muted-foreground"
                    )}
                    onClick={() => setActiveTab("blogs")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Blogs
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "rounded-none px-6 pb-3 font-semibold",
                      activeTab === "projects" 
                        ? "border-b-2 border-primary text-primary" 
                        : "text-muted-foreground"
                    )}
                    onClick={() => setActiveTab("projects")}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Projects
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {activeTab === "blogs" ? (
                  <div className="space-y-6">
                    <BlogForm
                      editingBlog={editingBlog}
                      setEditingBlog={setEditingBlog}
                      refreshBlogs={() => fetchBlogs(localStorage.getItem("token")!)}
                    />
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-semibold mb-4">Your Blogs</h3>
                      {loading ? (
                        <div className="space-y-4">
                          <Skeleton className="h-16 w-full rounded-lg" />
                          <Skeleton className="h-16 w-full rounded-lg" />
                          <Skeleton className="h-16 w-full rounded-lg" />
                        </div>
                      ) : blogs.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/20" />
                          <p>No blogs created yet</p>
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {blogs.map((blog) => (
                            <li 
                              key={blog.id} 
                              className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-accent transition-colors animate-fadeIn"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{blog.title}</h4>
                                <p className="text-sm text-muted-foreground truncate">
                                  {new Date(blog.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setEditingBlog(blog)}
                                  className="rounded-full"
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleDeleteBlog(blog.id)}
                                  className="rounded-full"
                                >
                                  Delete
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <ProjectForm
                      editingProject={editingProject}
                      setEditingProject={setEditingProject}
                      refreshProjects={() => fetchProjects(localStorage.getItem("token")!)}
                    />
                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-semibold mb-4">Your Projects</h3>
                      {loading ? (
                        <div className="space-y-4">
                          <Skeleton className="h-16 w-full rounded-lg" />
                          <Skeleton className="h-16 w-full rounded-lg" />
                          <Skeleton className="h-16 w-full rounded-lg" />
                        </div>
                      ) : projects.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Code className="h-12 w-12 mx-auto mb-4 text-muted-foreground/20" />
                          <p>No projects created yet</p>
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {projects.map((project) => (
                            <li 
                              key={project.id} 
                              className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-accent transition-colors animate-fadeIn"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{project.title}</h4>
                                <p className="text-sm text-muted-foreground truncate line-clamp-1">
                                  {project.description.replace(/<[^>]*>/g, '')}
                                </p>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setEditingProject(project)}
                                  className="rounded-full"
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="rounded-full"
                                >
                                  Delete
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card className="shadow-card rounded-xl border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Quick Stats</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/10">
                    <p className="text-2xl font-bold">{blogs.length}</p>
                    <p className="text-sm text-muted-foreground">Blogs</p>
                  </div>
                  <div className="bg-accent p-4 rounded-lg text-center border border-accent/30">
                    <p className="text-2xl font-bold">{projects.length}</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card rounded-xl border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Keep your blog titles concise and engaging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Add high-quality images to your projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Regularly update your portfolio content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>Use descriptive meta tags for SEO</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}