import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DatabaseSearch } from "lucide-react";
import { ThemeToggler } from "@/components/common/theme-toggler";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-primary/20 dark:from-black">

      {/* Navbar */}
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-6 px-4">
        <h2 className="text-xl font-bold text-primary flex items-center justify-center gap-1.5"> <DatabaseSearch />QueryMate</h2>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggler variant="ghost"/>
          <Link href="/login">
            <Button size={"sm"}>Login</Button>
          </Link>
        </div>
      </header>


      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 mt-8">

      <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted border shadow-lg w-full max-w-4xl mx-auto">
      <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/z9KL74Jio_s?si=OWAVubxut6XvJaQl" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </AspectRatio>

      </section>


      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground mt-8 pb-6">
        © 2026
        <a href={process.env.NEXT_PUBLIC_APP_URL} target="_blank" rel="noopener noreferrer" className="underline ml-1">
          QueryMate
        </a>
        . All rights reserved.
      </footer>

    </main>
  );
}