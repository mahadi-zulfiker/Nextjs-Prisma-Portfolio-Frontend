/* ===== app/about/page.tsx ===== */
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <section className="prose max-w-none">
          <p>
            Hi, I&apos;m [Your Name], a full-stack developer passionate about building web applications.
          </p>
          <h2>Skills</h2>
          <ul>
            <li>Next.js</li>
            <li>Express.js</li>
            <li>Prisma</li>
            <li>Tailwind CSS</li>
            {/* Add more */}
          </ul>
          <h2>Work Experience</h2>
          <p>
            [Describe your experience]
          </p>
          <h2>Contact</h2>
          <p>Email: [your@email.com]</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}