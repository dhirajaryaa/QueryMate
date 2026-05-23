import { Suspense } from "react";
import { Table } from "lucide-react";
import { handlePageError } from "@/utils/handle-errors";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getConnection } from "@/modules/connection/actions/get-connection";
import SectionLayout from "@/components/common/section-layout";
import SyncDatabaseBtn from "@/modules/connection/components/edit/sync-db-btn";
import ConnectionEdit from "@/modules/connection/components/edit/connection-edit";
import ConnectionDangerZone from "@/modules/connection/components/edit/connection-danger-zone";
import { Connection } from "@/modules/connection/types/connection.types";
import { getConnectionSchema } from "@/modules/connection/actions/connection-schema";
import ConnectionSchemaFlow from "@/modules/connection/components/edit/connection-schema-flow";

export default async function ConnectionPage({
  params,
}: {
  params: Promise<{ connId: string }>;
}) {
  const { connId } = await params;

  const res = await getConnection(connId);
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
  const res = await getConnectionSchema(connection.id);

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
              {/* sync database btn  */}
              <SyncDatabaseBtn />
            </EmptyContent>
          </Empty>
        </>
      )}
    </section>
  );
}
