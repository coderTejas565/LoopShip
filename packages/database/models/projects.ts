import { pgTable, text, timestamp, unique, boolean } from "drizzle-orm/pg-core";
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

    status: projectStatusEnum("status").default("active").notNull(),

    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    githubRepositoryId: text("github_repository_id"),

    githubRepositoryOwner: text("github_repository_owner"),

    githubRepositoryName: text("github_repository_name"),

    githubRepository: text("github_repository"),

    githubInstallationId: text("github_installation_id"),

    githubConnectedAt: timestamp("github_connected_at", {
      withTimezone: true,
    }),

    githubWebhookActive: boolean("github_webhook_active").default(false).notNull(),

    defaultBranch: text("default_branch"),

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
    organizationProjectSlugUnique: unique().on(table.organizationId, table.slug),
  }),
);
