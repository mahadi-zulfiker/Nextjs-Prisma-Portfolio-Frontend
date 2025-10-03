
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Who I Am</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Hi, I&apos;m John Doe, a full-stack developer with over 5 years of experience in building scalable web applications. Passionate about creating user-centric solutions using modern technologies.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Next.js & React</li>
                <li>Express.js & Node.js</li>
                <li>Prisma ORM & PostgreSQL</li>
                <li>Tailwind CSS & Shadcn/UI</li>
                <li>TypeScript & JavaScript</li>
                <li>AWS & Deployment</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Senior Developer at TechCorp (2020 - Present): Led development of multiple enterprise applications.<br />
                Freelance Developer (2018 - 2020): Built custom websites for various clients.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Email: john.doe@example.com</p>
              <p className="text-lg">LinkedIn: linkedin.com/in/johndoe</p>
              <p className="text-lg">GitHub: github.com/johndoe</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}