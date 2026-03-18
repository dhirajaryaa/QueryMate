import SectionLayout from "@/components/common/section-layout";
import SyncDatabaseBtn from "@/components/connection/sync-db-btn";
import { GetDbSchema } from "@/lib/db/schema";

export default async function ConnectionPage({
  params,
}: {
  params: Promise<{ connId: string }>;
}) {
  const { connId } = await params;

  const res = await GetDbSchema(connId);
  console.log(res);

  return (
    <>
      <SectionLayout
        title="Connections"
        description="Securely manage and monitor all your connected data sources in one place."
        actionUI={<SyncDatabaseBtn/>}
      >
        <div>connection page</div>
      </SectionLayout>
    </>
  );
}
