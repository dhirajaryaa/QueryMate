import {
  getConnectionAction,
  getConnectionSchemaAction,
} from "@/actions/connection";
import SectionLayout from "@/components/common/section-layout";
import ConnectionDangerZone from "@/components/connection/connection-dangerzone";
import ConnectionEdit from "@/components/connection/connection-edit";
import ConnectionSchemaFlow from "@/components/connection/connection-schema-flow";
import SyncDatabaseBtn from "@/components/connection/sync-db-btn";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Connection } from "@/types/connection.types";
import { handlePageError } from "@/utils/handle-errors";
import { Table } from "lucide-react";
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
    <section className="w-full h-full rounded-lg border shadow">
      {res.data ? (
        <ConnectionSchemaFlow schema={res.data} />
      ) : (
        <>
          <Empty className="h-full bg-muted/30">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Table />
              </EmptyMedia>
              <EmptyTitle>No Schema</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                You&apos;re all caught up. New notifications will appear here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <SyncDatabaseBtn />
            </EmptyContent>
          </Empty>
        </>
      )}
    </section>
  );
}
