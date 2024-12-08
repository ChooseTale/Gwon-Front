import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { login } from "@choosetale/nestia-type/lib/functional/user/index";
import { cookies } from "next/headers";

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
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: account?.access_token,
            type: "google",
          }),
        }
      );

      const setCookieHeader = res.headers.get("set-cookie");
      const connectSid = setCookieHeader
        ?.split(";")[0]
        .replace("connect.sid=", "");
      if (connectSid) {
        const cookieStore = await cookies();
        cookieStore.set("connect.sid", connectSid);
        cookieStore.set("loggedIn", "true");
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
