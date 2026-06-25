CREATE TABLE "feature_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"source" "feature_request_source" DEFAULT 'manual' NOT NULL,
	"status" "feature_request_status" DEFAULT 'draft' NOT NULL,
	"requested_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prds" (
	"id" text PRIMARY KEY NOT NULL,
	"feature_request_id" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"problem_statement" text NOT NULL,
	"goals" text NOT NULL,
	"non_goals" text NOT NULL,
	"user_stories" text NOT NULL,
	"acceptance_criteria" text NOT NULL,
	"edge_cases" text NOT NULL,
	"success_metrics" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feature_requests" ADD CONSTRAINT "feature_requests_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feature_requests" ADD CONSTRAINT "feature_requests_requested_by_user_id_fk" FOREIGN KEY ("requested_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prds" ADD CONSTRAINT "prds_feature_request_id_feature_requests_id_fk" FOREIGN KEY ("feature_request_id") REFERENCES "public"."feature_requests"("id") ON DELETE cascade ON UPDATE no action;