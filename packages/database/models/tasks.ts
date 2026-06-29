import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { taskStatusEnum, taskPriorityEnum } from "./enums";

import { projects } from "./projects";
import { featureRequests } from "./feature-requests";
import { prds } from "./prds";
import { user } from "./auth-schema";

export const tasks = pgTable("tasks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),

  featureRequestId: text("feature_request_id").references(() => featureRequests.id, {
    onDelete: "cascade",
  }),

  prdId: text("prd_id").references(() => prds.id, {
    onDelete: "cascade",
  }),

  title: text("title").notNull(),

  description: text("description"),

  status: taskStatusEnum("status").default("backlog").notNull(),

  priority: taskPriorityEnum("priority").default("medium").notNull(),

  assignedTo: text("assigned_to").references(() => user.id, {
    onDelete: "set null",
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
