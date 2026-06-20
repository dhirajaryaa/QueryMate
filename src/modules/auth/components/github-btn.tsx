"use client";
import GithubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { handleClientError } from "@/utils/handle-errors";
import { useState } from "react";
import { authClient } from "@/modules/auth/lib/auth-client";
import { AuthRedirectPath } from "@/lib/constant";

function GithubLoginBtn() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleGithubLogin = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: AuthRedirectPath,
      },
      {
        onRequest: () => {
          setLoading(true);
        },

        onSuccess: () => {
          setLoading(false);
        },

        onError: (error) => {
          setLoading(false);
          handleClientError(error);
        },
      }
    );
  };

  return (
    <Button
      size={"xl"}
      className="w-full"
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
