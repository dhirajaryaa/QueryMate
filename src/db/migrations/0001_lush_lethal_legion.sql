CREATE TABLE "connection_schema" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"connection_id" uuid,
	"structure" jsonb NOT NULL,
	"relationships" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chat" ALTER COLUMN "connection_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "chat" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "chat_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "connection_schema" ADD CONSTRAINT "connection_schema_connection_id_connection_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."connection"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "connection_schemas_connection_id_uidx" ON "connection_schema" USING btree ("connection_id");