"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { handleClientError } from "@/utils/handle-errors";
import { connectionSchemaRefreshAction } from "@/actions/connection";
import { useParams } from "next/navigation";

export default function SyncDatabaseBtn() {
  const [refresh, setRefresh] = useState(false);
  const { connId } = useParams();

  const handleDbRefresh = async () => {
    console.log("Refreshing Database");
    setRefresh(true);
    try {
      const res = await connectionSchemaRefreshAction(connId as string);
      if (!res.success) {
        return handleClientError(res.error);
      };
      toast.success("Database Synced");
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
