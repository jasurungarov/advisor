import { logoutUser } from "@/app/actions/auth";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Logo from "@/components/shared/logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { redirect } from "@/i18n/routing";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
import MobileSidebar from "./_components/mobile-sidebar";
import Sidebar from "./_components/sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("dashboard");

  const session = await auth();

  if (!session?.user) {
    redirect({ href: "/login", locale });
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-brand-50 via-white to-brand-100 dark:from-[#021f15] dark:via-[#021f15] dark:to-[#0b3d2e] ">
      {/* Header */}
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
        <div className="flex justify-between w-[95%] max-w-7xl px-6 py-3 rounded-2xl glass-navbar transition-all duration-300">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#4a6e5d] hidden md:block">
              {t.rich("welcome", {
                name: session?.user?.name || "",
                strong: (chunks) => (
                  <strong className="text-brand-900">{chunks}</strong>
                ),
              })}
            </span>
            <ThemeToggle />
            <LanguageSwitcher />
            <form action={logoutUser}>
              <Button
                size="sm"
                variant="outline"
                type="submit"
                className="gap-2 rounded-full dark:bg-primary/20 bg-brand-500 text-brand-900 font-semibold hover:bg-brand-700  shadow-brand-500/30 border border-primary transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-primary dark:hover:shadow-primary">
                <LogOut className="w-4 h-4" />
                {t("nav.signOut")}
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 justify-center items-center max-w-7xl mx-auto w-full p-4 hidden md:flex">
        <aside className="hidden md:block w-64 border-r p-2 sticky top-26 self-start h-max">
          <Sidebar params={params} />
        </aside>

        <main className="flex-1 p-4 w-full mt-24">{children}</main>
      </div>

      <div className="flex flex-col mx-auto w-full p-6 md:hidden">
        <div className="sticky top-26 flex justify-center mx-auto h-max mb-4">
          <MobileSidebar params={params} />
        </div>

        <main className="flex-1 mt-20">{children}</main>
      </div>
    </div>
  );
}
