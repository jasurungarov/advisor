/**
 * User Dashboard Page
 * 
 * Displays user profile and assessment history.
 */

import { getUserAssessments } from '@/app/actions/assessment';
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
    Plus,
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
    <>
      {/* Main Content */}
      <main className="mx-auto px-8 gap-8">
        <div className="col-span-9">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-center text-center flex-col">
          <h1 className="text-4xl font-bold text-brand-900 dark:text-brand-100 mb-2">
            {t('welcome', { name: session.user.name?.split(' ')[0] || '' })}
          </h1>
          <p className="text-[#4a6e5d] dark:text-brand-100/70">
            {t('subtitle')}
          </p>
        </div>


        {/* New Assessment CTA */}
        <Card className="border border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-xl mb-8">
          <CardContent className="py-2 gap-1 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">{t('newAssessment.title')}</h3>
              <p className="text-brand-100/80">
                {t('newAssessment.subtitle')}
              </p>
            </div>
            <Link href="/questionnaire">
              <Button className="gap-2 dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary shadow">
                <Plus className="w-4 h-4" />
                {t('newAssessment.button')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Assessment History */}
        <div>
          <h2 className="text-2xl font-bold p-2 mb-4 flex items-center gap-2">
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
                  <Button className="gap-2 dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary shadow">
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
                        <Button variant="outline" className="gap-2 dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary shadow">
                          {t('history.viewDetails')}
                          <ArrowRight className="w-4 h-4"/>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        </div>
      </main>
    </>
  );
}
