/**
 * Recommendation Server Action
 * 
 * This is the main entry point for processing questionnaire responses
 * and generating course/specialization recommendations.
 * 
 * Server Actions allow us to run server-side code directly from
 * React components without creating separate API routes.
 * 
 * Flow:
 * 1. Receive user answers from questionnaire form
 * 2. Validate input with Zod
 * 3. Run inference engine to evaluate rules
 * 4. Generate explanations for top recommendations
 * 5. Return structured result
 */

'use server';

import { InferenceEngine } from '@/lib/expert-system/engine'
import { ExplanationGenerator } from '@/lib/expert-system/explainer'
import {
  Recommendation,
  RecommendationResult,
  UserAnswers,
} from '@/lib/expert-system/types'
import { UserAnswersSchema } from '@/lib/schemas/questionnaire'

/**
 * Main recommendation server action.
 * Processes questionnaire answers and returns personalized recommendations.
 * 
 * @param formData - The questionnaire answers as a plain object
 * @returns RecommendationResult with top recommendations and explanations
 */
/**
 * Main recommendation server action.
 * Processes questionnaire answers and returns personalized recommendations.
 * 
 * @param formData - The questionnaire answers as a plain object
 * @param locale - The current locale (e.g., 'en', 'ru')
 * @returns RecommendationResult with top recommendations and explanations
 */
export async function getRecommendations(
  formData: UserAnswers,
  locale: string
): Promise<RecommendationResult> {
  try {
    // Step 0: Get translations for the requested locale
    const { getTranslations } = await import('next-intl/server');
    const t = await getTranslations({ locale });

    // Step 1: Validate input data
    const validationResult = UserAnswersSchema.safeParse(formData);
    
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error);
      return {
        success: false,
        recommendations: [],
        generatedAt: new Date().toISOString(),
        error: t('common.error'),
      };
    }

    const answers = validationResult.data;

    // Step 2: Initialize the inference engine
    const engine = new InferenceEngine();

    // Step 3: Evaluate all rules against user answers
    const scores = engine.evaluate(answers);

    // Step 4: Get top 3 recommendations
    const topScores = engine.getTopRecommendations(scores, 3);

    // Step 5: Generate explanations for each recommendation
    const explanationGen = new ExplanationGenerator();

    // Step 6: Build the final recommendations array
    const recommendations: Recommendation[] = topScores.map((score, index) => {
      // Generate localized explanation
      const explanation = explanationGen.generateExplanation(score, t);

      // Localize specialization metadata
      const localizedSpecialization = {
        ...score.specialization,
        name: t(`data.specializations.${score.specialization.id}.name`),
        description: t(`data.specializations.${score.specialization.id}.description`),
      };

      return {
        rank: index + 1,
        specialization: localizedSpecialization,
        matchScore: score.normalizedScore,
        confidence: score.confidence,
        explanation,
      };
    });

    // Step 7: Return successful result
    return {
      success: true,
      recommendations,
      generatedAt: new Date().toISOString(),
    };

  } catch (error) {
    // Log error for debugging (server-side only)
    console.error('Error generating recommendations:', error);

    return {
      success: false,
      recommendations: [],
      generatedAt: new Date().toISOString(),
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

/**
 * Get all available specializations (for display purposes).
 * This is a simple data fetch, no inference involved.
 */
export async function getSpecializations() {
  const { SPECIALIZATIONS } = await import('@/lib/knowledge-base/specializations');
  return SPECIALIZATIONS;
}

/**
 * Get questionnaire structure (for dynamic form generation).
 */
export async function getQuestionnaireSteps() {
  const { QUESTIONNAIRE_STEPS } = await import('@/lib/knowledge-base/questions');
  return QUESTIONNAIRE_STEPS;
}
