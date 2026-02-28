import { auth } from "@/lib/auth";
import { CircleUserRound } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function UserProfile() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return (
        <Link href="/profile" >
            {session?.user?.image ?
                <><Image width={50} src={session?.user?.image} height={50} className="rounded-full size-9" alt={session?.user?.name}></Image></> :
                <><CircleUserRound className="size-8 rounded-full" />
                </>
            }
        </Link>
    );

}