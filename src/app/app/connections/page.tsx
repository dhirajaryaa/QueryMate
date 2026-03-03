import { getConnectionAction } from "@/actions/connection";
import SectionLayout from "@/components/common/section-layout";
import StatusCard from "@/components/common/status-card";
import { ConnectionModel } from "@/components/connection/connection-model";
import ListAllConnection from "@/components/connection/list-connection";
import { CheckIcon, CircleDotDashed, Hourglass, Info, Layers, RefreshCw } from "lucide-react";
import { Suspense } from "react";

export default async function ConnectionsPage() {
    // fetch connections 
    const connections = await getConnectionAction();

    return (
        <>
            <SectionLayout title="Database Connections" description="Securely manage and monitor all your connected data sources in one place."
                actionUI={<ConnectionModel />}
            >
                <div className=" w-full h-fit">
                    <Suspense>
                        {/* status cards for connections (active, pending, error)  */}
                        <section className="flex flex-wrap items-center  gap-4">
                            <StatusCard title="Active"
                                icon={CheckIcon}
                                value={connections.stats?.active}
                                iconClassName="bg-green-200 text-green-700"
                            />
                            <StatusCard title="Pending"
                                icon={Hourglass}
                                value={connections.stats?.pending}
                                iconClassName="bg-yellow-200 text-yellow-700"
                            />
                            <StatusCard title="Issues"
                                icon={Info}
                                value={connections.stats?.issus}
                                iconClassName="bg-red-100 text-red-700"
                            />
                            <StatusCard title="Total"
                                icon={Layers}
                                value={connections.stats?.total}
                                iconClassName="bg-gray-200 text-gray-600"
                            />
                        </section>
                        {/* table for connections */}
                        <section className="w-full h-full rounded-xl mt-4">
                            <div className="w-full flex flex-col gap-3">
                                {/* Heading */}
                                <div className="flex justify-between items-center">
                                    <h2 className="text-sm sm:text-lg font-semibold text-muted-foreground">
                                        Connections
                                    </h2>
                                </div>
                                {/* List connection */}
                                <ListAllConnection connections={connections.data} />
                            </div>
                        </section>
                    </Suspense>
                </div>
            </SectionLayout>
        </>
    )
};