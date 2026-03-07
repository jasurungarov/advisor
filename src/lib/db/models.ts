/**
 * User Model Types
 * 
 * Type definitions for user-related data structures.
 */

import { ObjectId } from 'mongodb';
import { Recommendation } from '../expert-system/types';

/**
 * User document structure in MongoDB
 */
export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string; // Hashed with bcrypt
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  username: string; // unique username for profile URL
}

/**
 * User document without sensitive fields (for client-side)
 */
export interface SafeUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
}

/**
 * Assessment document structure in MongoDB
 */
export interface Assessment {
  _id?: ObjectId;
  userId: ObjectId;
  answers: Record<string, string | string[] | number>;
  recommendations: Recommendation[];
  createdAt: Date;
}

/**
 * Assessment with populated user data (for display)
 */
export interface AssessmentWithUser extends Assessment {
  user?: SafeUser;
}

/**
 * Registration input data
 */
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Login input data
 */
export interface LoginInput {
  email: string;
  password: string;
}
