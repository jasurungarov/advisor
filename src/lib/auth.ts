/**
 * NextAuth.js Configuration (v5)
 * - Credentials (email/password)
 * - MongoDB
 * - bcrypt password check
 * - JWT sessions
 * - i18n-safe (NO hardcoded /login pages)
 */

import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import type { User } from '@/lib/db/models'
import { COLLECTIONS, getDatabase } from '@/lib/db/mongodb'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // 🔒 HARD VALIDATION (TypeScript + runtime)
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        // 🔌 DB
        const db = await getDatabase();
        const usersCollection = db.collection<User>(COLLECTIONS.USERS);

        const user = await usersCollection.findOne({
          email: email.toLowerCase(),
        });

        if (!user) {
          throw new Error('User not found');
        }

        // 🔐 PASSWORD CHECK
        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        // ✅ RETURN SAFE USER OBJECT
        return {
          id: user._id!.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
  ],

  // 🧠 JWT SESSION
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ❌ IMPORTANT: pages O‘CHIRILDI (i18n muammosi bo‘lmasligi uchun)
  // Redirect har doim client tomonda qilinadi

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
});
