import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DatabaseSearch } from "lucide-react";
import { ThemeToggler } from "@/components/common/theme-toggler";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-primary/20 dark:from-black">

      {/* Navbar */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-6 px-4">
        <h2 className="text-xl font-bold text-primary flex items-center justify-center gap-1.5"> <DatabaseSearch />QueryMate</h2>

        <div className="flex items-center gap-4">
          <ThemeToggler />
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant={"secondary"}>Signup</Button>
          </Link>
        </div>
      </header>


      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 mt-20">

        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6">
          Query Database with
          <span className="block text-foreground">Natural Language</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          Connect your database and get insights instantly.
          No SQL knowledge required.
        </p>

        <div className="flex gap-4">
          <Link href="/login">
            <Button className="px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>

          <Link href="/demo">
            <Button variant="outline" className="px-8 py-6 text-lg">
              Live Demo
            </Button>
          </Link>
        </div>

      </section>


      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground mt-32 pb-6">
        © 2026
        <a href={process.env.NEXT_PUBLIC_APP_URL} target="_blank" rel="noopener noreferrer" className="underline ml-1">
          QueryMate
        </a>
        . All rights reserved.
      </footer>

    </main>
  );
}