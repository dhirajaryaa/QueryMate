CREATE TYPE "public"."type" AS ENUM('pg', 'mysql', 'sqlite', 'mongodb');--> statement-breakpoint
CREATE TABLE "connection" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"uri" text,
	"user_id" text NOT NULL,
	"type" "type" DEFAULT 'pg',
	"status" text DEFAULT 'pending',
	"ssl" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "connection" ADD CONSTRAINT "connection_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "connection_idx" ON "connection" USING btree ("id");