import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { login } from "@choosetale/nestia-type/lib/functional/user/index";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + login.METADATA.path,
        {
          method: "POST",
          body: JSON.stringify({
            token: account?.id_token,
            type: "google",
          }),
        }
      );

      console.log(res.json());
      return true;
    },
    // async jwt({ token, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
