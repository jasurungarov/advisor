"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Logo from "@/components/shared/logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import AuthButtons from "./auth-buttons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ session }: { session: any }) {
  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <div className="w-[95%] max-w-7xl px-6 py-3 rounded-2xl glass-navbar transition-all duration-300">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <AuthButtons session={session} />
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                    w-9 h-9
                    flex items-center justify-center"
                  aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
                  mt-3
                  p-4
                  rounded-xl

                  bg-white/10 dark:bg-white/5
                  backdrop-blur-2xl

                  border border-white/20 dark:border-white/10
                  shadow-xl

                  flex flex-col gap-3
                ">
                <AuthButtons session={session} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
