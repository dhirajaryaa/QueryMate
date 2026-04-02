"use client";

import { Field, FieldSeparator } from "../ui/field";
import { Button } from "../ui/button";
import GoogleIcon from "../icons/google";
import { useState } from "react";
import { handleClientError } from "@/utils/handle-errors";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function GoogleLoginBtn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/new",
      });
      // console.log(data);
    } catch (error) {
      return handleClientError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <FieldSeparator className="bg-muted">Or</FieldSeparator>
      <Field className="w-full">
        <Button variant="outline" type="button" onClick={handleGoogleLogin}>
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Continue with Google
        </Button>
      </Field>
    </>
  );
}
