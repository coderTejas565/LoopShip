import { pgEnum } from "drizzle-orm/pg-core";

export const organizationRoleEnum = pgEnum("organization_role", [
  "owner",
  "admin",
  "member",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "archived",
]);

export const organizationPlanEnum = pgEnum("organization_plan", [
  "free",
  "pro",
]);