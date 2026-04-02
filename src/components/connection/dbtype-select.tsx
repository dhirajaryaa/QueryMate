"use client";
import { DBType } from "@/types/connection.types";
import MongoDBIcon from "../icons/mongodb";
import MySQLIcon from "../icons/mysql";
import PostgresIcon from "../icons/postgres";
import SqliteIcon from "../icons/sqllite";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";

type DBProps = {
  value: DBType;
  onChange: (value: DBType) => void;
};

export default function DBTypeSelect({ value, onChange }: DBProps) {
  const databases = [
    { id: "postgres", label: "PostgreSQL", icon: PostgresIcon, value: "pg" },
    { id: "mysql", label: "MySQL", icon: MySQLIcon, value: "mysql" },
    { id: "sqlite", label: "SQLite", icon: SqliteIcon, value: "sqlite" },
    { id: "mongodb", label: "MongoDB", icon: MongoDBIcon, value: "mongodb" },
  ] as const;

  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 overflow-hidden">
        {databases.map((db) => {
          const isSelected = value?.toLowerCase() === db.value?.toLowerCase();

          return (
            <Toggle
              key={db.id}
              asChild
              pressed={isSelected}
              onPressedChange={() => onChange(db.value)}
            >
              <Button
                variant="outline"
                className={` flex flex-col h-auto
                font-semibold text-muted-foreground w-25 max-w-25 
                border-2  border-border
                text-xs sm:text-sm
                ${isSelected ? "border-primary border-2 text-primary" : ""}
              `}
              >
                <db.icon className="size-7" />
                {db.label}
              </Button>
            </Toggle>
          );
        })}
      </div>
    </>
  );
}
