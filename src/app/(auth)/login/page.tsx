import { Separator } from "@/components/ui/separator";
import GithubLoginBtn from "@/modules/auth/components/github-btn";
import GoogleLoginBtn from "@/modules/auth/components/google-btn";
import { ensureGuest } from "@/modules/auth/utils/auth-utils";
import { DatabaseSearch } from "lucide-react";
import Link from "next/link";

export default async function LoginPage() {
  await ensureGuest(); // make sure user not login

  return (
    <main className="flex h-dvh w-full items-center justify-center p-6">
      <section className="max-w-5xl mx-auto w-full flex items-center gap-12 justify-center">
        {/* left side  */}
        <div className="space-y-4 w-1/2 hidden md:block">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="size-8 rounded-full bg-accent shadow flex items-center justify-center p-2">
              <DatabaseSearch />
            </div>
            <span className="text-lg font-semibold">QueryMate</span>
          </div>

          {/* Hero */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight -tracking-wider mb-5 max-w-xl">
              Talk to Your Database.
              <br />
              <span className="text-brand">
              Get Answers Instantly.
              </span>
            </h1>
            <p className="text-base leading-relaxed max-w-sm text-muted-foreground">
              Supercharge your team to get data faster with the most advanced AI
              database query assistant.
            </p>
          </div>
        </div>
        {/* right side  */}
        <div className="space-y-4 w-full sm:w-2/3 md:w-1/2 text-center md:text-left">
          {/* Auth block */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-1.5">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Login using the following providers:
          </p>

          <div className="space-y-3">
            {/* GitHub */}
            <GithubLoginBtn />

            {/* Google */}
            <GoogleLoginBtn />
          </div>

          {/* footer  */}
          <div className="mt-8 space-y-4">
            <Separator className="h-4" />
            <p className="text-sm text-muted-foreground text-center m-0">
              <Link
                href="#"
                className="text-muted-foreground no-underline hover:text-foreground"
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-muted-foreground no-underline hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
