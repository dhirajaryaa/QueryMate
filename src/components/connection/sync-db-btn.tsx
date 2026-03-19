"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

export default function SyncDatabaseBtn() {
  const [refresh, setRefresh] = useState(false);

  const handleDbRefresh = async () => {
    setRefresh(true);
    console.log("Refreshing Database");

    await new Promise((resolve) => {
      setTimeout(() => resolve("Done"), 4000);
    });
    toast.success("Database Synced")
    setRefresh(false);
  };
  return (
    <Button title="Sync DataBase" onClick={handleDbRefresh}>
      {refresh ? <RefreshCcw className="animate-spin" /> : <RefreshCcw />}
      <span className="hidden sm:block">Sync Database</span>
    </Button>
  );
}
