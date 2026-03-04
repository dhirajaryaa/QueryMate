import { DatabaseSearch } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/new"}>
            <div className="flex items-center py-2 text-primary gap-3 w-[90%] px-4">
                < DatabaseSearch className="size-5" />
                <span className="text-xl font-semibold">QueryMate</span>
            </div>
        </Link>
    );
}