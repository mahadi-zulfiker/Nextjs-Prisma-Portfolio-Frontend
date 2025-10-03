import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Added for skill badges
import { LucideIcon, Mail, Linkedin, Github } from "lucide-react"; // Added icons for better UX

export default function About() {
  const skills = [
    { category: "Frontend", items: ["Next.js & React", "TypeScript & JavaScript", "Tailwind CSS & Shadcn/UI"] },
    { category: "Backend", items: ["Express.js & Node.js", "Prisma ORM & PostgreSQL"] },
    { category: "Tools", items: ["Git & GitHub", "AWS & Deployment", "Figma & Design"] }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background/50 transition-colors duration-300">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate full-stack developer with expertise in modern web technologies. Crafting elegant solutions for complex problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-xl rounded-2xl lg:col-span-2 animate-slideIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl">Who I Am</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert text-lg space-y-4">
                <p>
                  Hi, I&apos;m John Doe, a full-stack developer with over 5 years of experience in building scalable web applications. 
                  I&apos;m passionate about creating user-centric solutions using modern technologies.
                </p>
                <p>
                  My approach combines technical expertise with creative problem-solving to deliver exceptional digital experiences. 
                  I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl rounded-2xl animate-slideIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-3xl">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-xl mb-2">Get in Touch</h3>
                  <p className="text-muted-foreground mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>john.doe@example.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-primary" />
                    <Link href="https://linkedin.com/in/johndoe" className="text-primary hover:underline">
                      linkedin.com/in/johndoe
                    </Link>
                  </p>
                  <p className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-primary" />
                    <Link href="https://github.com/johndoe" className="text-primary hover:underline">
                      github.com/johndoe
                    </Link>
                  </p>
                </div>
                <Button asChild className="w-full rounded-full mt-4 hover:scale-105 transition-transform duration-300">
                  <Link href="mailto:john.doe@example.com">Send Email</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skills.map((skillGroup, index) => (
            <Card key={skillGroup.category} className="shadow-xl rounded-2xl animate-slideIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardHeader>
                <CardTitle className="text-2xl">{skillGroup.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm px-3 py-1 rounded-full">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="shadow-xl rounded-2xl mb-16 animate-fadeIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl">Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">Senior Developer</h3>
                  <p className="text-primary font-medium">TechCorp (2020 - Present)</p>
                  <p className="mt-2 text-muted-foreground">
                    Led development of multiple enterprise applications using React, Node.js, and PostgreSQL. 
                    Mentored junior developers and implemented CI/CD pipelines.
                  </p>
                </div>
              </div>
              <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">Freelance Developer</h3>
                  <p className="text-primary font-medium">Self-employed (2018 - 2020)</p>
                  <p className="mt-2 text-muted-foreground">
                    Built custom websites for various clients using modern web technologies. 
                    Specialized in e-commerce solutions and responsive design.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}