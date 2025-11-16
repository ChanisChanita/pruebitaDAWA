import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  incrementAttempts,
  resetAttempts,
} from "@/lib/users";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await findUserByEmail(credentials!.email);

        if (!user) {
          throw new Error("Usuario no existe");
        }

        if (user.attempts >= 3) {
          throw new Error("Cuenta bloqueada por intentos fallidos");
        }

        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!match) {
          await incrementAttempts(credentials!.email);
          throw new Error("Contraseña incorrecta");
        }

        await resetAttempts(credentials!.email);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
