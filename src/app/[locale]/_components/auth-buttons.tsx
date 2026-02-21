"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogIn, UserPlus } from "lucide-react"
import { Link } from "@/i18n/routing"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthButtons({ session }: { session: any }) {
  if (session?.user) {
    return (
      <Link href="/dashboard">
        <Button variant="ghost" className="gap-2">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Button>
      </Link>
    )
  }

  return (
    <>
      <Link href="/login">
        <Button variant="ghost" className="gap-2">
          <LogIn className="w-4 h-4" />
          Sign in
        </Button>
      </Link>
      <Link href="/register">
        <Button className="gap-2 bg-brand-900 text-brand-50 hover:bg-brand-700">
          <UserPlus className="w-4 h-4" />
          Sign up
        </Button>
      </Link>
    </>
  )
}