/**
 * Inference Engine - Core of the Expert System
 * 
 * This module implements the rule-based inference engine that evaluates
 * user answers against the knowledge base to generate recommendations.
 * 
 * How it works:
 * 1. Takes user answers from questionnaire
 * 2. Evaluates ALL rules in the knowledge base
 * 3. For each matching rule, adds weighted score to target specialization
 * 4. Aggregates and normalizes scores
 * 5. Returns ranked list of specializations with matched rules
 * 
 * This is a FORWARD CHAINING inference engine:
 * - We start with known facts (user answers)
 * - We apply rules to derive conclusions (specialization scores)
 * - We continue until all rules have been evaluated
 */

import { RULES } from '../knowledge-base/rules';
import { SPECIALIZATIONS, getSpecializationById } from '../knowledge-base/specializations';
import {
    Rule,
    RuleCondition,
    RuleMatch,
    SpecializationScore,
    UserAnswers,
} from './types';

/**
 * The main Inference Engine class.
 * Responsible for evaluating rules and generating recommendations.
 */
export class InferenceEngine {
  private rules: Rule[];

  /**
   * Create a new InferenceEngine instance.
   * @param customRules - Optional custom rules to use instead of default
   */
  constructor(customRules?: Rule[]) {
    this.rules = customRules || RULES;
  }

  /**
   * Main entry point: evaluate user answers and return scored specializations.
   * 
   * @param answers - User's answers from the questionnaire
   * @returns Array of SpecializationScore sorted by score (highest first)
   */
  public evaluate(answers: UserAnswers): SpecializationScore[] {
    // Step 1: Find all matching rules
    const matchedRules = this.findMatchingRules(answers);

    // Step 2: Aggregate scores by specialization
    const scores = this.aggregateScores(matchedRules);

    // Step 3: Normalize and add confidence levels
    const normalizedScores = this.normalizeScores(scores);

    // Step 4: Sort by score (highest first) and return
    return normalizedScores.sort((a, b) => b.normalizedScore - a.normalizedScore);
  }

  /**
   * Find all rules that match the given user answers.
   * A rule matches if ALL its conditions are satisfied.
   * 
   * @param answers - User's questionnaire answers
   * @returns Array of RuleMatch objects for all matching rules
   */
  private findMatchingRules(answers: UserAnswers): RuleMatch[] {
    const matches: RuleMatch[] = [];

    for (const rule of this.rules) {
      const matchResult = this.evaluateRule(rule, answers);
      if (matchResult) {
        matches.push(matchResult);
      }
    }

    return matches;
  }

  /**
   * Evaluate a single rule against user answers.
   * Returns null if the rule doesn't match.
   * 
   * @param rule - The rule to evaluate
   * @param answers - User's answers
   * @returns RuleMatch if all conditions satisfied, null otherwise
   */
  private evaluateRule(rule: Rule, answers: UserAnswers): RuleMatch | null {
    const matchedConditions: RuleCondition[] = [];

    // ALL conditions must be true for the rule to match
    for (const condition of rule.conditions) {
      if (this.evaluateCondition(condition, answers)) {
        matchedConditions.push(condition);
      } else {
        // If any condition fails, the entire rule fails
        return null;
      }
    }

    // All conditions matched - create the RuleMatch
    return {
      rule,
      contributedScore: rule.weight,
      matchedConditions,
    };
  }

  /**
   * Evaluate a single condition against user answers.
   * Supports multiple operators for different comparison types.
   * 
   * @param condition - The condition to evaluate
   * @param answers - User's answers
   * @returns true if condition is satisfied, false otherwise
   */
  private evaluateCondition(condition: RuleCondition, answers: UserAnswers): boolean {
    const answer = answers[condition.questionId];

    // If no answer for this question, condition fails
    if (answer === undefined || answer === null) {
      return false;
    }

    switch (condition.operator) {
      case 'equals':
        // Exact match for single-select questions
        return answer === condition.value;

      case 'includes':
        // Check if array answer includes the target value
        if (Array.isArray(answer)) {
          return answer.includes(condition.value as string);
        }
        return false;

      case 'greaterThan':
        // Numeric comparison for scale questions
        return typeof answer === 'number' && answer > (condition.value as number);

      case 'lessThan':
        return typeof answer === 'number' && answer < (condition.value as number);

      case 'greaterOrEqual':
        return typeof answer === 'number' && answer >= (condition.value as number);

      case 'lessOrEqual':
        return typeof answer === 'number' && answer <= (condition.value as number);

      case 'any':
        // Answer matches ANY of the provided values
        const anyValues = condition.value as string[];
        if (Array.isArray(answer)) {
          return answer.some(a => anyValues.includes(a));
        }
        return anyValues.includes(answer as string);

      case 'all':
        // Answer must include ALL of the provided values
        const allValues = condition.value as string[];
        if (Array.isArray(answer)) {
          return allValues.every(v => answer.includes(v));
        }
        return false;

      default:
        console.warn(`Unknown operator: ${condition.operator}`);
        return false;
    }
  }

