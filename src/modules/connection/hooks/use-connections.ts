"use client";

import { useEffect, useState } from "react";
import { Connection } from "@/modules/connection/types/connection.types";
import { connectionList } from "@/modules/connection/actions/connection-list";
import { handleClientError } from "@/utils/handle-errors";

export function useConnections() {
  const [connections, setConnections] = useState<
    Pick<Connection, "id" | "type" | "name">[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await connectionList();

        if (!res.success) {
          handleClientError(res.error);
          return;
        }

        setConnections(res.data ?? []);
      } catch (error) {
        handleClientError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, []);

  return { connections, isLoading };
}
