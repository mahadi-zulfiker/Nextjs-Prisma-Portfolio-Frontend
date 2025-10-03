import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text">Portfolio</h3>
            <p className="text-muted-foreground mt-2">
              Showcasing innovative projects and insightful blogs
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <Link href="mailto:contact@example.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <Link href="https://github.com" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}