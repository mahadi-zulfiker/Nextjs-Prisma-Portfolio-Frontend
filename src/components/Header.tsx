"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
    { href: isLoggedIn ? "/dashboard" : "/login", label: isLoggedIn ? "Dashboard" : "Login" }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-sm" : "bg-background py-4"
    )}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold gradient-text"
        >
          Portfolio
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button 
              key={item.href}
              variant="ghost" 
              asChild
              className="text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-full px-3 md:px-4 transition-colors"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <ThemeToggle />
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-2 rounded-full"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
            {navItems.map((item) => (
              <Button 
                key={item.href}
                variant="ghost" 
                asChild
                className="justify-start text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-full px-4 py-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}