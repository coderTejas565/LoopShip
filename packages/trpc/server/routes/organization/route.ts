import { TRPCError } from "@trpc/server";

import { eq, desc, organizations, memberships } from "@repo/database";

import { protectedProcedure, router } from "../../trpc";

import {
  createOrganizationInput,
  createOrganizationOutput,
  getCurrentOrganizationOutput,
  getOrganizationsOutput,
} from "./model";

export const organizationRouter = router({
  createOrganization: protectedProcedure
    .input(createOrganizationInput)
    .output(createOrganizationOutput)
    .mutation(async ({ ctx, input }) => {
      const slug = input.slug.trim().toLowerCase();

      const existingOrganization = await ctx.db
        .select({
          id: organizations.id,
        })
        .from(organizations)
        .where(eq(organizations.slug, slug))
        .limit(1);

      if (existingOrganization.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Organization slug already exists",
        });
      }

      const organizationId = await ctx.db.transaction(async (tx) => {
        const organizationResult = await tx
          .insert(organizations)
          .values({
            name: input.name.trim(),
            slug,
            ownerId: ctx.user.id,
          })
          .returning({
            id: organizations.id,
          });

        const organization = organizationResult[0];

        if (!organization) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create organization",
          });
        }

        await tx.insert(memberships).values({
          organizationId: organization.id,
          userId: ctx.user.id,
          role: "owner",
        });

        return organization.id;
      });

      return {
        id: organizationId,
      };
    }),

  getCurrentOrganization: protectedProcedure
    .output(getCurrentOrganizationOutput)
    .query(async ({ ctx }) => {
      const result = await ctx.db
        .select({
          id: organizations.id,
          name: organizations.name,
          slug: organizations.slug,
          imageUrl: organizations.imageUrl,
          plan: organizations.plan,
          role: memberships.role,
        })
        .from(memberships)
        .innerJoin(organizations, eq(memberships.organizationId, organizations.id))
        .where(eq(memberships.userId, ctx.user.id))
        .orderBy(desc(organizations.createdAt))
        .limit(1);

      return result[0] ?? null;
    }),

  getMyOrganizations: protectedProcedure.output(getOrganizationsOutput).query(async ({ ctx }) => {
    const results = await ctx.db
      .select({
        id: organizations.id,
        name: organizations.name,
        slug: organizations.slug,
        imageUrl: organizations.imageUrl,
        plan: organizations.plan,
        role: memberships.role,
      })
      .from(memberships)
      .innerJoin(organizations, eq(memberships.organizationId, organizations.id))
      .where(eq(memberships.userId, ctx.user.id))
      .orderBy(desc(organizations.createdAt));

    return results;
  }),
});
