/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { saveAssessment } from '@/app/actions/assessment';
import { getRecommendations } from '@/app/actions/recommend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from '@/i18n/routing';
import { Question, UserAnswers } from '@/lib/expert-system/types';
import { QUESTIONNAIRE_STEPS } from '@/lib/knowledge-base/questions';
import { ChevronLeft, ChevronRight, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

/**
 * Scale Slider Component for numeric rating questions
 */
function ScaleInput({
  question,
  value,
  onChange,
  stepId,
  t
}: {
  question: Question;
  value: number | undefined;
  onChange: (value: number) => void;
  stepId: string;
  t: any;
}) {
  const min = question.scaleMin || 1;
  const max = question.scaleMax || 5;
  const selectedValue = value || min;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-[#4a6e5d]">
        <span>{t(`steps.${stepId}.questions.${question.id}.labels.min`)}</span>
        <span>{t(`steps.${stepId}.questions.${question.id}.labels.max`)}</span>
      </div>
      <div className="flex justify-between gap-2">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`
              flex-1 py-3 px-2 rounded-lg text-lg font-medium transition-all duration-200
              ${selectedValue === num
                ? 'bg-linear-to-r border border-primary from-brand-900 to-brand-700 dark:text-white shadow-lg dark:shadow-secondary scale-105 dark:border dark:border-primary'
                : 'bg-brand-100/50 hover:bg-secondary/80 text-brand-900 dark:bg-brand-900/30 dark:text-brand-900 dark:hover:bg-secondary/20'
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
 
/**
 * Single Select Question Component
 */
function SingleSelectQuestion({
  question,
  value,
  onChange,
  stepId,
  t
}: {
  question: Question;
  value: string | undefined;
  onChange: (value: string) => void;
  stepId: string;
  t: any;
}) {
  return (
    <RadioGroup
      value={value || ''}
      onValueChange={onChange}
      className="grid gap-3"
    >
      {question.options?.map((option) => {
        const hasDescription = !!option.description;
        const baseKey = `steps.${stepId}.questions.${question.id}.options.${option.id}`;
        
        return (
          <div key={option.id} className="relative">
            <RadioGroupItem
              value={option.id}
              id={`${question.id}-${option.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`${question.id}-${option.id}`}
              className={`
                flex flex-col cursor-pointer rounded-xl border-2 p-4 transition-all duration-200
                hover:border-brand-500/50 hover:bg-brand-100/30 dark:hover:bg-secondary/40
                peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-brand-100 dark:peer-data-[state=checked]:bg-secondary/20
                peer-data-[state=checked]:shadow-md
                border-brand-100 dark:peer-data-[state=checked]:border-primary
              `}
            >
              <span className="font-medium text-brand-900 dark:text-brand-100">
                {hasDescription ? t(`${baseKey}.label`) : t(baseKey)}
              </span>
              {hasDescription && (
                <span className="text-sm text-[#4a6e5d] dark:text-brand-100/70 mt-1">
                  {t(`${baseKey}.description`)}
                </span>
              )}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}

/**
 * Multiple Select Question Component
 */
function MultiSelectQuestion({
  question,
  values,
  onChange,
  stepId,
  t
}: {
  question: Question;
  values: string[];
  onChange: (values: string[]) => void;
  stepId: string;
  t: any;
}) {
  const handleChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...values, optionId]);
    } else {
      onChange(values.filter((v) => v !== optionId));
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {question.options?.map((option) => {
         const baseKey = `steps.${stepId}.questions.${question.id}.options.${option.id}`;
         
         return (
          <div key={option.id} className="relative">
            <Checkbox
              id={`${question.id}-${option.id}`}
              checked={values.includes(option.id)}
              onCheckedChange={(checked) => handleChange(option.id, checked as boolean)}
              className="peer sr-only"
            />
            <Label
              htmlFor={`${question.id}-${option.id}`}
              className={`
                flex items-center gap-3 cursor-pointer rounded-xl border-2 p-4 transition-all duration-200
                hover:border-primary hover:bg-brand-100/30 dark:hover:bg-secondary/20
                ${values.includes(option.id)  
                  ? 'border-primary bg-brand-100/50 dark:bg-secondary/20 shadow-md'
                  : 'border-[#b8e0d4] dark:border-secondary/80'
                }
              `}
            >
              <div
                className={`
                  w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                  ${values.includes(option.id)
                    ? 'bg-primary text-white'
                    : 'border-[#b8e0d4] dark:border-secondary/80'
                  }
                `}
              >
                {values.includes(option.id) && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="font-medium text-brand-900 dark:text-brand-100">
                {t(baseKey)}
              </span>
            </Label>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Question Renderer - decides which input type to render
 */
function QuestionRenderer({
  question,
  answer,
  onAnswer,
  stepId,
  t
}: {
  question: Question;
  answer: string | string[] | number | undefined;
  onAnswer: (questionId: string, value: string | string[] | number) => void;
  stepId: string;
  t: any;
}) {
  switch (question.type) {
    case 'single':
      return (
        <SingleSelectQuestion
          question={question}
          value={answer as string | undefined}
          onChange={(value) => onAnswer(question.id, value)}
          stepId={stepId}
          t={t}
        />
      );

    case 'multiple':
      return (
        <MultiSelectQuestion
          question={question}
          values={(answer as string[]) || []}
          onChange={(values) => onAnswer(question.id, values)}
          stepId={stepId}
          t={t}
        />
      );

    case 'scale':
      return (
        <ScaleInput
          question={question}
          value={answer as number | undefined}
          onChange={(value) => onAnswer(question.id, value)}
          stepId={stepId}
          t={t}
        />
      );

    default:
      return null;
  }
}

/**
 * Step Indicator Component
 */
function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: {
  steps: typeof QUESTIONNAIRE_STEPS;
  currentStep: number;
  onStepClick: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <button
            onClick={() => onStepClick(index)}
            disabled={index > currentStep}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold
              transition-all duration-300 text-sm
              ${index === currentStep
                ? 'bg-linear-to-r from-brand-900 to-brand-700 shadow-lg shadow-brand-900/25 scale-105 dark:bg-[#0e4a38] border-2 border-primary'
                : index < currentStep
                  ? 'bg-brand-100 text-brand-700 hover:bg-brand-500/20 cursor-pointer dark:bg-secondary/40 dark:text-brand-100'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-[#0e4a38] dark:text-brand-100/30'
              }
            `}
          >
            {index + 1}
          </button>
          {index < steps.length - 1 && (
            <div
              className={`
                w-12 h-1 rounded-full transition-all duration-300
                ${index < currentStep ? 'bg-brand-500' : 'bg-gray-200'}
              `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Main Questionnaire Form Component
 */
export function QuestionnaireForm() {
  const router = useRouter();
  const t = useTranslations('questionnaire');
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = QUESTIONNAIRE_STEPS;
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleAnswer = useCallback(
    (questionId: string, value: string | string[] | number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      setError(null);
    },
    []
  );

  const isStepComplete = useCallback(() => {
    const questions = currentStepData.questions;
    for (const question of questions) {
      const answer = answers[question.id];
      if (answer === undefined || answer === null) return false;
      if (Array.isArray(answer) && answer.length === 0) return false;
    }
    return true;
  }, [currentStepData, answers]);

  const handleNext = useCallback(() => {
    if (!isStepComplete()) {
      setError(t('error'));
      return;
    }
    setError(null);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, steps.length, isStepComplete, t]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    if (!isStepComplete()) {
      setError(t('error'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await getRecommendations(answers, locale);

      if (result.success) {
        // Save assessment to database (for logged-in users)
        await saveAssessment(answers, result.recommendations);
        
        // Store results in sessionStorage for results page
        sessionStorage.setItem('recommendations', JSON.stringify(result));
        sessionStorage.setItem('answers', JSON.stringify(answers));
        router.push('/results');
      } else {
        setError(result.error || 'Failed to generate recommendations.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(t('common.error') || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, isStepComplete, router, t, locale]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-[#4a6e5d] dark:text-brand-100/70 mt-2 text-center">
          {t('step')} {currentStep + 1} {t('of')} {steps.length}
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        onStepClick={(index) => {
          if (index <= currentStep) {
            setCurrentStep(index);
            setError(null);
          }
        }}
      />

      {/* Question Card */}
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-[#0e4a38]/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-r from-brand-900 to-brand-700 text-white mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-brand-900">
            {t(`steps.${currentStepData.id}.title`)}
          </CardTitle>
          <CardDescription className="text-[#4a6e5d] dark:text-brand-100/70">
            {t(`steps.${currentStepData.id}.description`)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pt-4">
          {currentStepData.questions.map((question, index) => (
            <div
              key={question.id}
              className="space-y-4 p-4 rounded-xl bg-brand-50/50 dark:bg-brand-900/20"
            >
              <h3 className="font-medium text-brand-900 dark:text-brand-100 flex items-start gap-2 shadow-[0_0_20px_rgba(0,0,0,0.25)] shadow-secondary rounded-xl p-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <span>{t(`steps.${currentStepData.id}.questions.${question.id}.text`)}</span>
              </h3>
              <QuestionRenderer
                question={question}
                answer={answers[question.id]}
                onAnswer={handleAnswer}
                stepId={currentStepData.id}
                t={t}
              />
            </div>
          ))}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2 bg-brand-500 text-brand-900 font-semibold border border-primary hover:bg-secondary/80 shadow-md shadow-brand-500/25 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('previous')}
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="gap-2 bg-brand-500 text-brand-900 font-semibold border border-primary hover:bg-secondary/80 shadow-md shadow-brand-500/25 transition-all duration-300"
              >
              {t('next')}
              <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-brand-500 text-brand-900 font-semibold border border-primary hover:bg-brand-700 hover:text-white shadow-md shadow-brand-500/25 transition-all duration-300"
              >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('analyzing')}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t('getRecommendations')}
                </>
              )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
