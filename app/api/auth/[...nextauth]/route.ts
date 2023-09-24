import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Admins from "@/app/models/Admins";
import bcryptjs from "bcryptjs";

const options: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@mail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (!email || !password) return null;

                const Admin = await Admins.findOne({ email });

                if (!Admin) return null;

                const isValid = await bcryptjs.compare(
                    password,
                    Admin.password
                );

                if (!isValid) return null;

                return Admin;
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },

    callbacks: {
        async jwt({ token, user }) {
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            session.user.name = session?.user?.email?.split("@")[0] ?? "";

            return session;
        },
    },

    pages: {
        signIn: "/login",
        signOut: "/",
        error: "/login",
    },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
