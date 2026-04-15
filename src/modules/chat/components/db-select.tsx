"use client";
import MongoDBIcon from "@/components/icons/mongodb";
import MySQLIcon from "@/components/icons/mysql";
import PostgresIcon from "@/components/icons/postgres";
import SqliteIcon from "@/components/icons/sqllite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useConnections } from "@/modules/connection/hooks/use-connections";

export default function DbSelect() {
  const [dbId, setDbId] = useState<string>("");

  const { connections, isLoading } = useConnections();

  //* load from localstorage */
  useEffect(() => {
    const selectedDb = localStorage.getItem("querymate_selected_db");
    if (selectedDb) {
      setDbId(selectedDb);
    }
  }, []);

  const databaseIcons = {
    pg: PostgresIcon,
    mysql: MySQLIcon,
    sqlite: SqliteIcon,
    mongodb: MongoDBIcon,
  };

  //? handle change
  const handleChange = (id: string) => {
    if (!id) return;
    setDbId(id);
    localStorage.setItem("querymate_selected_db", id);
  };

  return (
    <Select value={dbId} onValueChange={handleChange}>
      <SelectTrigger size="sm" className="rounded-lg text-muted-foreground">
        <SelectValue
          placeholder={isLoading ? "Loading databases..." : "Select Database"}
        />
      </SelectTrigger>
      <SelectContent>
        {!isLoading && connections?.length > 0 ? (
          connections?.map((conn) => {
            const Icon = databaseIcons[conn.type];
            return (
              <SelectItem key={conn.id} value={conn.id} className="capitalize">
                {Icon && <Icon className="size-4" />}
                {conn.name}
              </SelectItem>
            );
          })
        ) : (
          <SelectItem value="none" disabled>
            No DB Connections
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
