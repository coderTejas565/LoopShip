import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { organizationRoleEnum } from "./enums";
import { user } from "./auth-schema";
import { organizations } from "./organizations";

export const memberships = pgTable(
  "memberships",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    role: organizationRoleEnum("role")
      .default("member")
      .notNull(),

    joinedAt: timestamp("joined_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    organizationUserUnique: unique().on(
      table.organizationId,
      table.userId
    ),
  })
);