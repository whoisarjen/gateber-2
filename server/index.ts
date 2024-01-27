import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
    getTodos: publicProcedure
        .query(async () => {
            return [1, 2, 3]
        }),

    addTodo: protectedProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            return { result: [] }
        })
});

export type AppRouter = typeof appRouter
