import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { firestore } from "@/lib/firestore";


function getGoogleCredentials(): { clientId: string; clientSecret: string } {

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter(firestore),
  secret: process.env.SECRET ? `${process.env.SECRET}` : '',
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async signIn({ user }) {
      return true
    },
    async jwt({ token, user }) {

      const userRef = firestore.collection('users').doc(token.email ?? "");
      const dbUser = await userRef.get();

      if (!dbUser.exists) {
        token.id = user!.id;
        return token;
      }

      const userData = dbUser.data();

      if (!userData) {
        throw new Error("User data not found in Firestore");
      }
      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.image,
      };
    }, async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    
  },
};
