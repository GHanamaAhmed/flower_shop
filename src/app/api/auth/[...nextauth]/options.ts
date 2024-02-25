import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
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
};
