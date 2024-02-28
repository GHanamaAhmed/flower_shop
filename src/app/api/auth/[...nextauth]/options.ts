import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: "d3cde04da0e432268a18",
      clientSecret: "6e77fa77c461cc77a883589124993dfed499e500",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "username",
          placeholder: "username",
        },
        password: {
          label: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await db.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });
        if (!user) return null;
        if (user.password != credentials?.password) return null;
        return user;
      },
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