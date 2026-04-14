import LoginUI from "@/modules/auth/components/login-ui";
import { ensureGuest } from "@/modules/auth/utils/auth-utils";

export default async function LoginPage() {
  await ensureGuest(); // make sure user not login

  return (
    <main className="flex h-dvh w-full items-center justify-center p-6">
      <LoginUI />
    </main>
  );
}
