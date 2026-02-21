/**
 * Expert System Type Definitions
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the rule-based expert system for course/specialization recommendations.
 * 
 * Key Concepts:
 * - Specialization: An academic field/major that can be recommended
 * - Rule: A conditional statement that links user attributes to specializations
 * - UserAnswers: The collected responses from the questionnaire
 * - Explanation: Human-readable justification for recommendations
 */

// =============================================================================
// SPECIALIZATION TYPES
// =============================================================================

/**
 * Represents an academic specialization/major that can be recommended.
 * Each specialization has associated traits that help match it to students.
 */
export interface Specialization {
  /** Unique identifier for the specialization */
  id: string;
  /** Display name of the specialization */
  name: string;
  /** Brief description of what this specialization involves */
  description: string;
  /** Potential career paths after graduation */
  careers: string[];
  /** Key skills developed in this specialization */
  keySkills: string[];
  /** Icon identifier for UI display */
  icon: string;
  /** Color theme for UI display (hex color) */
  color: string;
}

// =============================================================================
// QUESTIONNAIRE TYPES
// =============================================================================

/**
 * Types of questions that can appear in the questionnaire.
 * - single: Select one option (radio buttons)
 * - multiple: Select multiple options (checkboxes)
 * - scale: Rate on a numeric scale (1-5)
 */
export type QuestionType = 'single' | 'multiple' | 'scale';

/**
 * Categories of questions for organization and explanation grouping.
 */
export type QuestionCategory = 'interests' | 'skills' | 'personality' | 'career';

/**
 * An option that can be selected for a question.
 */
export interface QuestionOption {
  /** Unique identifier for this option */
  id: string;
  /** Display text for the option */
  label: string;
  /** Optional description providing more context */
  description?: string;
}

/**
 * A single question in the questionnaire.
 */
export interface Question {
  /** Unique identifier for this question */
  id: string;
  /** The question text displayed to the user */
  text: string;
  /** Type of input expected */
  type: QuestionType;
  /** Category for grouping and explanation purposes */
  category: QuestionCategory;
  /** Available options (for single/multiple types) */
  options?: QuestionOption[];
  /** Min value for scale type */
  scaleMin?: number;
  /** Max value for scale type */
  scaleMax?: number;
  /** Labels for scale endpoints */
  scaleLabels?: { min: string; max: string };
}

/**
 * A step in the multi-step questionnaire.
 */
export interface QuestionnaireStep {
  /** Step identifier */
  id: string;
  /** Step title displayed to user */
  title: string;
  /** Step description */
  description: string;
  /** Category of questions in this step */
  category: QuestionCategory;
  /** Questions in this step */
  questions: Question[];
}

/**
 * User's answers to the questionnaire.
 * Maps question IDs to their selected values.
 * - For single: string (selected option ID)
 * - For multiple: string[] (selected option IDs)
 * - For scale: number (selected value)
 */
export type UserAnswers = Record<string, string | string[] | number>;

// =============================================================================
// RULE ENGINE TYPES
// =============================================================================

/**
 * Operators used in rule conditions.
 * - equals: Exact match (for single-select)
 * - includes: Array contains value (for multi-select)
 * - greaterThan/lessThan: Numeric comparison (for scale)
 * - any: Any of the specified values match
 * - all: All specified values must match
 */
export type RuleOperator = 
  | 'equals' 
  | 'includes' 
  | 'greaterThan' 
  | 'lessThan' 
  | 'greaterOrEqual'
  | 'lessOrEqual'
  | 'any' 
  | 'all';

/**
 * A single condition within a rule.
 * Evaluates whether a specific question's answer meets criteria.
 */
export interface RuleCondition {
  /** The question ID to evaluate */
  questionId: string;
  /** The operator to use for comparison */
  operator: RuleOperator;
  /** The value(s) to compare against */
  value: string | string[] | number;
}

/**
 * A rule in the knowledge base.
 * 
 * Rules are the core of the expert system. Each rule:
 * 1. Has conditions that must be satisfied
 * 2. Points to a target specialization
 * 3. Has a weight indicating its importance
 * 4. Includes an explanation for transparency
 */
export interface Rule {
  /** Unique identifier for this rule */
  id: string;
  /** Human-readable name for debugging/admin */
  name: string;
  /** Conditions that must ALL be true for this rule to fire */
  conditions: RuleCondition[];
  /** The specialization this rule supports */
  targetSpecializationId: string;
  /** 
   * Weight of this rule (0.0 to 1.0)
   * Higher weight = stronger influence on recommendation
   * - 0.1-0.3: Minor preference indicator
   * - 0.4-0.6: Moderate match signal
   * - 0.7-0.9: Strong compatibility indicator
   * - 1.0: Critical/defining trait
   */
  weight: number;
  /** Category this rule relates to (for explanation grouping) */
  category: QuestionCategory;
  /** Human-readable explanation of why this rule matters */
  explanation: string;
}

// =============================================================================
// INFERENCE ENGINE TYPES
// =============================================================================

/**
 * Result of matching a single rule against user answers.
 */
export interface RuleMatch {
  /** The rule that matched */
  rule: Rule;
  /** The weighted score contributed by this match */
  contributedScore: number;
  /** Specific conditions that were satisfied */
  matchedConditions: RuleCondition[];
}

/**
 * Aggregated score for a single specialization.
 */
export interface SpecializationScore {
  /** The specialization being scored */
  specialization: Specialization;
  /** Raw accumulated score from all matching rules */
  rawScore: number;
  /** Normalized score (0-100) for display */
  normalizedScore: number;
  /** Confidence level based on rule coverage */
  confidence: 'low' | 'medium' | 'high';
  /** All rules that contributed to this score */
  matchedRules: RuleMatch[];
}

// =============================================================================
// EXPLANATION TYPES
// =============================================================================

/**
 * A single factor contributing to a recommendation.
 */
export interface ExplanationFactor {
  /** Category of this factor */
  category: QuestionCategory;
  /** The rule that created this factor */
  ruleId: string;
  /** Human-readable explanation */
  text: string;
  /** How much this factor contributed (0-100) */
  impact: number;
}

/**
 * Complete explanation for a single recommendation.
 */
export interface RecommendationExplanation {
  /** The specialization being explained */
  specializationId: string;
  /** Summary statement */
  summary: string;
  /** Detailed factors grouped by category */
  factors: {
    interests: ExplanationFactor[];
    skills: ExplanationFactor[];
    personality: ExplanationFactor[];
    career: ExplanationFactor[];
  };
  /** Strengths that make this a good fit */
  strengths: string[];
  /** Areas the student might want to develop */
  considerations: string[];
}

// =============================================================================
// API/ACTION TYPES
// =============================================================================

/**
 * Input for the recommendation action.
 */
export interface RecommendationInput {
  /** User's questionnaire answers */
  answers: UserAnswers;
}

/**
 * A single recommendation in the results.
 */
export interface Recommendation {
  /** Ranking position (1 = best match) */
  rank: number;
  /** The recommended specialization */
  specialization: Specialization;
  /** Match score (0-100) */
  matchScore: number;
  /** Confidence level */
  confidence: 'low' | 'medium' | 'high';
  /** Detailed explanation */
  explanation: RecommendationExplanation;
}

/**
 * Output from the recommendation action.
 */
export interface RecommendationResult {
  /** Whether the recommendation was successful */
  success: boolean;
  /** Top recommendations (up to 3) */
  recommendations: Recommendation[];
  /** Timestamp of when recommendation was generated */
  generatedAt: string;
  /** Error message if success is false */
  error?: string;
}
