import { getConnectionsAction } from "@/actions/connection";
import SectionLayout from "@/components/common/section-layout";
import ConnectionCard from "@/components/connection/connection-card";
import { ConnectionModel } from "@/components/connection/connection-model";
import ConnectionStats from "@/components/connection/connection-stats";
import EmptyConnection from "@/components/connection/empty-connection";
import { handlePageError } from "@/utils/handle-errors";

export default async function ConnectionsPage() {
  // fetch connections
  const res = await getConnectionsAction();

  if (!res.success) {
    handlePageError(res.error);
  }
  const { connections, stats } = res.data;

  return (
    <>
      <SectionLayout
        title="Database Connections"
        description="Securely manage and monitor all your connected data sources in one place."
        actionUI={<ConnectionModel />}
      >
        <div className=" w-full h-fit">
          {/* list all connections stats  */}
          <ConnectionStats stats={stats} />

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
              {connections.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {connections?.map((connection) => (
                    <ConnectionCard
                      connection={connection}
                      key={connection.id}
                    />
                  ))}
                </div>
              ) : (
                <EmptyConnection />
              )}
            </div>
          </section>
        </div>
      </SectionLayout>
    </>
  );
}
