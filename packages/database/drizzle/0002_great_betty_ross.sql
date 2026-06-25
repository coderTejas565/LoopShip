CREATE TYPE "public"."feature_request_source" AS ENUM('manual', 'email', 'support_ticket', 'call');--> statement-breakpoint
CREATE TYPE "public"."feature_request_status" AS ENUM('draft', 'clarification_needed', 'approved', 'rejected', 'prd_generated');--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_created_by_user_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_repository" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "default_branch" text DEFAULT 'main';--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;