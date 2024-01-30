import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

import { siteConfig } from "@/config/site"
import MagicLinkEmail from "@/emails/magic-link-email"
import { env } from "@/env.mjs"
import { db } from "@/server/db"
import { Resend } from 'resend';

// TODO reuse tRPC
const resend = new Resend(env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            name: true,
            emailVerified: true,
          },
        });

        const userVerified = user?.emailVerified ? true : false;
        const authSubject = userVerified ? `Sign-in link for ${siteConfig.name}` : "Activate your account";

        try {
          const result = await resend.emails.send({
            from: 'Gateber App <onboarding@resend.dev>',
            to: process.env.NODE_ENV === "development" ? 'delivered@resend.dev' : identifier,
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name as string,
              actionUrl: url,
              mailType: userVerified ? "login" : "register",
              siteName: siteConfig.name
            }),
            // Set this to prevent Gmail from threading emails.
            // More info: https://resend.com/changelog/custom-email-headers
            headers: {
              'X-Entity-Ref-ID': new Date().getTime() + "",
            },
          });

        } catch (error) {
          throw new Error("Failed to send verification email.")
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session, user }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        picture: dbUser.image,
        ...dbUser,
      }
    },
  },
  // debug: process.env.NODE_ENV !== "production"
}
