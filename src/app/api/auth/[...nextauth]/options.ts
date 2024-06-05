import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { transporter } from "@/lib/mail";
import EmailProvider from "next-auth/providers/email";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: {
    //       label: "email",
    //       placeholder: "email",
    //     },
    //     password: {
    //       label: "password",
    //       placeholder: "password",
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const user = await db.user.findUnique({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });
    //     if (!user) return null;
    //     if (user.password != credentials?.password) return null;
    //     return user;
    //   },
    // }),
    EmailProvider({
      server: {
        host: "gmail",
        auth: {
          user: process.env.USER_NODE_MAILER,
          pass: process.env.PASS_NODE_MAILER,
        },
      },
      from: process.env.USER_NODE_MAILER,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token?.id as string;
      return session;
    },
    redirect(params) {
      return params.baseUrl;
    },
  },
};
