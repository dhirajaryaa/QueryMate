ALTER TABLE "chat" DROP CONSTRAINT "chat_connection_id_connection_id_fk";
--> statement-breakpoint
ALTER TABLE "connection" ALTER COLUMN "uri" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "chat" ADD CONSTRAINT "chat_connection_id_connection_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."connection"("id") ON DELETE cascade ON UPDATE no action;