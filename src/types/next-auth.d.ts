/**
 * NextAuth Type Extensions
 * 
 * Extends the default NextAuth types to include custom fields.
 */

import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Extend the User type to include our custom fields
   */
  interface User extends DefaultUser {
    id: string;
  }

  /**
   * Extend the Session type to include user ID
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the JWT type to include user ID
   */
  interface JWT extends DefaultJWT {
    id?: string;
  }
}
