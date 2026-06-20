import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { ThemeProvider } from "@/components/provider/theme-provider";
// @ts-ignore
import "./globals.css";
import { SiteUrl } from "@/lib/constant";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "QueryMate - Chat With DB",
    template: "%s | QueryMate",
  },
  description:
    "QueryMate is a full-stack SaaS application that allows users to query their databases using natural language. It converts user questions into code using AI, executes queries safely, and displays results with visualization.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SiteUrl,
    siteName: "QueryMate",
    title: "QueryMate - Chat With DB",
    description:
      "QueryMate lets you query your database using natural language. Just ask in plain English — it understands your schema, runs the query, and explains the results.",
    images: [
      {
        url: `${SiteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "QueryMate - Chat With DB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QueryMate - Chat With DB",
    description:
      "QueryMate lets you query your database using natural language. Just ask in plain English — it understands your schema, runs the query, and explains the results.",
    images: [`${SiteUrl}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
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
