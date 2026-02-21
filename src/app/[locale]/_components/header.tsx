"use client"

import { useState } from "react"
import Logo from "@/components/shared/logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import AuthButtons from "./auth-buttons"
import { Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header({ session }: { session: any }) {
  const [open] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md dark:bg-background/70 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <AuthButtons session={session} />
        </nav>

         {/* Mobile controls outside menu */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          
          {/* Mobile Dropdown Menu for AuthButtons */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-9 h-9 rounded-xl flex justify-center items-center hover:bg-accent hover:text-accent-foreground"
                aria-label="Open menu"
              >
                {open ? <X /> : <Menu />}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className='flex flex-col items-center gap-2'>
              <DropdownMenuItem asChild >
                  <AuthButtons session={session} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}