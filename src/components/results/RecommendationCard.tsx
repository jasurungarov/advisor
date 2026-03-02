/**
 * Recommendation Card Component
 * 
 * Displays a single specialization recommendation with:
 * - Match score visualization
 * - Confidence indicator
 * - Key information
 * - Expandable details
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Recommendation } from '@/lib/expert-system/types';
import {
    AlertCircle,
    BarChart3,
    Brain,
    Briefcase,
    Building,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Cloud,
    Code,
    Gamepad2,
    Globe,
    Lightbulb,
    Palette,
    Shield,
    Smartphone,
    Star,
    Target,
    Trophy,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

/**
 * Icon mapping for specializations
 */
const SPECIALIZATION_ICONS: Record<string, React.ReactNode> = {
  'computer-science': <Code className="w-6 h-6" />,
  'data-science': <BarChart3 className="w-6 h-6" />,
  'cybersecurity': <Shield className="w-6 h-6" />,
  'web-development': <Globe className="w-6 h-6" />,
  'mobile-development': <Smartphone className="w-6 h-6" />,
  'ui-ux-design': <Palette className="w-6 h-6" />,
  'artificial-intelligence': <Brain className="w-6 h-6" />,
  'game-development': <Gamepad2 className="w-6 h-6" />,
  'cloud-computing': <Cloud className="w-6 h-6" />,
  'business-it': <Building className="w-6 h-6" />,
};

/**
 * Rank badge component with special styling for top 3
 */
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="absolute -top-3 -right-3 w-16 h-16 ">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-linear-to-brrom-gold to-amber-600 rounded-full animate-pulse shadow-lg" />
          <div className="absolute inset-1 bg-linear-to-br from-gold-light to-gold rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-amber-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center 
        font-bold text-white shadow-lg
        ${rank === 2 ? 'bg-linear-to-br from-slate-400 to-slate-500' : ''}
        ${rank === 3 ? 'bg-linear-to-br from-amber-600 to-amber-700' : ''}
        ${rank > 3 ? 'bg-linear-to-br from-slate-500 to-slate-600' : ''}
      `}
    >
      #{rank}
    </div>
  );
}

/**
 * Match score circular progress
 */
function MatchScoreCircle({ score, color }: { score: number; color: string }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-24 h-24 shrink-0 ">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          fill="none"
          stroke="#d1f2eb"
          strokeWidth="8"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-brand-900">{score}%</span>
      </div>
    </div>
  );
}

/**
 * Confidence badge component
 */
function ConfidenceBadge({ confidence }: { confidence: 'low' | 'medium' | 'high' }) {
  const t = useTranslations('results.card.confidence');
  
  const config = {
    low: { label: t('low'), color: 'bg-amber-100 text-amber-700 border-amber-200' },
    medium: { label: t('medium'), color: 'bg-brand-100 text-brand-700 border-brand-500/30' },
    high: { label: t('high'), color: 'bg-green-100 text-green-700 border-green-200' },
  };

  return (
    <Badge variant="outline" className={`${config[confidence].color} font-medium border border-primary`}>
      {config[confidence].label}
    </Badge>
  );
}

/**
 * Explanation section component
 */
function ExplanationSection({
  recommendation,
  isExpanded,
}: {
  recommendation: Recommendation;
  isExpanded: boolean;
}) {
  const t = useTranslations("results.card");

  const { explanation } = recommendation;

  const allFactors = [
    ...explanation.factors.interests,
    ...explanation.factors.skills,
    ...explanation.factors.personality,
    ...explanation.factors.career,
  ].sort((a, b) => b.impact - a.impact);

  return (
    <div
      className={`
        overflow-hidden 
        transition-all duration-300 ease-in-out
        ${isExpanded
          ? "max-h-500 opacity-100 translate-y-0 "
          : "max-h-0 opacity-0 -translate-y-2 "}
      `}
    >
      <div className="mt-6 space-y-6 border-t border-[#b8e0d4] pt-6 ">
        {/* Summary */}
        <div className="space-y-2">
          <h4 className="font-semibold text-brand-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-gold" />
            {t("whyRecommended")}
          </h4>
          <p className="text-[#4a6e5d] leading-relaxed">
            {explanation.summary}
          </p>
        </div>

        {/* Key Factors */}
        <div className="space-y-3">
          <h4 className="font-semibold text-brand-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-500" />
            {t("keyFactors")}
          </h4>

          <div className="space-y-2 ">
            {allFactors.slice(0, 5).map((factor, index) => (
              <div
                key={`${factor.ruleId}-${index}`}
                className="flex items-start gap-3 p-3 rounded-lg bg-brand-50"
              >
                <Star className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-brand-900">{factor.text}</p>

                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-brand-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-brand-700 to-brand-500 rounded-full transition-all duration-300"
                        style={{ width: `${factor.impact}%` }}
                      />
                    </div>
                    <span className="text-xs text-primary w-10">
                      {factor.impact}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        {explanation.strengths.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-brand-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-500" />
              {t("yourStrengths")}
            </h4>

            <ul className="space-y-2">
              {explanation.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-[#4a6e5d]"
                >
                  <span className="text-brand-500 mt-0.5">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Considerations */}
        {explanation.considerations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-brand-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gold" />
              {t("considerations")}
            </h4>

            <ul className="space-y-2">
              {explanation.considerations.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-[#4a6e5d]"
                >
                  <span className="text-gold mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Careers */}
        <div className="space-y-3">
          <h4 className="font-semibold text-brand-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-700" />
            {t("careerPaths")}
          </h4>

          <div className="flex flex-wrap gap-2">
            {recommendation.specialization.careers.map((career, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-brand-100 text-brand-700 border-0"
              >
                {career}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Skills */}
        <div className="space-y-3">
          <h4 className="font-semibold text-brand-900">
            {t("keySkills")}
          </h4>

          <div className="flex flex-wrap gap-2">
            {recommendation.specialization.keySkills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-primary text-brand-900"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Recommendation Card Component
 */
export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const t = useTranslations('results.card');
  const [isExpanded, setIsExpanded] = useState(recommendation.rank === 1);
  const { specialization, matchScore, confidence, rank } = recommendation;

  const icon = SPECIALIZATION_ICONS[specialization.id] || <Star className="w-6 h-6" />;

  return (
    <Card
      className={`
        relative dark:bg-[#0e4a38]/80 overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary
        ${rank === 1
          ? 'border-2 border-primary'
          : 'border border-primary'
        }
      `}
    >
      {/* Gradient accent for top pick */}
      {rank === 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-brand-900 via-brand-500 to-gold" />
      )}

      <RankBadge rank={rank} />

      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: specialization.color }}
          >
            {icon}
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-brand-900">
                {specialization.name}
              </h3>
              <ConfidenceBadge confidence={confidence} />
            </div>
            <p className="text-[#4a6e5d] mt-1 text-sm line-clamp-2">
              {specialization.description}
            </p>
          </div>

          {/* Score Circle */}
          <MatchScoreCircle score={matchScore} color={specialization.color} />
        </div>
      </CardHeader>

      <CardContent>
        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2 text-brand-700 hover:text-brand-900 hover:bg-brand-100/50 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2 transition-transform duration-300" />
              {t('hideDetails')}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2 transition-transform duration-300" />
              {t('viewDetails')}
            </>
          )}
        </Button>

        {/* Expandable Explanation */}
        <ExplanationSection
          recommendation={recommendation}
          isExpanded={isExpanded}
        />
      </CardContent>
    </Card>
  );
}
