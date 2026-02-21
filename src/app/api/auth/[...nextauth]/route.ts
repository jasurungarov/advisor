/**
 * NextAuth API Route Handler
 * 
 * This file exports the Next.js route handlers for NextAuth.js.
 * It handles all authentication-related API requests at /api/auth/*.
 */

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
