import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
  BookOpen,
  Brain,
  ChevronRight,
  Lock,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Footer from "../_components/footer";
import Header from "../_components/header";
import SpecializationsGrid from './_components/specializations'

// ─── How it works steps ───────────────────────────────────────────────────────
const HOW_STEPS = [
  { number: "01", key: "step1", icon: BookOpen },
  { number: "02", key: "step2", icon: Brain },
  { number: "03", key: "step3", icon: Target },
  { number: "04", key: "step4", icon: Zap },
];

// ─── Why choose features ──────────────────────────────────────────────────────
const WHY_FEATURES = [
  { key: "transparent", icon: Sparkles },
  { key: "expert", icon: Brain },
  { key: "private", icon: Lock },
  { key: "free", icon: Zap },
];

// ─── FAQ list ─────────────────────────────────────────────────────────────────
const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = ["specializations", "rules", "questions", "accuracy"];

export default async function MorePage() {
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e]">
      <Header session={session} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 glass-card">
            <Sparkles className="w-4 h-4 text-gold" />
            {t("more.badge")}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-900 dark:text-brand-100 leading-tight mb-6">
            {t("more.title")}{" "}
            <span className="bg-clip-text text-yellow-300">
              {t("more.titleHighlight")}
            </span>
          </h1>

          <p className="text-xl text-[#4a6e5d] dark:text-brand-100/70 max-w-2xl mx-auto mb-12">
            {t("more.subtitle")}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100">
                  {t(`more.statsValues.${stat}`)}
                </div>
                <div className="text-sm text-[#4a6e5d] dark:text-brand-100/60 mt-1">
                  {t(`more.stats.${stat}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is Advisor ───────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-50 dark:bg-[#021f15]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100 mb-6">
                {t("more.whatIs.title")}
              </h2>
              <p className="text-[#4a6e5d] dark:text-brand-100/70 leading-relaxed mb-4">
                {t("more.whatIs.description1")}
              </p>
              <p className="text-[#4a6e5d] dark:text-brand-100/70 leading-relaxed">
                {t("more.whatIs.description2")}
              </p>
            </div>

            {/* Visual rule card */}
            <div className="relative">
              <div className="rounded-2xl dark:bg-[#0e4a38] bg-white border border-brand-200 dark:border-brand-700/30 p-8 shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="space-y-4">
                  {[
                    {
                      label: "IF interest = programming",
                      color: "text-yellow-400",
                    },
                    { label: "AND skill = logic", color: "text-brand-400" },
                    {
                      label: "THEN recommend = Computer Science",
                      color: "text-emerald-400",
                    },
                    { label: "WITH confidence = 92%", color: "text-blue-400" },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 font-mono text-sm">
                      <span className="text-brand-400 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={line.color}>{line.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-brand-200 dark:border-brand-700/30">
                  <div className="flex items-center gap-2 text-xs text-[#4a6e5d] dark:text-brand-100/50">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Rule-based inference engine · 70+ active rules
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-20 dark:bg-[#0b3d2e]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100 mb-4">
              {t("more.howItWorks.title")}
            </h2>
            <p className="text-lg text-[#4a6e5d] dark:text-brand-100/70 max-w-2xl mx-auto">
              {t("more.howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {HOW_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center group">
                  {index < HOW_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-linear-to-r from-brand-500 to-brand-700 opacity-30" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-brand-900 to-brand-700 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary ">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-xs font-bold text-brand-400 mb-2 tracking-widest">
                      {step.number}
                    </div>
                    <h3 className="text-base font-semibold text-brand-900 dark:text-brand-100 mb-2">
                      {t(`more.howItWorks.${step.key}.title`)}
                    </h3>
                    <p className="text-sm text-[#4a6e5d] dark:text-brand-100/60 leading-relaxed">
                      {t(`more.howItWorks.${step.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Specializations ──────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-50 dark:bg-[#021f15]">
        <div className="container mx-auto px-4 ">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100 mb-4">
              {t("more.specializations.title")}
            </h2>
            <p className="text-lg text-[#4a6e5d] dark:text-brand-100/70 max-w-2xl mx-auto">
              {t("more.specializations.subtitle")}
            </p>
          </div>
          <SpecializationsGrid />
        </div>
      </section>

      {/* ── Why Choose ───────────────────────────────────────────────────── */}
      <section className="py-20 dark:bg-[#0b3d2e]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100 mb-4">
              {t("more.whyChoose.title")}
            </h2>
            <p className="text-lg text-[#4a6e5d] dark:text-brand-100/70 max-w-2xl mx-auto">
              {t("more.whyChoose.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {WHY_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-primary dark:bg-[#0e4a38] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary ">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-900 to-brand-700 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary ">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-900 dark:text-brand-100 mb-2">
                    {t(`more.whyChoose.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm text-[#4a6e5d] dark:text-brand-100/60 leading-relaxed">
                    {t(`more.whyChoose.${feature.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-50 dark:bg-[#021f15]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100 mb-4">
              {t("more.faq.title")}
            </h2>
            <p className="text-lg text-[#4a6e5d] dark:text-brand-100/70">
              {t("more.faq.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_KEYS.map((key) => (
              <details
                key={key}
                className="group rounded-2xl border border-primary dark:bg-[#0e4a38] overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                  <span className="font-semibold text-brand-900 dark:text-brand-100 pr-4">
                    {t(`more.faq.${key}.question`)}
                  </span>
                  <ChevronRight className="w-5 h-5 text-brand-400 shrink-0 sition-transform duration-200 group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-5">
                  <p className="leading-relaxed text-sm bg-primary/10 rounded-xl px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.13)] dark:bg-primary/10 dark:text-primary/80 dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-primary/30">
                    {t(`more.faq.${key}.answer`)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 dark:bg-[#0b3d2e]">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 glass-card border border-primary/50">
            <Users className="w-4 h-4 text-brand-400" />
            {t("more.badge")}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-brand-900 dark:text-brand-100 mb-4">
            {t("more.cta.title")}
          </h2>
          <p className="text-lg text-[#4a6e5d] dark:text-brand-100/70 mb-10">
            {t("more.cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-lg px-8 dark:bg-primary/20 rounded-full py-6 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary ">
              <Sparkles className="w-5 h-5" />
              {t("more.cta.button")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
