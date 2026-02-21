import { Card, CardContent } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server'
import { Brain, Lightbulb, Shield, Target } from 'lucide-react'


/**
 * Feature cards data
 */
const FEATURES = [
  {
    icon: Brain,
    key: "smartAnalysis",
    color: "from-brand-900 to-brand-700",
  },
  {
    icon: Target,
    key: "personalized",
    color: "from-brand-700 to-brand-700",
  },
  {
    icon: Lightbulb,
    key: "explainable",
    color: "from-brand-900 to-brand-700",
  },
  {
    icon: Shield,
    key: "privacy",
    color: "from-brand-900 to-brand-700",
  },
];

async function Features() {
  const t = await getTranslations();

  return (
   <section className="py-20  dark:bg-[#0b3d2e]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
              {t("landing.features.title")}
            </h2>
            <p className="text-lg text-[#4a6e5d] max-w-2xl mx-auto">
              {t("landing.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <Card
                key={index}
                className="border-0 hover:-translate-y-1 dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary ">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary `}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-900 mb-2">
                    {t(`landing.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-[#4a6e5d] text-sm leading-relaxed">
                    {t(`landing.features.${feature.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Features