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
    const selectedDb = localStorage.getItem("querymate_selected_db");
    if (selectedDb) {
      setDbId(selectedDb);
    } else {
      //? if no db selected, set first db as selected
      if (connections.length > 0) {
        setDbId(connections[0].id);
        localStorage.setItem("querymate_selected_db", connections[0].id);
      }
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
        size="sm"
        className="rounded-lg text-muted-foreground text-sm"
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
            const Icon = databaseIcons[conn.type];
            return (
              <SelectItem key={conn.id} value={conn.id}>
                {Icon && <Icon className="size-4" />}
                {conn.name}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
}
