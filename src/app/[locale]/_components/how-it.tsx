import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'


/**
 * How it works steps
 */
const STEPS = [
  {
    number: "01",
    key: "step1",
  },
  {
    number: "02",
    key: "step2",
  },
  {
    number: "03",
    key: "step3",
  },
];

async function HowIt() {
  const t = await getTranslations();

  return (
    <section className="py-20 bg-brand-50 dark:bg-[#021f15]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
              {t("landing.howItWorks.title")}
            </h2>
            <p className="text-lg text-[#4a6e5d] max-w-2xl mx-auto">
              {t("landing.howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto ">
            {STEPS.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connection line */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-linear-to-r from-brand-500 to-brand-700 " />
                )}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-brand-900 to-brand-700 flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-brand-900/25 relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-brand-900 mb-2">
                    {t(`landing.howItWorks.${step.key}.title`)}
                  </h3>
                  <p className="text-[#4a6e5d] text-sm">
                    {t(`landing.howItWorks.${step.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/questionnaire">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-full dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700 shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary">
                <Users className="w-5 h-5" />
                {t("landing.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default HowIt