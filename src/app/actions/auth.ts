/**
 * Authentication Server Actions
 * 
 * Server-side actions for user registration and authentication.
 * These actions handle secure operations like password hashing.
 */

'use server';

import { signIn, signOut } from '@/lib/auth'
import type { User } from '@/lib/db/models'
import { COLLECTIONS, getDatabase } from '@/lib/db/mongodb'
import { hash } from 'bcryptjs'
import { AuthError } from 'next-auth'
import { z } from 'zod'

// =============================================================================
// VALIDATION SCHEMAS
// =============================================================================

const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// =============================================================================
// TYPES
// =============================================================================

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// =============================================================================
// REGISTER ACTION (Minimal, SSL/ENOTFOUND muammosiz)
// =============================================================================


export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<ActionResult> {
  try {
    // Validate input
    const validationResult = RegisterSchema.safeParse(formData);

    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validationResult.data;

    // Get database connection (default database from mongodb.ts)
    const db = await getDatabase();
    const usersCollection = db.collection<User>(COLLECTIONS.USERS);

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists',
        errors: { email: ['This email is already registered'] },
      };
    }

    // Hash password with bcrypt (12 rounds)
    const hashedPassword = await hash(password, 12);

    // Insert new user (image is optional on User model, omitted here)
    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await usersCollection.insertOne(newUser as User);

    return {
      success: true,
      message: 'Account created successfully! Please log in.',
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

// =============================================================================
// LOGIN ACTION
// =============================================================================

/**
 * Log in an existing user.
 * 
 * @param formData - Login form data
 * @returns ActionResult with success status and message
 */
export async function loginUser(formData: {
  email: string;
  password: string;
}): Promise<ActionResult> {
  try {
    // Validate input
    const validationResult = LoginSchema.safeParse(formData);
    
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validationResult.data;

    // Attempt to sign in with NextAuth credentials provider
    // NOTE: NextAuth v5 with redirect:false still resolves normally on success.
    // It throws AuthError subtypes on failure.
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: 'Logged in successfully!',
    };

  } catch (error) {
    // NextAuth v5 throws NEXT_REDIRECT as a special non-Error object when a
    // redirect is triggered server-side. Re-throw it so Next.js can handle it.
    if (
      error != null &&
      typeof error === 'object' &&
      'digest' in error &&
      typeof (error as { digest: unknown }).digest === 'string' &&
      (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error;
    }

    // Handle specific NextAuth auth errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid email or password.',
          };
        default:
          return {
            success: false,
            message: 'Authentication failed. Please try again.',
          };
      }
    }

    console.error('Unexpected login error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

// =============================================================================
// LOGOUT ACTION
// =============================================================================

/**
 * Log out the current user.
 */
export async function logoutUser(): Promise<void> {
  await signOut({ redirect: true, redirectTo: '/' });
}

// =============================================================================
// GET CURRENT USER
// =============================================================================

/**
 * Get the currently authenticated user.
 */
export async function getCurrentUser() {
  const { auth } = await import('@/lib/auth');
  const session = await auth();
  return session?.user || null;
}
