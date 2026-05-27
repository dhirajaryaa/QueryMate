"use client";

import { Toggle } from "@/components/ui/toggle";
import { DBType } from "@/modules/connection/types/connection.types";
import PostgresIcon from "@/components/icons/postgres";
import MySQLIcon from "@/components/icons/mysql";
import MongoDBIcon from "@/components/icons/mongodb";

type DBProps = {
  value: DBType;
  onChange: (value: DBType) => void;
};

export default function DBTypeSelect({ value, onChange }: DBProps) {
  const databases = [
    { id: "postgres", label: "PostgreSQL", icon: PostgresIcon, value: "pg" },
    { id: "mysql", label: "MySQL", icon: MySQLIcon, value: "mysql" },
    { id: "mongodb", label: "MongoDB", icon: MongoDBIcon, value: "mongodb" },
  ] as const;

  return (
    <>
      <div className="flex items-center justify-center gap-2 overflow-hidden p-1">
        {databases.map((db) => {
          const isSelected = value?.toLowerCase() === db.value?.toLowerCase();

          return (
            <Toggle
              key={db.id}
              asChild
              pressed={isSelected}
              onPressedChange={() => onChange(db.value)}
            >
              <button
                className={` flex flex-col h-auto
                font-semibold w-full 
                rounded-md px-3 py-2 ring-1 ring-transparent hover:ring-primary/50 focus-visible:ring-primary/50 hover:grayscale-75
                text-xs sm:text-sm my-1 transition-colors border border-muted
                ${isSelected ? "border-primary border-2 text-primary grayscale-0 " : "text-muted-foreground/80 grayscale-100"}
              `}
              >
                <db.icon className="size-7" />
                {db.label}
              </button>
            </Toggle>
          );
        })}
      </div>
    </>
  );
}
