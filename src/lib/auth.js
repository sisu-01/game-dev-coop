import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { handleLogin } from "@/lib/action";

export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
  // id, secret 정보는 env에서 알아서 읽는듯.
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const result = await handleLogin(user);
      return result;
    },
  }
})