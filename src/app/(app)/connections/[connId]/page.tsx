import { getConnectionAction } from "@/actions/connection";
import SectionLayout from "@/components/common/section-layout";
import ConnectionDangerZone from "@/components/connection/connection-dangerzone";
import ConnectionEdit from "@/components/connection/connection-edit";
import SyncDatabaseBtn from "@/components/connection/sync-db-btn";
import { handlePageError } from "@/utils/handle-errors";

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
        <ConnectionEdit connection={res.data}/>
        {/* view schema  */}
        <section className="bg-muted w-full h-full">
f
        </section>
        {/* danger zone  */}
        <ConnectionDangerZone />
      </SectionLayout>
    </>
  );
}
