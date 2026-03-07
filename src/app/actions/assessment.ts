/**
 * Assessment Server Actions
 * 
 * Server actions for saving and retrieving user assessments.
 */

'use server';

import { auth } from '@/lib/auth';
import type { Assessment } from '@/lib/db/models';
import { COLLECTIONS, getDatabase } from '@/lib/db/mongodb';
import type { Recommendation, UserAnswers } from '@/lib/expert-system/types';
import { ObjectId } from 'mongodb';

/**
 * Save an assessment result for the current user.
 * 
 * @param answers - The questionnaire answers
 * @param recommendations - The generated recommendations
 * @returns Object with success status
 */
export async function saveAssessment(
  answers: UserAnswers,
  recommendations: Recommendation[]
): Promise<{ success: boolean; assessmentId?: string; error?: string }> {
  try {
    // Get current user
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to save assessments',
      };
    }

    // Get database
    const db = await getDatabase();
    const assessmentsCollection = db.collection<Assessment>(COLLECTIONS.ASSESSMENTS);

    // Create assessment document
    const assessment: Assessment = {
      userId: new ObjectId(session.user.id),
      answers,
      recommendations,
      createdAt: new Date(),
    };

    // Insert into database
    const result = await assessmentsCollection.insertOne(assessment);

    return {
      success: true,
      assessmentId: result.insertedId.toString(),
    };

  } catch (error) {
    console.error('Error saving assessment:', error);
    return {
      success: false,
      error: 'Failed to save assessment. Please try again.',
    };
  }
}

/**
 * Get all assessments for the current user.
 * 
 * @returns Array of assessments
 */

export async function getUserAssessments(): Promise<{
  success: boolean;
  assessments?: {
    _id: string;
    userId: string;
    answers: Record<string, string | string[] | number>;
    recommendations: Recommendation[];
    createdAt: Date;
  }[];
  error?: string;
}> {
  try {
    // Get current user
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to view assessments',
      };
    }

    // Get database
    const db = await getDatabase();
    const assessmentsCollection = db.collection<Assessment>(COLLECTIONS.ASSESSMENTS);

    // Find all assessments for this user, sorted by date (newest first)
    const assessments = await assessmentsCollection
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectIds to strings for client
    const serializedAssessments = assessments.map(assessment => ({
      _id: assessment._id!.toString(),
      userId: assessment.userId.toString(),
      answers: assessment.answers,
      recommendations: assessment.recommendations,
      createdAt: assessment.createdAt,
    }));

    return {
      success: true,
      assessments: serializedAssessments,
    };

  } catch (error) {
    console.error('Error fetching assessments:', error);
    return {
      success: false,
      error: 'Failed to fetch assessments. Please try again.',
    };
  }
}

/**
 * Get a single assessment by ID.
 * 
 * @param assessmentId - The assessment ID
 * @returns The assessment or error
 */
export async function getAssessmentById(assessmentId: string): Promise<{
  success: boolean;
  assessment?: Assessment & { _id: string };
  error?: string;
}> {
  try {
    // Get current user
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to view assessments',
      };
    }

    // Validate ObjectId
    if (!ObjectId.isValid(assessmentId)) {
      return {
        success: false,
        error: 'Invalid assessment ID',
      };
    }

    // Get database
    const db = await getDatabase();
    const assessmentsCollection = db.collection<Assessment>(COLLECTIONS.ASSESSMENTS);

    // Find assessment
    const assessment = await assessmentsCollection.findOne({
      _id: new ObjectId(assessmentId),
      userId: new ObjectId(session.user.id), // Ensure user owns this assessment
    });

    if (!assessment) {
      return {
        success: false,
        error: 'Assessment not found',
      };
    }

    return {
      success: true,
      assessment: {
        ...assessment,
        _id: assessment._id!.toString(),
        userId: assessment.userId,
        createdAt: assessment.createdAt,
      } as Assessment & { _id: string },
    };

  } catch (error) {
    console.error('Error fetching assessment:', error);
    return {
      success: false,
      error: 'Failed to fetch assessment. Please try again.',
    };
  }
}

/**
 * Delete an assessment.
 * 
 * @param assessmentId - The assessment ID to delete
 * @returns Success status
 */
export async function deleteAssessment(assessmentId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Get current user
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to delete assessments',
      };
    }

    // Validate ObjectId
    if (!ObjectId.isValid(assessmentId)) {
      return {
        success: false,
        error: 'Invalid assessment ID',
      };
    }

    // Get database
    const db = await getDatabase();
    const assessmentsCollection = db.collection<Assessment>(COLLECTIONS.ASSESSMENTS);

    // Delete assessment (only if user owns it)
    const result = await assessmentsCollection.deleteOne({
      _id: new ObjectId(assessmentId),
      userId: new ObjectId(session.user.id),
    });

    if (result.deletedCount === 0) {
      return {
        success: false,
        error: 'Assessment not found or already deleted',
      };
    }

    return { success: true };

  } catch (error) {
    console.error('Error deleting assessment:', error);
    return {
      success: false,
      error: 'Failed to delete assessment. Please try again.',
    };
  }
}
