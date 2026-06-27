import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { featureRequestStatusEnum, featureRequestSourceEnum } from "./enums";

import { projects } from "./projects";
import { user } from "./auth-schema";

export const featureRequests = pgTable("feature_requests", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  description: text("description").notNull(),

  source: featureRequestSourceEnum("source").default("manual").notNull(),

  status: featureRequestStatusEnum("status").default("draft").notNull(),

  requestedBy: text("requested_by")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
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
