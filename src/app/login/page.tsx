"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      loginSchema.parse(formData);
      
      setIsLoading(true);
      
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Invalid credentials");
      }
      
      const { token } = await res.json();
      localStorage.setItem("token", token);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error: any) {
      if (error.name === "ZodError") {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-card rounded-xl animate-fadeIn">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="py-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your password"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-6 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Default credentials: admin@example.com / password123
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}