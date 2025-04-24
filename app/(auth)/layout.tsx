import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/app/components/mode-toggle"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="relative min-h-screen flex flex-col">
        <header className="absolute top-0 right-0 p-4">
          <ModeToggle />
        </header>
        <div className="flex-1 flex items-center justify-center">
          <Link href="/" className="absolute top-4 left-4 text-xl font-bold">
            Multitasking
          </Link>
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}
