"use client";

import { buttonVariants } from "@/components/ui/button";
import { DatabaseSearch } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="#"
      className={buttonVariants({ variant: "ghost", className: "text-xl" })}
    >
      <DatabaseSearch className="size-5" /> QueryMate
    </Link>
  );
}
