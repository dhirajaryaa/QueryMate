import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";

import { Database } from "lucide-react";

export default function EmptyConnection() {
    return (
        <Empty className="max-w-md mx-auto">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Database className="size-10" />
                </EmptyMedia>
                <EmptyTitle>
                    No database connections yet
                </EmptyTitle>
                <EmptyDescription className="space-y-2">
                    <span>
                        Connect your database to start querying your data with AI.
                        QueryMate lets you explore schemas, run queries, and chat instantly.
                    </span>
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <p className="text-sm text-muted-foreground">
                    Supports PostgreSQL • MySQL • MongoDB • SQLite
                </p>
            </EmptyContent>
        </Empty>
    );
}