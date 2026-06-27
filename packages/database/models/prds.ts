import { integer, pgTable, jsonb, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./auth-schema";

import { featureRequests } from "./feature-requests";
import { prdStatusEnum } from "./enums";

export const prds = pgTable("prds", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  featureRequestId: text("feature_request_id")
    .notNull()
    .references(() => featureRequests.id, {
      onDelete: "cascade",
    }),

  version: integer("version").default(1).notNull(),

  problemStatement: text("problem_statement").notNull(),

  goals: jsonb("goals").notNull(),

  nonGoals: jsonb("non_goals").notNull(),

  userStories: jsonb("user_stories").notNull(),

  acceptanceCriteria: jsonb("acceptance_criteria").notNull(),

  edgeCases: jsonb("edge_cases").notNull(),

  successMetrics: jsonb("success_metrics").notNull(),

  status: prdStatusEnum("status").default("draft").notNull(),

  lastEditedBy: text("last_edited_by").references(() => user.id, {
    onDelete: "set null",
  }),

  approvedBy: text("approved_by").references(() => user.id, {
    onDelete: "set null",
  }),

  approvedAt: timestamp("approved_at", {
    withTimezone: true,
  }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
