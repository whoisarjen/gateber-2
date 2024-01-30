import { z } from "zod";

export const contactFormSchema = z.object({
    subject: z
        .string()
        .min(3, {
            message: 'Tytuł musi mieć co najmniej 3 litery',
        })
        .max(500, {
            message: 'Tytuł musi być krótsza niż 50 liter',
        }),
    email: z.string().email({
        message: 'Email nie jest poprawny',
    }),
    message: z
        .string()
        .min(20, {
            message: 'Wiadomość musi mieć co najmniej 20 liter',
        })
        .max(500, {
            message: 'Wiadomość musi być krótsza niż 500 liter',
        }),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
