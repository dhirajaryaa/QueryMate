import {
  getConnectionAction,
  getConnectionSchemaAction,
} from "@/actions/connection";
import SectionLayout from "@/components/common/section-layout";
import ConnectionDangerZone from "@/components/connection/connection-dangerzone";
import ConnectionEdit from "@/components/connection/connection-edit";
import ConnectionSchemaFlow from "@/components/connection/connection-schema-flow";
import SyncDatabaseBtn from "@/components/connection/sync-db-btn";
import { Skeleton } from "@/components/ui/skeleton";
import { Connection } from "@/types/connection.types";
import { handlePageError } from "@/utils/handle-errors";
import { Suspense } from "react";

export default async function ConnectionPage({
  params,
}: {
  params: Promise<{ connId: string }>;
}) {
  const { connId } = await params;

  const res = await getConnectionAction(connId);
  if (!res.success) {
    handlePageError(res.error);
  }
  return (
    <>
      <SectionLayout
        title={res.data.name}
        description="manage database connection"
        actionUI={<SyncDatabaseBtn />}
      >
        {/* edit form  */}
        <ConnectionEdit connection={res.data} />
        {/* view schema  */}
        <Suspense
          fallback={
            <Skeleton className="w-full h-full border bg-muted rounded-lg" />
          }
        >
          <ConnectionSchemaVisualizer connection={res.data} />
        </Suspense>
        {/* danger zone  */}
        <ConnectionDangerZone />
      </SectionLayout>
    </>
  );
}

//! connection schema viewer [using react flow]
export async function ConnectionSchemaVisualizer({
  connection,
}: {
  connection: Connection;
}) {
  const res = await getConnectionSchemaAction(connection.id);
  if (!res.success) {
    return handlePageError(res.error);
  }
  return (
    <section className="w-full h-full rounded-lg border-2 shadow">
      <ConnectionSchemaFlow schema={res.data} />
    </section>
  );
}
