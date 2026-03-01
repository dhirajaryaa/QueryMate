'use client';
import SectionLayout from "@/components/common/section-layout";
import StatusCard from "@/components/common/status-card";
import { ConnectionModel } from "@/components/connection/connection-model";
import { CheckIcon, Info, Layers, RefreshCw } from "lucide-react";

export default function ConnectionsPage() {

    return (
        <>
            <SectionLayout title="Database Connections" description="Securely manage and monitor all your connected data sources in one place."
                actionUI={<ConnectionModel />}
            >
                <div className=" w-full h-fit">
                    {/* status cards for connections (active, pending, failed)  */}
                    <section className="flex flex-wrap items-center  gap-4">
                        <StatusCard title="Active"
                            icon={CheckIcon}
                            value={10}
                            iconClassName="bg-green-200 text-green-600"
                        />
                        <StatusCard title="Issues"
                            icon={Info}
                            value={7}
                            iconClassName="bg-orange-200 text-orange-600"
                        />
                        <StatusCard title="Syncing"
                            icon={RefreshCw}
                            value={2}
                            iconClassName="bg-blue-200 text-blue-600"
                        />
                        <StatusCard title="Total"
                            icon={Layers}
                            value={12}
                            iconClassName="bg-gray-200 text-gray-600"
                        />
                    </section>
                    {/* table for connections */}
                    <section className="w-full h-full bg-secondary rounded-xl mt-4">
                       
                    </section>
                </div>
            </SectionLayout>
        </>
    )
};