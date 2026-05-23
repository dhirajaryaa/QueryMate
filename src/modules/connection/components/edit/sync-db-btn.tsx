"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { handleClientError } from "@/utils/handle-errors";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { connectionSchemaRefresh } from "@/modules/connection/actions/schema-refresh";

export default function SyncDatabaseBtn() {
  const [refresh, setRefresh] = useState(false);
  const { connId }: { connId: string } = useParams();
  const router = useRouter();

  const handleDbRefresh = async () => {
    setRefresh(true);
    try {
      const res = await connectionSchemaRefresh(connId);
      if (!res.success) {
        return handleClientError(res.error);
      }
      toast.success("Database Synced");
      router.refresh();
    } catch (error) {
      return handleClientError(error);
    } finally {
      setRefresh(false);
    }
  };
  return (
    <Button title="Sync DataBase" onClick={handleDbRefresh}>
      {refresh ? <RefreshCcw className="animate-spin" /> : <RefreshCcw />}
      <span className="hidden sm:block">Sync Database</span>
    </Button>
  );
}
