import {
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { featureRequests } from "./feature-requests";

export const prds = pgTable("prds", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  featureRequestId: text("feature_request_id")
    .notNull()
    .references(() => featureRequests.id, {
      onDelete: "cascade",
    }),

  version: integer("version")
    .default(1)
    .notNull(),

  problemStatement: text(
    "problem_statement",
  ).notNull(),

  goals: text("goals").notNull(),

  nonGoals: text("non_goals").notNull(),

  userStories: text("user_stories").notNull(),

  acceptanceCriteria: text(
    "acceptance_criteria",
  ).notNull(),

  edgeCases: text("edge_cases").notNull(),

  successMetrics: text(
    "success_metrics",
  ).notNull(),

  status: text("status")
    .default("draft")
    .notNull(),

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