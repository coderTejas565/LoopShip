ALTER TABLE "prds" ADD COLUMN "last_edited_by" text;--> statement-breakpoint
ALTER TABLE "prds" ADD COLUMN "approved_by" text;--> statement-breakpoint
ALTER TABLE "prds" ADD CONSTRAINT "prds_last_edited_by_user_id_fk" FOREIGN KEY ("last_edited_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prds" ADD CONSTRAINT "prds_approved_by_user_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;