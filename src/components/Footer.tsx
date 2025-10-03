import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-4 text-center">
      <p className="text-muted-foreground">&copy; 2025 My Portfolio. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <Button variant="link">Privacy Policy</Button>
        <Button variant="link">Terms of Service</Button>
      </div>
    </footer>
  );
}