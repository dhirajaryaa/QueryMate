import { Connection } from "@/modules/connection/types/connection.types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import PostgresIcon from "@/components/icons/postgres";
import MySQLIcon from "@/components/icons/mysql";
import SqliteIcon from "@/components/icons/sqllite";
import MongoDBIcon from "@/components/icons/mongodb";
import StatusBadge from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function ConnectionCard({
  connection,
}: {
  connection: Connection;
}) {
  const databaseIcons = {
    pg: PostgresIcon,
    mysql: MySQLIcon,
    sqlite: SqliteIcon,
    mongodb: MongoDBIcon,
  } as const;

  const Icon = databaseIcons[connection.type];
  return (
    <Item
      variant="outline"
      className="w-full px-4 py-3 flex items-center bg-muted/60"
    >
      {/* Icon */}
      <ItemMedia>{Icon && <Icon className="size-5" />}</ItemMedia>
      {/* Name + Last Updated */}
      <ItemContent className="flex-1">
        <ItemTitle>{connection.name}</ItemTitle>
        <ItemDescription>
          Last updated{" "}
          {connection.updatedAt
            ? new Date(connection.updatedAt).toLocaleDateString()
            : "Never"}
        </ItemDescription>
      </ItemContent>
      {/* Status */}
      <div className="w-25">
        <StatusBadge status={connection.status} />
      </div>
      {/* Manage */}
      <ItemActions>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/connections/${connection.id}`}>
            <Settings className="size-4 mr-1" />
            Manage
          </Link>
        </Button>
      </ItemActions>
    </Item>
  );
}
