"use client";

import { useEffect, useState } from "react";
import { connectionsListAction } from "@/actions/connection";
import { Connection } from "@/types/connection.types";

export function useConnections() {
  const [connections, setConnections] = useState<
    Pick<Connection, "id" | "type" | "name">[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConnections() {
      const res = await connectionsListAction();

      if (res.success) {
        setConnections(res.data!);
      }

      setLoading(false);
    }

    fetchConnections();
  }, []);

  return { connections, loading };
}
