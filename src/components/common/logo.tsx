import { DatabaseSearch } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/dashboard"}>
            <div className="flex items-center h-12 text-primary px-4 gap-3 w-[90%] mx-auto mt-4">
                < DatabaseSearch className="size-7" />
                <span className="text-xl font-bold">QueryMate</span>
            </div>
        </Link>
    );
}