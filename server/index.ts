import { router } from "./trpc";
import { postsRouter } from "./routers/posts.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
    posts: postsRouter,
});

export type AppRouter = typeof appRouter
