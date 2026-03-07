import { Button } from '@/components/ui/button'
import { BookOpen, ChevronRight, Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

async function Hero() {
  const t = await getTranslations();
  
  return (
    <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32 pt-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 glass-card">
              <Sparkles className="w-4 h-4 text-gold" />
              {t("landing.badge")}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-900 dark:text-brand-100 leading-tight mb-6">
              {t("landing.title")}
              <span className="block bg-clip-text  text-yellow-300">
                {t("landing.titleHighlight")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[#4a6e5d] dark:text-brand-100/70 max-w-2xl mx-auto mb-10">
              {t("landing.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/more">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-lg px-8 dark:bg-primary/20 rounded-full py-6 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary"
              >
                <BookOpen className="w-5 h-5" />
                {t('landing.learnMore')}
              </Button>
              </Link>
              <Link href="/questionnaire">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-lg px-8 dark:bg-primary/20 rounded-full py-6 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary ">
                  {t("landing.startAssessment")}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto ">
              <div className="text-center ">
                <div className="text-3xl font-bold text-brand-900">10+</div>
                <div className="text-sm text-[#4a6e5d] ">
                  {t("landing.stats.specializations")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-900">70+</div>
                <div className="text-sm text-[#4a6e5d]">
                  {t("landing.stats.rules")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-900">15</div>
                <div className="text-sm text-[#4a6e5d]">
                  {t("landing.stats.questions")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero