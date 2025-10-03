import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  const skills = [
    { category: "Frontend", items: ["Next.js & React", "TypeScript & JavaScript", "Tailwind CSS & Shadcn/UI"] },
    { category: "Backend", items: ["Express.js & Node.js", "Prisma ORM & PostgreSQL"] },
    { category: "Tools", items: ["Git & GitHub", "AWS & Deployment", "Figma & Design"] }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate full-stack developer with expertise in modern web technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-card rounded-xl lg:col-span-2 animate-slideIn">
            <CardHeader>
              <CardTitle className="text-2xl">Who I Am</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <p className="text-lg mb-4">
                  Hi, I&apos;m John Doe, a full-stack developer with over 5 years of experience in building scalable web applications. 
                  I&apos;m passionate about creating user-centric solutions using modern technologies.
                </p>
                <p className="text-lg">
                  My approach combines technical expertise with creative problem-solving to deliver exceptional digital experiences. 
                  I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card rounded-xl animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-2xl">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Get in Touch</h3>
                  <p className="text-muted-foreground mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Email:</span>
                    <span>john.doe@example.com</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">LinkedIn:</span>
                    <Link href="https://linkedin.com/in/johndoe" className="text-primary hover:underline">
                      linkedin.com/in/johndoe
                    </Link>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">GitHub:</span>
                    <Link href="https://github.com/johndoe" className="text-primary hover:underline">
                      github.com/johndoe
                    </Link>
                  </p>
                </div>
                <Button asChild className="w-full rounded-full mt-4">
                  <Link href="mailto:john.doe@example.com">Send Email</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skills.map((skillGroup, index) => (
            <Card key={skillGroup.category} className="shadow-card rounded-xl animate-slideIn" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardHeader>
                <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="shadow-card rounded-xl mb-16 animate-fadeIn">
          <CardHeader>
            <CardTitle className="text-2xl">Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold">Senior Developer</h3>
                <p className="text-primary">TechCorp (2020 - Present)</p>
                <p className="mt-2 text-muted-foreground">
                  Led development of multiple enterprise applications using React, Node.js, and PostgreSQL. 
                  Mentored junior developers and implemented CI/CD pipelines.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold">Freelance Developer</h3>
                <p className="text-primary">Self-employed (2018 - 2020)</p>
                <p className="mt-2 text-muted-foreground">
                  Built custom websites for various clients using modern web technologies. 
                  Specialized in e-commerce solutions and responsive design.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}