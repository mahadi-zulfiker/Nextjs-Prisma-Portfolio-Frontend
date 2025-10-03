"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <ul className="flex space-x-1 md:space-x-2">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/projects", label: "Projects" },
            { href: "/blogs", label: "Blogs" },
            { href: isLoggedIn ? "/dashboard" : "/login", label: isLoggedIn ? "Dashboard" : "Login" }
          ].map((item) => (
            <li key={item.href}>
              <Button 
                variant="ghost" 
                asChild
                className="text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-full px-3 md:px-4"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}