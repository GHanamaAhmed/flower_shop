import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { transporter } from "@/lib/mail";
import EmailProvider from "next-auth/providers/email";
import { Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client/extension";
// const customAdapter: Adapter = (p: PrismaClient) => {
//   return {
//     ...PrismaAdapter(db),
//   };
// };
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          id: profile.id.toString(),
          image: profile.avatar_url,
          name: profile.name || profile.login,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
        host: "smtp.gmail.com",
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
  logger: {
    error: console.error,
    warn: console.warn,
    info: console.log,
    debug: console.log,
  },
  debug: true,
};
