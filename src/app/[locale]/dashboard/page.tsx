/**
 * User Dashboard Page
 * 
 * Displays user profile and assessment history.
 */

import { getUserAssessments } from '@/app/actions/assessment';
import { logoutUser } from '@/app/actions/auth';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import {
    ArrowRight,
    BarChart3,
    Calendar,
    ClipboardList,
    LogOut,
    Plus,
    Trophy,
    User,
} from 'lucide-react';
import { getFormatter, getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('dashboard');
  const format = await getFormatter();
  
  const session = await auth();
  
  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const { assessments = [] } = await getUserAssessments();

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e]">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-br from-brand-500/15 to-brand-700/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0  w-150 h-150 bg-linear-to-br from-brand-100 to-brand-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Header */}
      <header className="border-b border-[#b8e0d4] dark:border-brand-500/20 bg-white/80 dark:bg-[#0e4a38]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-brand-900 tracking-tight">
            Course Advisor
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#4a6e5d]">
              {t.rich('welcome', {
                name: session.user.name || '',
                strong: (chunks) => <strong className="text-brand-900">{chunks}</strong>
              })}
            </span>
            <LanguageSwitcher />
            <form action={logoutUser}>
              <Button variant="outline" size="sm" type="submit" className="gap-2 border-[#b8e0d4] text-brand-900 hover:bg-brand-100 dark:border-brand-500/30 dark:text-brand-100 dark:hover:bg-brand-700/30">
                <LogOut className="w-4 h-4" />
                {t('nav.signOut')}
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-900 dark:text-brand-100 mb-2">
            {t('welcome', { name: session.user.name?.split(' ')[0] || '' })}
          </h1>
          <p className="text-[#4a6e5d] dark:text-brand-100/70">
            {t('subtitle')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg dark:bg-[#0e4a38]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-900 to-brand-700 flex items-center justify-center text-white">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-900 dark:text-brand-100">{assessments.length}</p>
                  <p className="text-sm text-[#4a6e5d] dark:text-brand-100/70">{t('stats.totalAssessments')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg dark:bg-[#0e4a38]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold to-amber-600 flex items-center justify-center text-white">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-900 dark:text-brand-100">
                    {assessments[0]?.recommendations?.[0]?.specialization?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-[#4a6e5d] dark:text-brand-100/70">{t('stats.topRecommendation')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg dark:bg-[#0e4a38]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-900 dark:text-brand-100 truncate max-w-37.5">
                    {session.user.email}
                  </p>
                  <p className="text-sm text-[#4a6e5d] dark:text-brand-100/70">{t('stats.yourAccount')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Assessment CTA */}
        <Card className="border-0 shadow-lg bg-linear-to-r from-brand-900 to-brand-700 text-white mb-8">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{t('newAssessment.title')}</h3>
              <p className="text-brand-100/80">
                {t('newAssessment.subtitle')}
              </p>
            </div>
            <Link href="/questionnaire">
              <Button className="bg-brand-500 text-brand-900 font-semibold hover:bg-white hover:text-brand-900 gap-2 shadow-md transition-all duration-300">
                <Plus className="w-4 h-4" />
                {t('newAssessment.button')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Assessment History */}
        <div>
          <h2 className="text-2xl font-bold text-brand-900 dark:text-brand-100 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-700" />
            {t('history.title')}
          </h2>

          {assessments.length === 0 ? (
            <Card className="border-0 shadow-lg dark:bg-[#0e4a38]">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="w-8 h-8 text-[#4a6e5d]" />
                </div>
                <h3 className="text-lg font-semibold text-brand-900 mb-2">
                  {t('history.empty.title')}
                </h3>
                <p className="text-[#4a6e5d] mb-6">
                  {t('history.empty.subtitle')}
                </p>
                <Link href="/questionnaire">
                  <Button className="gap-2 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700 hover:text-white">
                    <Plus className="w-4 h-4" />
                    {t('history.empty.button')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <Card key={assessment._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-[#0e4a38]">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-4 h-4 text-[#4a6e5d]" />
                          <span className="text-sm text-[#4a6e5d]">
                            {format.dateTime(new Date(assessment.createdAt), {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-brand-900 dark:text-brand-100 mb-2">
                          {t('history.topMatch')}: {assessment.recommendations[0]?.specialization?.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {assessment.recommendations.slice(0, 3).map((rec, index) => (
                            <Badge
                              key={rec.specialization.id}
                              variant={index === 0 ? 'default' : 'secondary'}
                              className={
                                index === 0
                                  ? 'bg-linear-to-r from-brand-900 to-brand-700 text-white'
                                  : 'bg-brand-100 text-brand-700'
                              }
                            >
                              #{index + 1} {rec.specialization.name} ({rec.matchScore}%)
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Link href={`/results/${assessment._id}`} prefetch={false}>
                        <Button variant="outline" className="gap-2 border-[#b8e0d4] text-brand-900 hover:bg-brand-100 dark:border-brand-500/30 dark:text-brand-100 dark:hover:bg-brand-700/30">
                          {t('history.viewDetails')}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
