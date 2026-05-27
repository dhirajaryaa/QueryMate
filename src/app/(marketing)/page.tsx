import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronRight,
  DatabaseSearch,
  Sparkles,
} from "lucide-react";
import { ThemeToggler } from "@/components/common/theme-toggler";
import { StarsBackground } from "@/components/home/star-background";
import { PreviewWindow } from "@/components/home/preview-window";
import { Badge } from "@/components/ui/badge";
import Feature from "@/components/home/Feature";
import HowItWork from "@/components/home/how-it-work";
import { AuthRedirectPath } from "@/lib/constant";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen relative">
      {/* header  */}
      <header className="w-full z-50 px-4 py-4 fixed inset-x-0 top-0 bg-background/5 backdrop-blur-md mask-b-from-80%">
        <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-between">
          {/* logo  */}
          <Link href={"/"} className="flex gap-2 items-center">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-background">
              <DatabaseSearch className="size-4" />
            </div>
            <div className="text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-br from-foreground via-muted-foreground to-foreground">
              QueryMate
            </div>
          </Link>
          {/* theme toggle + action btn  */}
          <div className="flex gap-2 items-center">
            <ThemeToggler variant="ghost" />
            <Button className="px-4" size={"sm"} asChild>
              <Link href={"/login"}>Sign In</Link>
            </Button>
          </div>
        </div>
      </header>
      {/* star background  */}
      <StarsBackground />
      {/* main page  */}
      <main className="w-full relative py-10 md:py-14 max-w-5xl mx-auto">
        {/* hero section */}
        <section className="w-full pt-32 pb-16 px-6 relative">
          <div className="w-full flex items-center justify-center">
            {/* badge  */}
            <Badge className=" uppercase bg-green-100 border-green-500 tracking-widest text-green-600 font-semibold px-3 py-1 mb-4 border-2 shadow-md hover:shadow-lg shadow-green-400/20 md:[&>svg]:size-3 flex items-center justify-center hover:-translate-y-0.5 cursor-pointer duration-200 transition-all text-[9px]">
              <Sparkles />
              AI-Powered Database Interface
            </Badge>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] capitalize text- font-extrabold text-foreground/80 text-center relative leading-[1.1]">
            Your database,
            <br />
            <span className="text-brand">
              finally speaks.
            </span>
          </h1>
          <p className="text-muted-foreground max-w-3xl text-sm sm:text-base mx-auto text-center pt-10">
            Stop writing complex SQL. Just ask QueryMate in plain English — it
            understands your schema,
            <br /> runs the query, and explains the results.
          </p>
          {/* action btn  */}
          <div className="flex gap-x-6 gap-y-4 py-10 items-center justify-center sm:flex-row flex-col">
            <Button
              size={"xl"}
              variant={"default"}
              className="hover:scale-99 duration-200 w-full sm:w-fit"
              asChild
            >
              <Link href={AuthRedirectPath}>
                Start For Free <ArrowRight size={16} />
              </Link>
            </Button>
            <Button
              size={"xl"}
              variant={"outline"}
              className="hover:scale-99 duration-200 w-full sm:w-fit"
              asChild
            >
              <Link href={"/demo"}>
                Watch Demo <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
        {/* preview  */}
        <section className="w-full px-1 sm:px-2 md:px-6 [permeative-1000]">
          <PreviewWindow />
        </section>

        {/* how it work  */}
        <HowItWork />

        {/* features  */}
        <Feature />
      </main>
      {/* ── FOOTER ── */}
      <footer className="relative py-4 px-6 flex items-center justify-between max-w-5xl mx-auto w-full mask-t-from-50% backdrop-blur-md">
        <div className="w-fit mx-auto text-sm text-muted-foreground tracking-wide text-center">
          <span>© {new Date().getFullYear()} QueryMate. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
