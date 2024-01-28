import { createPostSchema, updatePostSchema } from "@/schemas/posts.schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { db } from "../db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const postsRouter = router({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
        // const { isCreateLimit } = await api.post.verifyDailyCreateLimit.query()

        // if (isCreateLimit) {
        //     throw new Error("Daily create limit reached");
        // }

        const createdPost = await db.post.create({
            data: {
                ...input,
                user: { connect: { id: ctx.session.user.id } },
            },
        })

        revalidatePath('/dashboard/posts')
        return createdPost
    }),

  update: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      const updatedPost = await db.post.update({
        where: {
          id,
          userId: ctx.session.user.id,
        },
        data,
      });

      revalidatePath('/dashboard/posts')
      revalidatePath('/dashboard/posts/[postSlug]')
      // TODO we also have to revalidatePath to blog/post/postSlug
      return updatedPost
    }),

  delete: protectedProcedure
    .input(updatePostSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
        const deletePost = await db.post.delete({
            where: {
              ...input,
              userId:  ctx.session.user.id,
            },
        })

        revalidatePath('/dashboard/posts')
        revalidatePath('/dashboard/posts/[postSlug]')
        // TODO we also have to revalidatePath to blog/post/postSlug
        return deletePost
    }),

  getPost: publicProcedure
    .input(z.object({
      id: z.union([z.string(), z.number()]).pipe(z.coerce.number()),
      isOnlyPublic: z.boolean().optional().default(true),
      isRequiredPermission: z.boolean().optional().default(false),
    }))
    .query(async ({ input: { id, isOnlyPublic } }) => {
      return await db.post.findFirstOrThrow({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              twitter: true,
            }
          },
        },
        where: {
          id,
          ...(isOnlyPublic ? { isPublic: true } : {}),
          // ...(isRequiredPermission ? { userId: } : {}) TODO turn it ON
        },
      })
    }),

//     const relatedPosts = await db.post.findMany({
//       orderBy: { createdAt: "desc" },
//       include: {
//         user: {
//           select: {
//             id: true,
//             name: true,
//             image: true,
//           }
//         },
//       },
//       where: {
//         userId: post.user.id,
//         isPublic,
//         NOT: {
//           id,
//         }
//       },
//       take: numberOfRelatedPosts,
//     })

//     return {
//       post,
//       relatedPosts,
//     }
//   }),

    getPosts: publicProcedure
      .input(z.object({
        page: z.union([z.string(), z.number()]).pipe(z.coerce.number()).optional().default(1),
        take: z.number().min(1).max(10).optional().default(10),
        isOnlyPublic: z.boolean().optional().default(true),
        isIgnoreTakeLimit: z.boolean().optional().default(false),
        userId: z.string().optional(),
      }))
      .query(async ({ input: { take: takeRaw, isIgnoreTakeLimit, page, isOnlyPublic, userId } }) => {
        const take = isIgnoreTakeLimit ? undefined : takeRaw
        const where = {
            ...(isOnlyPublic ? { isPublic: true } : {}),
            ...(userId ? { userId } : {}),
        }

        const [posts, total] = await db.$transaction([
          db.post.findMany({
            where,
            orderBy: { updatedAt: "desc" },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                }
              },
            },
            take,
            skip: (take ?? 1) * (page - 1),
          }),
          db.post.count({ where }),
        ])
  
        return {
          posts,
          page,
          take,
          pageCount: Math.ceil(total / (take ?? 1)),
          total,
        }
      }),

    // verifyDailyCreateLimit: protectedProcedure
    //     .query(async ({ ctx }) => {
    //     const currentDate = new Date();
    //     const yesterday = new Date();
    //     yesterday.setDate(currentDate.getDate() - 1);
    //     yesterday.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());

    //     const posts = await db.post.findMany({
    //         orderBy: { createdAt: "desc" },
    //         where: {
    //         userId: ctx.session.user.id,
    //         createdAt: {
    //             gt: yesterday,
    //         }
    //         },
    //     })

    //     const postsCount = posts.length

    //     return {
    //         postsCount,
    //         earliestPostCreatedAt: posts.at(-1)?.createdAt,
    //         isCreateLimit: postsCount >= env.LIMIT_CREATE_POSTS_PER_DAY,
    //     }
    // }),
})
