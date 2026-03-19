import { getConnectionAction } from "@/actions/connection";
import SectionLayout from "@/components/common/section-layout";
import ConnectionEdit from "@/components/connection/connection-edit";
import SyncDatabaseBtn from "@/components/connection/sync-db-btn";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GetDbSchema } from "@/lib/db/schema";
import { handlePageError } from "@/utils/handle-errors";
import { Edit } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ConnectionPage({
  params,
}: {
  params: Promise<{ connId: string }>;
}) {
  const { connId } = await params;

  // const res = await GetDbSchema(connId);
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
        <ConnectionEdit connection={res.data}/>
        {/* view schema  */}
        <section className="bg-muted w-full h-full">
f
        </section>
      </SectionLayout>
    </>
  );
}
