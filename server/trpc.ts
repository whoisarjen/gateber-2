import { authOptions } from "@/lib/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth/next"

const t = initTRPC.create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
        ctx: {
            // infers the `session` as non-nullable
            session,
        },
    });
});
