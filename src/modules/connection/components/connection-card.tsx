import { ConnectionMinified } from "@/modules/connection/types/connection.types";
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
import MongoDBIcon from "@/components/icons/mongodb";
import { formatDate } from "@/modules/connection/utils/formatDate";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function ConnectionCard({
  connection,
}: {
  connection: ConnectionMinified;
}) {
  const databaseIcons = {
    pg: PostgresIcon,
    mysql: MySQLIcon,
    mongodb: MongoDBIcon,
  } as const;

  const Icon = databaseIcons[connection.type];
  return (
    <Item
      variant="outline" asChild className={"transition-all duration-200 cursor-pointer shadow-sm gap-2 rounded-lg"}>
      <Link href={`/connections/${connection.id}`}>
        {/* Icon */}
        <ItemMedia variant={"image"} >{Icon && <Icon className="size-7" />}</ItemMedia>
        {/* Name + Last Updated */}
        <ItemContent>
          <ItemTitle className="line-clamp-1">{connection.name}</ItemTitle>
          <ItemDescription className="text-xs sm:text-sm">
            Last updated -
            {connection.updatedAt
              ? formatDate(connection.updatedAt)
              : "Never"}
          </ItemDescription>
        </ItemContent>
        {/* Manage */}
        <ItemActions>
          <Settings className="size-4" />
          <span className="sr-only">Manage Connection</span>
        </ItemActions>
      </Link>
    </Item>
  );
}
