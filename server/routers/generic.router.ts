import { publicProcedure, router } from "../trpc";
import { contactFormSchema } from "@/schemas/generic.schema";
import { env } from '@/env.mjs';
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_API_KEY);

export const genericRouter = router({
    contact: publicProcedure
        .input(contactFormSchema)
        .mutation(async ({ input }) => {
            const data = await resend.emails.send({
                from: env.ADMIN_EMAIL, // TODO add domain email
                to: [env.ADMIN_EMAIL],
                subject: `${input.email} - ${input.subject}`,
                react: input.message,
            });

            return Response.json(data);
        }),
})
