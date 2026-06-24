import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { projectStatusEnum } from "./enums";
import { user } from "./auth-schema";
import { organizations } from "./organizations";

export const projects = pgTable(
  "projects",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    name: text("name").notNull(),

    slug: text("slug").notNull(),

    description: text("description"),

    status: projectStatusEnum("status")
      .default("active")
      .notNull(),

    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, {
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
  },
  (table) => ({
    organizationProjectSlugUnique: unique().on(
      table.organizationId,
      table.slug
    ),
  })
);