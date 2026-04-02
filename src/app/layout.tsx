import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark.css"; //? for markdown
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Script from "next/script";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "QueryMate - Chat With DB",
  description:
    "QueryMate is a full-stack SaaS application that allows users to query their databases using natural language. It converts user questions into code using AI, executes queries safely, and displays results with visualization. This project is built with separate frontend and backend architecture to simulate real-world production systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        dmSans.variable,
      )}
    >
      <head>
        {/* Umami script */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
