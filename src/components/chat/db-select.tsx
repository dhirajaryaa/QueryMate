"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConnections } from "@/hooks/use-connections";
import { Loader2 } from "lucide-react";
import PostgresIcon from "../icons/postgres";
import MySQLIcon from "../icons/mysql";
import SqliteIcon from "../icons/sqllite";
import MongoDBIcon from "../icons/mongodb";
import { useEffect, useState } from "react";

export default function DbSelect() {
  const { connections, loading } = useConnections();
  const [dbId, setDbId] = useState<string>("");

  // load from localstorage
  useEffect(() => {
    const id = localStorage.getItem("querymate_selected_db");
    id && setDbId(id);
  }, []);

  const databaseIcons = {
    pg: PostgresIcon,
    mysql: MySQLIcon,
    sqlite: SqliteIcon,
    mongodb: MongoDBIcon,
  };

  // handle change
  const handleChange = (id: string) => {
    setDbId(id);
    localStorage.setItem("querymate_selected_db", id);
  };

  return (
    <Select value={dbId} onValueChange={handleChange}>
      <SelectTrigger
        size="sm"
        className="rounded-xl text-muted-foreground ml-1"
      >
        {loading && <Loader2 className="animate-spin text-primary" />}
        <SelectValue placeholder="Select Database" />
      </SelectTrigger>
      <SelectContent>
        {connections?.map((conn) => {
          const Icon = databaseIcons[conn.type];
          return (
            <SelectItem key={conn.id} value={conn.id} className="capitalize">
              {Icon && <Icon className="size-4" />}
              {conn.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
