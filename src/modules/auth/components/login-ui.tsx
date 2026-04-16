import { Separator } from "@/components/ui/separator";
import { DatabaseSearch } from "lucide-react";
import Link from "next/link";
import GoogleLoginBtn from "./google-btn";
import GithubLoginBtn from "./github-btn";

function LoginUI() {
  return (
    <div className="max-w-6xl mx-auto w-full flex items-center gap-12 justify-center">
      {/* left side  */}
      <section className="space-y-4 w-1/2 hidden md:block">
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
            Query Any Database in
            <br />
            Plain Natural Language.
            <br />
            Instantly.
          </h1>
          <p className="text-base leading-relaxed max-w-sm text-muted-foreground">
            Supercharge your team to get data faster with the most advanced AI
            database query assistant.
          </p>
        </div>
      </section>
      {/* right side  */}
      <section className="space-y-4 w-full sm:w-2/3 md:w-1/2 text-center md:text-left">
        {/* Auth block */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-1.5">Welcome Back</h2>
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
      </section>
    </div>
  );
}

export default LoginUI;
