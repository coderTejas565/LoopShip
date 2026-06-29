ALTER TABLE "projects" ALTER COLUMN "default_branch" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_repository_id" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_repository_owner" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_repository_name" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_installation_id" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_connected_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "github_webhook_active" boolean DEFAULT false NOT NULL;