  /**
   * Aggregate matched rules into scores per specialization.
   * 
   * @param matches - Array of matched rules
   * @returns Map of specialization ID to accumulated score and matches
   */
  private aggregateScores(matches: RuleMatch[]): Map<string, { rawScore: number; matches: RuleMatch[] }> {
    const scoreMap = new Map<string, { rawScore: number; matches: RuleMatch[] }>();

    // Initialize all specializations with zero score
    for (const spec of SPECIALIZATIONS) {
      scoreMap.set(spec.id, { rawScore: 0, matches: [] });
    }

    // Accumulate scores from matched rules
    for (const match of matches) {
      const targetId = match.rule.targetSpecializationId;
      const current = scoreMap.get(targetId);
      
      if (current) {
        current.rawScore += match.contributedScore;
        current.matches.push(match);
      }
    }

    return scoreMap;
  }

  /**
   * Normalize raw scores to 0-100 scale and determine confidence levels.
   * 
   * Normalization formula:
   * - Find the maximum possible score for each specialization
   * - Calculate percentage of achieved vs possible
   * 
   * Confidence levels:
   * - Low: Less than 3 rules matched
   * - Medium: 3-5 rules matched
   * - High: More than 5 rules matched
   * 
   * @param scoreMap - Raw scores from aggregation
   * @returns Array of normalized SpecializationScore
   */
  private normalizeScores(
    scoreMap: Map<string, { rawScore: number; matches: RuleMatch[] }>
  ): SpecializationScore[] {
    const results: SpecializationScore[] = [];

    // Calculate max possible score per specialization
    const maxScorePerSpec = this.calculateMaxScores();

    // Find highest raw score for relative comparison
    let highestRawScore = 0;
    scoreMap.forEach(({ rawScore }) => {
      if (rawScore > highestRawScore) {
        highestRawScore = rawScore;
      }
    });

    for (const [specId, { rawScore, matches }] of scoreMap) {
      const specialization = getSpecializationById(specId);
      if (!specialization) continue;

      // Calculate normalized score (0-100)
      // Use combination of absolute achievement and relative ranking
      const maxForSpec = maxScorePerSpec.get(specId) || 1;
      const absoluteScore = (rawScore / maxForSpec) * 100;
      const relativeScore = highestRawScore > 0 
        ? (rawScore / highestRawScore) * 100 
        : 0;

      // Weighted average: 60% absolute, 40% relative
      const normalizedScore = Math.round(absoluteScore * 0.6 + relativeScore * 0.4);

      // Determine confidence based on number of matched rules
      const matchCount = matches.length;
      let confidence: 'low' | 'medium' | 'high';
      if (matchCount < 3) {
        confidence = 'low';
      } else if (matchCount <= 5) {
        confidence = 'medium';
      } else {
        confidence = 'high';
      }

      results.push({
        specialization,
        rawScore,
        normalizedScore: Math.min(100, Math.max(0, normalizedScore)),
        confidence,
        matchedRules: matches,
      });
    }

    return results;
  }

  /**
   * Calculate the maximum possible score for each specialization.
   * This is the sum of all rule weights targeting that specialization.
   * 
   * @returns Map of specialization ID to max possible score
   */
  private calculateMaxScores(): Map<string, number> {
    const maxScores = new Map<string, number>();

    for (const spec of SPECIALIZATIONS) {
      maxScores.set(spec.id, 0);
    }

    for (const rule of this.rules) {
      const current = maxScores.get(rule.targetSpecializationId) || 0;
      maxScores.set(rule.targetSpecializationId, current + rule.weight);
    }

    return maxScores;
  }

  /**
   * Get the top N recommendations from evaluation results.
   * 
   * @param scores - Evaluation results from evaluate()
   * @param n - Number of recommendations to return (default: 3)
   * @returns Top N scoring specializations
   */
  public getTopRecommendations(scores: SpecializationScore[], n: number = 3): SpecializationScore[] {
    return scores.slice(0, n);
  }
}

// Export singleton instance for convenience
export const inferenceEngine = new InferenceEngine();
