import { DatabaseSearch } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/app"}>
            <div className="flex items-center h-12 text-primary px-4 gap-3 w-[90%] mx-auto">
                < DatabaseSearch className="size-7" />
                <span className="text-xl font-bold">QueryMate</span>
            </div>
        </Link>
    );
}