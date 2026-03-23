import { getUserAssessments } from "@/app/actions/assessment";
import { auth } from "@/lib/auth";
import { ClipboardList, Trophy, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MobileSidebar({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const t = await getTranslations("dashboard");
  const { assessments = [] } = await getUserAssessments();

  const topRec =
    assessments[0]?.recommendations?.[0]?.specialization?.name || null;

  const navItems = [
    {
      href: `/${locale}/dashboard/settings`,
      icon: User,
      label: t("stats.yourAccount"),
      meta: session.user.name?.split(" ")[0] ?? session.user.email ?? "",
    },
    {
      href: `/${locale}/dashboard/result`,
      icon: ClipboardList,
      label: t("stats.totalAssessments"),
      meta: String(assessments.length),
    },
    {
      href: `#`,
      icon: Trophy,
      label: t("stats.topRecommendation"),
      meta: topRec ?? "—",
    },
  ];

  return (
    <nav
      aria-label="Dashboard navigation"
      className="flex flex-row items-center gap-2 px-1"
    >
      {navItems.map(({ href, icon: Icon, label, meta }) => (
        <Link
          key={href}
          href={href}
          className="group relative flex flex-col items-center"
        >
          {/* Pill button */}
          <div
            className="
              flex items-center gap-2.5
              p-2
              rounded-full
              border border-primary/40
              bg-white/60 dark:bg-[#0e4a38]/80
              backdrop-blur-sm
              transition-all duration-200
              hover:border-primary
              hover:bg-white dark:hover:bg-[#0e4a38]
              hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]
              dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]
              active:scale-95
            "
          >
            {/* Icon */}
            <div className="w-6 h-6 rounded-lg bg-linear-to-br from-brand-900 to-brand-700 flex items-center justify-center shrink-0 shadow-sm">
              <Icon className="size-3"/>
            </div>

            {/* Text */}
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[9px] font-medium text-[#4a6e5d] dark:text-brand-100/60 uppercase tracking-wide whitespace-nowrap">
                {label}
              </span>
              <span className="text-xs font-semibold text-brand-900 dark:text-brand-100 truncate max-w-16">
                {meta}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </nav>
  );
}
