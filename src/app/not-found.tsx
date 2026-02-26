import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="h-screen bg-linear-to-b from-white to-primary/20 dark:from-black flex flex-col items-center justify-center p-4">
      <section className="flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-6">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Button size="lg" className='flex items-center justify-center gap-2' asChild>
          <Link href="/">
            <Home /> <span>Go Back Home</span>
          </Link>
        </Button>
      </section>

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