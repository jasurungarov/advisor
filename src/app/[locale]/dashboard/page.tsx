/**
 * User Dashboard Page
 * 
 * Displays user profile and assessment history.
 */

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('dashboard');
  
  const session = await auth();
  
  if (!session?.user) {
    redirect(`/${locale}/login`);
  }


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
              <Button 
                variant="outline"
                size="lg" className="gap-2 rounded-full dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary shadow">
                <Plus className="w-4 h-4" />
                {t('newAssessment.button')}
              </Button>
            </Link>
          </CardContent>
        </Card>
        </div>
      </main>
    </>
  );
}
