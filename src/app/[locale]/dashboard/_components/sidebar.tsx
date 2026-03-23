import { getUserAssessments } from '@/app/actions/assessment';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import {
  ClipboardList,
    Trophy,
    User,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link'
import { redirect } from 'next/navigation';

export default async function Sidebar({
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

  const { assessments = [] } = await getUserAssessments();

  return (
    <>
    
        <aside className="space-y-4 
        ">
        {/* Stats Cards */}

        <Link href={`/${locale}/dashboard/settings`} className='mb-4 block'>
          <Card className="border border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary">
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                    <User className="size-6" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-brand-900 dark:text-brand-100 truncate max-w-37.5">
                      {session.user.email}
                    </p>
                    <p className="text-sm text-[#4a6e5d] dark:text-brand-100/70">{t('stats.yourAccount')}</p>
                  </div>
                </div>
              </CardContent>
          </Card>
        </Link>

        <Link href={`/${locale}/dashboard/result`} className='block'>
          <Card className="border border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary">
            <CardContent>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  <ClipboardList className="size-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-brand-900 dark:text-brand-100">{assessments.length}</p>
                  <p className="text-sm text-[#4a6e5d] dark:text-brand-100/70">{t('stats.totalAssessments')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

  
          <Card className="border border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary">
            <CardContent>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  <Trophy className="size-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-brand-900 dark:text-brand-100">
                    {assessments[0]?.recommendations?.[0]?.specialization?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-[#4a6e5d] dark:text-brand-100/70">{t('stats.topRecommendation')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </aside>
        </>
  );
}
