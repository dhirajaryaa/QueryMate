'use client';
import { authClient } from "@/lib/auth-client";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LogoutBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
    setLoading(false);
  };

  return (
    <DropdownMenuItem variant="destructive" onClick={handleLogout}>
    {loading ? <Loader2 className="animate-spin" />:<LogOut />}  
      Log out
    </DropdownMenuItem>
  );
}

