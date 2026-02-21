CREATE TYPE "public"."provider" AS ENUM('google', 'github', 'email', 'link');--> statement-breakpoint
CREATE TABLE "auth" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"provider" "provider" DEFAULT 'email',
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "auth_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_id" uuid,
	"refresh_token" text NOT NULL,
	"device" text DEFAULT 'browser',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_auth_id_auth_id_fk" FOREIGN KEY ("auth_id") REFERENCES "public"."auth"("id") ON DELETE no action ON UPDATE no action;