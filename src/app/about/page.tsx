import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, ArrowLeft, User, Code, Briefcase, Award } from "lucide-react";

export default function About() {
  const skills = [
    { category: "Frontend", items: ["Next.js & React", "TypeScript & JavaScript", "Tailwind CSS & Shadcn/UI"] },
    { category: "Backend", items: ["Express.js & Node.js", "Prisma ORM & PostgreSQL"] },
    { category: "Tools", items: ["Git & GitHub", "AWS & Deployment", "Figma & Design"] }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="rounded-full p-2 mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">About Me</h1>
        </div>
        
        <div className="text-center mb-16 animate-fadeIn">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Full-Stack Developer specializing in the MERN stack, with a strong focus on building responsive, scalable web applications. Passionate about clean code, problem-solving, and delivering seamless user experiences across the stack.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-xl rounded-2xl lg:col-span-2 animate-slideIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Who I Am</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert text-lg space-y-4">
                <p>
                  Hi, I&apos;m Mahadi Zulfiker, a full-stack developer specializing in the MERN stack. I&apos;m passionate about creating user-centric solutions using modern technologies.
                </p>
                <p>
                  My approach combines technical expertise with creative problem-solving to deliver exceptional digital experiences. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-1">2+</h3>
                    <p className="text-muted-foreground text-sm">Years Experience</p>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-1">10+</h3>
                    <p className="text-muted-foreground text-sm">Projects Completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-xl rounded-2xl animate-slideIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Contact</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground mb-4">Feel free to reach out for collaborations or just a friendly hello</p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>mahade.adib45@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-primary" />
                    <Link href="https://www.linkedin.com/in/mahadi-zulfiker/" className="text-primary hover:underline">
                      linkedin.com/in/mahadi-zulfiker
                    </Link>
                  </p>
                  <p className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-primary" />
                    <Link href="https://github.com/mahadi-zulfiker" className="text-primary hover:underline">
                      github.com/mahadi-zulfiker
                    </Link>
                  </p>
                </div>
                <Button asChild className="w-full rounded-full mt-4 hover:scale-105 transition-transform duration-300">
                  <Link href="mailto:mahade.adib45@gmail.com">Send Email</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skills.map((skillGroup, index) => (
            <Card key={skillGroup.category} className="shadow-xl rounded-2xl animate-slideIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{skillGroup.category}</CardTitle>
                </div>
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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl">Projects & Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">CRM System</h3>
                  <p className="text-primary font-medium">Role-based job portal</p>
                  <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1">
                    <li>Multi-role login system (Admin, Vendor, Employee, Client)</li>
                    <li>Job posting and candidate management dashboard</li>
                  </ul>
                  <div className="mt-2">
                    <Badge variant="secondary" className="mr-2">Next.js</Badge>
                    <Badge variant="secondary" className="mr-2">Node.js</Badge>
                    <Badge variant="secondary" className="mr-2">MongoDB</Badge>
                    <Badge variant="secondary" className="mr-2">Tailwind CSS</Badge>
                    <Badge variant="secondary">Express.js</Badge>
                  </div>
                </div>
              </div>
              
              <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">Question Management</h3>
                  <p className="text-primary font-medium">PDF question paper generator</p>
                  <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1">
                    <li>Generate MCQ, CQ, and SQ with Bangla support</li>
                    <li>Export formatted question sets as PDF</li>
                  </ul>
                  <div className="mt-2">
                    <Badge variant="secondary" className="mr-2">Next.js</Badge>
                    <Badge variant="secondary" className="mr-2">Node.js</Badge>
                    <Badge variant="secondary" className="mr-2">MongoDB</Badge>
                    <Badge variant="secondary" className="mr-2">Express.js</Badge>
                    <Badge variant="secondary">pdf-lib</Badge>
                  </div>
                </div>
              </div>
              
              <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">Expense Edge</h3>
                  <p className="text-primary font-medium">Team Project - Financial tracking platform</p>
                  <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1">
                    <li>Developed budget management with tracking, alerts, and progress bar</li>
                    <li>Built Financial Overview section for income, expenses, and growth</li>
                    <li>Built Advanced Reporting for profit/loss, balance sheets, and cash flow</li>
                  </ul>
                  <div className="mt-2">
                    <Badge variant="secondary" className="mr-2">React.js</Badge>
                    <Badge variant="secondary" className="mr-2">Node.js</Badge>
                    <Badge variant="secondary" className="mr-2">MongoDB</Badge>
                    <Badge variant="secondary" className="mr-2">Tailwind CSS</Badge>
                    <Badge variant="secondary" className="mr-2">Firebase</Badge>
                    <Badge variant="secondary">Express.js</Badge>
                  </div>
                </div>
              </div>
              
              <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">Full-Stack Developer</h3>
                  <p className="text-primary font-medium">Intelligent Machines (Oct 2020 – Jan 2021)</p>
                  <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1">
                    <li>Accurately annotated datasets for machine learning model training</li>
                    <li>Managed multiple annotation projects</li>
                  </ul>
                </div>
              </div>
              
              <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">Full-Stack Developer</h3>
                  <p className="text-primary font-medium">AMGoal (Feb 2025 – Aug 2025)</p>
                  <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1">
                    <li>I am currently working as a Full-Stack Engineer at AMGoal, my own IT company, where we specialize in developing cutting-edge software solutions, web applications, and IT services. I actively contribute to both front-end and back-end development, leveraging modern technologies to build scalable and efficient applications. At AMGoal, we are committed to delivering high-quality digital solutions tailored to client needs.</li>
                  </ul>
                </div>
              </div>
              
              <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">Full-Stack Enginner</h3>
                  <p className="text-primary font-medium">Anirix (Sep 2025 – Present)</p>
                  <ul className="mt-2 text-muted-foreground list-disc list-inside space-y-1">
                    <li>Contributing as a Full Stack Engineer Intern at Anirix, a Korean startup focused on building modern digital solutions.

Working remotely with a distributed team to develop and optimize scalable web applications.

Gaining hands-on experience in MERN/Next.js stack, API development, and collaborative Agile workflows.

Involved in feature implementation, bug fixing, and performance optimization to ensure smooth product development.

Enhancing technical and teamwork skills by collaborating across multiple projects in a startup environment.</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl rounded-2xl mb-16 animate-fadeIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl">Education</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="relative pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/20">
                <div className="relative before:absolute before:-left-[13px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-primary">
                  <h3 className="text-2xl font-semibold">BSc in Computer Science & Engineering</h3>
                  <p className="text-primary font-medium">Uttara University (2024 - Present)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl rounded-2xl mb-16 animate-fadeIn border border-border/50 hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-3xl">Non-Technical Skills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">Problem Solving</Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">Adaptability</Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">Fast Learner</Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">Creativity</Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">Initiative</Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">Work Ethic</Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">Interpersonal Skills</Badge>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}