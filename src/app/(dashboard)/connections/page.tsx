import SectionLayout from "@/components/common/section-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const actionButton = () => {
    return (
        <Link href="/connections/new">
            <Button>
                <Plus className="mr-2" size={16} />
                Add New Connection
            </Button>
        </Link>
    )
}

export default function ConnectionsPage() {
    return (
        <>
            <SectionLayout title="Database Connections" description="Securely manage and monitor all your connected data sources in one place."
                actionUI={
                    <Link href="/connections/new">
                        <Button>
                            <Plus className="mr-2" size={16} />
                            Add New Connection
                        </Button>
                    </Link>
                }
            >
                <div className="w-full h-full">
                    Connections
                </div>
            </SectionLayout>
        </>
    )
};