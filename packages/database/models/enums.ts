import { pgEnum } from "drizzle-orm/pg-core";

export const organizationRoleEnum = pgEnum("organization_role", ["owner", "admin", "member"]);

export const projectStatusEnum = pgEnum("project_status", ["active", "archived"]);

export const organizationPlanEnum = pgEnum("organization_plan", ["free", "pro"]);

export const featureRequestStatusEnum = pgEnum("feature_request_status", [
  "draft",
  "clarification_needed",
  "approved",
  "rejected",
  "prd_generated",
]);

export const featureRequestSourceEnum = pgEnum("feature_request_source", [
  "manual",
  "email",
  "support_ticket",
  "call",
]);

export const prdStatusEnum = pgEnum("prd_status", ["draft", "generated", "approved", "archived"]);

export const taskStatusEnum = pgEnum("task_status", ["backlog", "in_progress", "review", "done"]);

export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high", "critical"]);
