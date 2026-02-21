/**
 * Zod Validation Schemas
 * 
 * This module defines Zod schemas for validating:
 * 1. Questionnaire responses
 * 2. API inputs and outputs
 * 
 * Zod provides runtime type validation which is crucial for
 * ensuring data integrity when processing user input.
 */

import { z } from 'zod';

// =============================================================================
// QUESTIONNAIRE ANSWER SCHEMAS
// =============================================================================

/**
 * Schema for a single questionnaire answer.
 * Supports string (single-select), string array (multi-select), and number (scale).
 */
export const AnswerValueSchema = z.union([
  z.string(),
  z.array(z.string()),
  z.number().min(1).max(5),
]);

/**
 * Schema for the complete questionnaire answers object.
 * Maps question IDs to their answer values.
 */
export const UserAnswersSchema = z.record(z.string(), AnswerValueSchema);

// =============================================================================
// QUESTION-SPECIFIC VALIDATIONS
// =============================================================================

/**
 * Step 1: Interests validation schema
 */
export const InterestsStepSchema = z.object({
  'primary-interest': z.enum([
    'building-software',
    'analyzing-data',
    'designing-interfaces',
    'solving-puzzles',
    'protecting-systems',
    'managing-projects',
  ]),
  'secondary-interests': z.array(z.enum([
    'gaming',
    'mobile-apps',
    'websites',
    'ai-ml',
    'cloud-infra',
    'robotics',
    'business-tech',
    'research',
  ])).min(1, 'Please select at least one secondary interest'),
  'learning-preference': z.enum([
    'hands-on',
    'structured-courses',
    'reading-docs',
    'collaboration',
  ]),
});

/**
 * Step 2: Skills validation schema
 */
export const SkillsStepSchema = z.object({
  'programming-level': z.number().min(1).max(5),
  'math-level': z.number().min(1).max(5),
  'design-level': z.number().min(1).max(5),
  'communication-level': z.number().min(1).max(5),
  'existing-skills': z.array(z.enum([
    'html-css',
    'javascript',
    'python',
    'java-csharp',
    'sql',
    'design-tools',
    'data-analysis',
    'none',
  ])),
});

/**
 * Step 3: Personality validation schema
 */
export const PersonalityStepSchema = z.object({
  'work-style': z.enum([
    'solo',
    'small-team',
    'large-team',
    'mixed',
  ]),
  'problem-approach': z.enum([
    'analytical',
    'creative',
    'research',
    'experiment',
  ]),
  'detail-vs-bigpicture': z.enum([
    'detail-oriented',
    'big-picture',
    'balanced',
  ]),
  'risk-tolerance': z.number().min(1).max(5),
});

/**
 * Step 4: Career validation schema
 */
export const CareerStepSchema = z.object({
  'work-environment': z.enum([
    'startup',
    'corporate',
    'freelance',
    'research',
    'government',
  ]),
  'career-priority': z.enum([
    'salary',
    'impact',
    'creativity',
    'growth',
    'balance',
    'leadership',
  ]),
  'five-year-vision': z.enum([
    'technical-expert',
    'team-lead',
    'entrepreneur',
    'researcher',
    'versatile',
  ]),
  'industry-preference': z.array(z.enum([
    'tech',
    'finance',
    'healthcare',
    'gaming',
    'education',
    'ecommerce',
    'security',
    'any',
  ])).min(1, 'Please select at least one industry'),
});

/**
 * Complete questionnaire validation schema.
 * Combines all step schemas.
 */
export const CompleteQuestionnaireSchema = InterestsStepSchema
  .merge(SkillsStepSchema)
  .merge(PersonalityStepSchema)
  .merge(CareerStepSchema);

// =============================================================================
// API INPUT/OUTPUT SCHEMAS
// =============================================================================

/**
 * Schema for recommendation request input.
 */
export const RecommendationInputSchema = z.object({
  answers: UserAnswersSchema,
});

/**
 * Schema for a single recommendation in the response.
 */
export const RecommendationSchema = z.object({
  rank: z.number().int().min(1).max(10),
  specialization: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    careers: z.array(z.string()),
    keySkills: z.array(z.string()),
    icon: z.string(),
    color: z.string(),
  }),
  matchScore: z.number().min(0).max(100),
  confidence: z.enum(['low', 'medium', 'high']),
  explanation: z.object({
    specializationId: z.string(),
    summary: z.string(),
    factors: z.object({
      interests: z.array(z.object({
        category: z.string(),
        ruleId: z.string(),
        text: z.string(),
        impact: z.number(),
      })),
      skills: z.array(z.object({
        category: z.string(),
        ruleId: z.string(),
        text: z.string(),
        impact: z.number(),
      })),
      personality: z.array(z.object({
        category: z.string(),
        ruleId: z.string(),
        text: z.string(),
        impact: z.number(),
      })),
      career: z.array(z.object({
        category: z.string(),
        ruleId: z.string(),
        text: z.string(),
        impact: z.number(),
      })),
    }),
    strengths: z.array(z.string()),
    considerations: z.array(z.string()),
  }),
});

/**
 * Schema for recommendation response.
 */
export const RecommendationResultSchema = z.object({
  success: z.boolean(),
  recommendations: z.array(RecommendationSchema),
  generatedAt: z.string(),
  error: z.string().optional(),
});

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type UserAnswersInput = z.infer<typeof UserAnswersSchema>;
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;
export type CompleteQuestionnaire = z.infer<typeof CompleteQuestionnaireSchema>;
