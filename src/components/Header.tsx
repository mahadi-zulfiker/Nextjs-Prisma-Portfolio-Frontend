"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <header className="bg-background border-b py-4 sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Portfolio</Link>
        <ul className="flex space-x-6">
          <li><Button variant="link" asChild><Link href="/">Home</Link></Button></li>
          <li><Button variant="link" asChild><Link href="/about">About</Link></Button></li>
          <li><Button variant="link" asChild><Link href="/projects">Projects</Link></Button></li>
          <li><Button variant="link" asChild><Link href="/blogs">Blogs</Link></Button></li>
          {isLoggedIn ? (
            <li><Button variant="link" asChild><Link href="/dashboard">Dashboard</Link></Button></li>
          ) : (
            <li><Button variant="link" asChild><Link href="/login">Login</Link></Button></li>
          )}
        </ul>
      </nav>
    </header>
  );
}