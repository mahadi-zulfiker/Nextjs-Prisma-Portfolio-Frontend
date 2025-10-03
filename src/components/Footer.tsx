import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground mb-4">&copy; 2025 My Portfolio. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="link" className="px-2">Privacy Policy</Button>
          <Button variant="link" className="px-2">Terms of Service</Button>
          <Button variant="link" className="px-2">Contact</Button>
        </div>
      </div>
    </footer>
  );
}