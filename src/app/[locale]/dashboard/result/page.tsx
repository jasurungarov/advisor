
import {
    ArrowRight,
    BarChart3,
    Calendar,
    ClipboardList,
    Plus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getFormatter, getTranslations } from 'next-intl/server'
import { getUserAssessments } from '@/app/actions/assessment'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaAngleLeft } from 'react-icons/fa6'
import Delete from './_components/delete'


async function Page({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  
  const t = await getTranslations('dashboard');
  const format = await getFormatter();
  const { assessments = [] } = await getUserAssessments();



  return (
    <div className="mx-auto top-0">
      <div className="relative flex items-center justify-center mb-6">
        <Link href="/dashboard" title='back' className="absolute left-0 flex items-center text-brand-700 hover:text-brand-900 transition-colors">
          <FaAngleLeft className="w-6 h-6" />
        </Link>
        <h1 className="flex items-center gap-2 text-2xl md:text-4xl font-bold">
          <BarChart3 className="size-8" />
          {t('history.title')}
        </h1>
      </div>

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
                  <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-full dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary shadow">
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

                      <div className="flex flex-col gap-2 md:items-end">
                      <Link href={`/dashboard/result/${assessment._id}`} prefetch={false}>
                        <Button variant="outline"
                          size="lg" className="gap-2 rounded-full dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700 shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary shadow">
                          {t('history.viewDetails')}
                          <ArrowRight className="w-4 h-4"/>
                        </Button>
                      </Link>
                        <Delete id={assessment._id} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
  )
}

export default Page