import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectDb from "./db";
import User from "../model/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;
                
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                
                await connectDb();
                
                const user = await User.findOne({ email });
                
                if (!user) {
                    throw new Error("No user found with this email");
                }
                
                if (user.provider !== "credentials" && !user.password) {
                     throw new Error(`Please log in with ${user.provider}`);
                }
                
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Incorrect password");
                }
                
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    await connectDb();
                    let existUser = await User.findOne({ email: user.email });
                    
                    if (!existUser) {
                        existUser = await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            provider: account.provider,
                            emailVerified: true
                        });
                    }
                    
                    user.id = existUser._id.toString();
                    user.role = existUser.role;
                    return true;
                } catch {
                    return false;
                }
            }
            return true;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                token.role = user.role || 'user';
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
        error: '/login',
        newUser: '/register'
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.NEXT_AUTH_SECRET
};

export default authOptions;