/**
 * Questionnaire Page
 * 
 * Multi-step assessment to collect student information.
 */

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { QuestionnaireForm } from '@/components/questionnaire/QuestionnaireForm';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl'
import Link from 'next/link';

export default function QuestionnairePage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e]">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0  w-150 h-150 bg-linear-to-br from-brand-500/15 to-brand-700/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0  w-150 h-150 bg-linear-to-br from-brand-100 to-brand-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Header */}
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <div className="flex justify-between w-[95%] max-w-7xl px-6 py-3 rounded-2xl glass-navbar transition-all duration-300">
        <Link
          href="/"
          className="inline-flex items-center gap-2 dark:text-brand-100/70 hover:text-brand-500 transition-colors dark:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
      </header>

      {/* Main Content */}
      <main className="container w-full mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100 mb-2 mt-20">
             {t('questionnaire.title')}
          </h1>
          <p className="text-[#4a6e5d] dark:text-brand-100/70 max-w-xl mx-auto">
            {t('questionnaire.subtitle')}
          </p>
        </div>

        <QuestionnaireForm />
      </main>
    </div>
  );
}
