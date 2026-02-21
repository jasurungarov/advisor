/**
 * Results Page
 * 
 * Displays the top 3 specialization recommendations with explanations.
 * Retrieves data from sessionStorage (set by questionnaire form).
 */

'use client';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { RecommendationCard } from '@/components/results/RecommendationCard';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/i18n/routing';
import { RecommendationResult } from '@/lib/expert-system/types';
import {
    AlertCircle,
    ChevronLeft,
    Loader2,
    RefreshCw,
    Sparkles,
    Trophy,
} from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const router = useRouter();
  const t = useTranslations('results');
  const format = useFormatter();
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve results from sessionStorage
    const storedResult = sessionStorage.getItem('recommendations');

    if (!storedResult) {
      setError(t('error.noResults'));
      setIsLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(storedResult) as RecommendationResult;

      if (!parsed.success || parsed.recommendations.length === 0) {
        setError(parsed.error || 'No recommendations generated.');
        setIsLoading(false);
        return;
      }

      setResult(parsed);
    } catch (err) {
      console.error('Error parsing results:', err);
      setError(t('error.noResults'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-700 dark:text-brand-500 animate-spin mx-auto mb-4" />
          <p className="text-[#4a6e5d] dark:text-brand-100/70">{t('loading')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-brand-900 dark:text-brand-100 mb-2">{t('error.title')}</h2>
          <p className="text-[#4a6e5d] dark:text-brand-100/70 mb-6">{error}</p>
          <Link href="/questionnaire">
            <Button className="gap-2 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700 hover:text-white">
              <RefreshCw className="w-4 h-4" />
              {t('error.takeQuestionnaire')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e]">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-br from-brand-500/15 to-brand-700/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-linear-to-br from-brand-100 to-brand-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Header */}
      <header className="fixed top-0  inset-x-0 z-50 backdrop-blur-md container mx-auto px-4 py-4 flex justify-between items-center border-b">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:text-brand-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('backToHome')}
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button
            size="sm"
            onClick={() => router.push('/questionnaire')}
            className="gap-2 bg-secondary text-brand-900 hover:bg-brand-100 dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary "
          >
            <RefreshCw className="w-4 h-4" />
            {t('retakeAssessment')}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 mt-18">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900 text-brand-50 text-sm font-medium mb-8 shadow-lg shadow-brand-900/20 dark:bg-brand-500/20 dark:text-brand-100 border border-primary">
            <Trophy className="w-4 h-4 text-gold"/>
            {t('badge')}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-[#4a6e5d] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Results Summary */}
        {result && (
          <div className="mb-8 p-4 rounded-xl bg-brand-100/50 border border-brand-500/20 max-w-2xl mx-auto ">
            <div className="flex items-center gap-3 ">
              <Sparkles className="w-5 h-5 text-brand-700" />
              <p className="text-sm text-brand-900">
                {t.rich('analysisNote', {
                  count: 70,
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </p>
            </div>
          </div>
        )}

        {/* Recommendation Cards */}
        {result && (
          <div className="space-y-6 max-w-3xl mx-auto ">
            {result.recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.specialization.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-[#4a6e5d]">
            {t('notSatisfied')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/questionnaire">
              <Button className="gap-2 bg-secondary text-brand-900 hover:bg-brand-100 dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary">
                <RefreshCw className="w-4 h-4" />
                {t('retakeAssessment')}
              </Button>
            </Link>
            <Link href="/">
              <Button className="gap-2 bg-brand-900 text-brand-50 hover:bg-brand-700">
                {t('backToHome')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Timestamp */}
        {result && (
          <div className="mt-8 text-center">
            <p className="text-xs text-[#4a6e5d]/70">
              {t('generatedAt')}: {format.dateTime(new Date(result.generatedAt), {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-[#4a6e5d]">
            {t('disclaimer')}
          </p>
        </div>
      </footer>
    </div>
  );
}
