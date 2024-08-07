import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { Adapter } from "next-auth/adapters";
import { UserRoles } from "@/types/users";
import { User } from "@prisma/client";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role:
            profile.email?.toLowerCase() === "ghanamaahmed@gmail.com"
              ? UserRoles.admin
              : UserRoles.user,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role:
            profile.email?.toLowerCase() === "ghanamaahmed@gmail.com"
              ? UserRoles.admin
              : UserRoles.user,
        };
      },
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
    async session({ session, user }) {
      session.user.id = (user as User).id;
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
