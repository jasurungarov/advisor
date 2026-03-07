import { getAssessmentById } from '@/app/actions/assessment'
import { RecommendationCard } from '@/components/results/RecommendationCard'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { FaAngleLeft } from 'react-icons/fa6'

interface Props {
  // params endi Promise sifatida keladi
  params: Promise<{
    assessmentId: string
    locale: string // agar [locale] papkasi ichida bo'lsa buni ham qo'shgan ma'qul
  }>
}

export default async function Page({ params }: Props) {
  // 1. params'ni kutib olamiz (Unwrap)
  const resolvedParams = await params
  const assessmentId = resolvedParams.assessmentId

  const t = await getTranslations('last')
  
  // 2. Endi to'g'ri ID bilan murojaat qilamiz
  const result = await getAssessmentById(assessmentId)
  
  if (!result.success || !result.assessment) {
    return (
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold">{t('noAssessment.title')}</h2>
        {/* ID ni tekshirish uchun (ixtiyoriy debug) */}
        <p className="text-gray-500">ID: {assessmentId}</p>
      </div>
    )
  }
  
  const assessment = result.assessment
  

  return (
    <div className="mx-auto p-4">
  <div className="relative flex items-center justify-center mb-6">
    <Link 
      href="/dashboard/result" 
      className="absolute left-0 flex items-center text-brand-700 hover:text-brand-900 transition-colors"
      title="back"
    >
      <FaAngleLeft className="w-6 h-6 text-brand-700 dark:text-brand-400 group-hover:-translate-x-1 transition-transform" />
    </Link>
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-2xl md:text-4xl font-extrabold text-brand-900 dark:text-white tracking-tight">
        {t('title')}
      </h2>
      <p className="text-sm md:text-base text-[#4a6e5d] dark:text-brand-100/70 max-w-md leading-relaxed">
        {t('subtitle')}
      </p>
    </div>
  </div>


      {/* Main Content */}
      <main className="container mx-auto">
        {/* Recommendation Cards - RecommendationCard komponentidan foydalanamiz */}
        <div className="space-y-6 max-w-full mx-auto">
          {assessment.recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.specialization.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      </main>
    </div>
  )
}