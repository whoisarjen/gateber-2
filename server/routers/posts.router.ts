import { createPostSchema } from "@/schemas/posts.schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { db } from "../db";
import { z } from "zod";

export const postsRouter = router({
    create: protectedProcedure
        .input(createPostSchema)
        .mutation(async ({ ctx, input }) => {
            // const { isCreateLimit } = await api.post.verifyDailyCreateLimit.query()

            // if (isCreateLimit) {
            //     throw new Error("Daily create limit reached");
            // }

            return await db.post.create({
                data: {
                    ...input,
                    user: { connect: { id: ctx.session.user.id } },
                },
            })
        }),

//   update: protectedProcedure
//     .input(updatePostSchema)
//     .mutation(async ({ ctx, input: { id, ...data } }) => {
//       return await db.post.update({
//         where: {
//           id,
//           userId: ctx.session.user.id,
//         },
//         data,
//       });
//     }),

//     getEditPost: protectedProcedure
//       .input(z.object({ id: z.number().min(1) }))
//       .query(async ({ ctx, input: { id } }) => {
//       return await db.post.findFirstOrThrow({
//         orderBy: { createdAt: "desc" },
//         where: {
//           id,
//           userId: ctx.session.user.id,
//         },
//       });
//   }),

//   getPost: publicProcedure
//     .input(z.object({
//       id: z.number().min(1),
//       isPublic: z.boolean().optional().default(true),
//       numberOfRelatedPosts: z.number().optional().default(3),
//     }))
//     .query(async ({ ctx, input: { id, isPublic, numberOfRelatedPosts } }) => {
//       const post = await db.post.findFirstOrThrow({
//         orderBy: { createdAt: "desc" },
//         include: {
//           user: {
//             select: {
//               id: true,
//               name: true,
//               image: true,
//             }
//           },
//         },
//         where: {
//           OR: [
//             {
//               id,
//               isPublic,
//             },
//             {
//               id,
//               userId: ctx.session?.user.id,
//             },
//           ]
//         },
//       });

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

//   getPostsByUserId: publicProcedure
//     .input(z.object({
//       userId: z.string(),
//       isPublicOnly: z.boolean().optional().default(true),
//       page: z.number().min(1).optional().default(1),
//       take: z.number().min(1).max(10).optional().default(10),
//     }))
//     .query(async ({ ctx, input: { take, page, userId, isPublicOnly } }) => {
//       const where = {
//           ...(isPublicOnly ? { isPublic: true } : {}),
//           userId,
//         }

//       const [posts, total] = await db.$transaction([
//         db.post.findMany({
//           where,
//           orderBy: { createdAt: "desc" },
//           include: {
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//               }
//             },
//           },
//           take,
//           skip: take * (page - 1),
//         }),
//         db.post.count({ where }),
//       ])

//       return {
//         posts,
//         page,
//         take,
//         pageCount: Math.ceil(total / take),
//         total,
//       }
//     }),

    getPosts: publicProcedure
      .input(z.object({
        page: z.union([z.string(), z.number()]).pipe(z.coerce.number()).optional().default(1),
        take: z.number().min(1).max(10).optional().default(10),
        isOnlyPublic: z.boolean().optional().default(true),
        userId: z.string().optional(),
      }))
      .query(async ({ input: { take, page, isOnlyPublic, userId } }) => {
        const where = {
            ...(isOnlyPublic ? { isPublic: true } : {}),
            ...(userId ? { userId } : {}),
        }
  console.log({ page })
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
            skip: take * (page - 1),
          }),
          db.post.count({ where }),
        ])
  
        return {
          posts,
          page,
          take,
          pageCount: Math.ceil(total / take),
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
