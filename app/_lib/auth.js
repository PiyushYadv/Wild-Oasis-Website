import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch (error) {
        console.log("ERROR", error);
        return false;
      }
    },
    async session({ session, token }) {
      const guest = await getGuest(session.user.email);
      session.user.id = guest.id;
      return session;
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     guestId: guest.id,
      //   },
      // };
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
