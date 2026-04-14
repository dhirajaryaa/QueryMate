"use client";
import GithubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { handleClientError } from "@/utils/handle-errors";
import { useState } from "react";
import { authClient } from "@/modules/auth/lib/auth-client";

function GithubLoginBtn() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/new",
      });
    } catch (error) {
      return handleClientError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size={"lg"}
      className="w-full h-10 sm:h-12 text-base font-medium"
      onClick={handleGithubLogin}
      variant={"default"}
      disabled={loading}
    >
      <GithubIcon className="size-5 invert dark:invert-0" />
      {loading ? "Signing in..." : "Github"}
    </Button>
  );
}

export default GithubLoginBtn;
