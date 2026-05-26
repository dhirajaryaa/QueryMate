"use client";
import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { handleClientError } from "@/utils/handle-errors";
import { useState } from "react";
import { authClient } from "@/modules/auth/lib/auth-client";

function GoogleLoginBtn() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/new",
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
      onClick={handleGoogleLogin}
      variant={"outline"}
      disabled={loading}
    >
      <GoogleIcon className="size-5" />
      {loading ? "Signing in..." : "Google"}
    </Button>
  );
}

export default GoogleLoginBtn;
