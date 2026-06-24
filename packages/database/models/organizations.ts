import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizationPlanEnum } from "./enums";
import { user } from "./auth-schema";

export const organizations = pgTable("organizations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: text("name").notNull(),

  slug: text("slug").notNull().unique(),

  imageUrl: text("image_url"),

  plan: organizationPlanEnum("plan")
    .default("free")
    .notNull(),

  ownerId: text("owner_id")
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