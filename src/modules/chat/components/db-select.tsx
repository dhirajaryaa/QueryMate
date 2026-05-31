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
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DbSelect() {
  const [dbId, setDbId] = useState<string>("");

  const { connections, isLoading } = useConnections();

  //* load from localstorage */
  useEffect(() => {

    if (connections.length === 0) return; //? if no connections, do nothing

    const selectedDb = localStorage.getItem("querymate_selected_db");

    const exists = connections.some((conn) => conn.id === selectedDb);

    if (selectedDb && exists) {
      setDbId(selectedDb);
      return;
    }

    const firstId = connections[0].id;

    setDbId(firstId);
    localStorage.setItem(
      "querymate_selected_db",
      firstId
    );
  }, [connections]);

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

  // ✅ empty state
  if (!isLoading && connections.length === 0) {
    return (
      <Button
        asChild
        variant="secondary"
        className="border"
        size="sm"
        title="Add New Connection"
      >
        <Link href="/connections">
          <ArrowUpRight className="mr-1" />
          Create Connection
        </Link>
      </Button>
    );
  }

  return (
    <Select value={dbId} onValueChange={handleChange}>
      <SelectTrigger
        title="Select Database"
        size="sm"
        className="rounded-lg text-muted-foreground text-sm max-w-50 truncate"
      >
        <SelectValue
          placeholder={isLoading ? "Loading databases..." : "Select Database"}
        />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <SelectItem value="loading" disabled>
            Loading databases...
          </SelectItem>
        ) : (
          connections.map((conn) => {
            const Icon = databaseIcons[conn.type as keyof typeof databaseIcons];
            return (
              <SelectItem key={conn.id} value={conn.id} title={conn.name}>
                {Icon && <Icon className="size-4" />}
                <span className="max-w-46 truncate">{conn.name}</span>
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
}
