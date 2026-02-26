CREATE TYPE "public"."plan" AS ENUM('free', 'pro');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(80) NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"avatar_url" text DEFAULT '',
	"role" "role" DEFAULT 'user',
	"plan" "plan" DEFAULT 'free',
	"email_verified" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"update_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
