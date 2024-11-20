import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Log the profile to inspect its structure
      console.log("signIn callback: ", { user, account, profile });

      // For GitHub, use profile.id, for Google use profile.sub
      let id;
      if (account.provider === "github") {
        id = profile?.id; // GitHub profile ID
      } else if (account.provider === "google") {
        id = profile?.sub; // Google profile ID
      }

      const { name, email, image } = user;

      if (!id) {
        console.error("Profile ID is missing");
        return false; // Deny sign-in if the ID is missing
      }

      const existingUser = await client.fetch(AUTHOR_ID_QUERY, { id });
      if (!existingUser) {
        // Create new user
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: profile?.login || profile?.name,
          email,
          image: image || profile?.avatar_url || profile?.picture,
        });
      }

      return true; // Sign-in is successful
    },
  },

  async jwt({ token, account, profile }) {
    if (account && profile) {
      const user = await client.fetch(AUTHOR_ID_QUERY, { id: profile?.id });
      token.id = user?._id;
    }
    return token;
  },

  async session({ session, token }) {
    Object.assign(session, { id: token.id });
    return session;
  },
});
