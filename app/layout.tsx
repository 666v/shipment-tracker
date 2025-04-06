import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "تتبع شحنات SMSA",
  description: "تتبع شحنات SMSA المتعددة في وقت واحد",
    generator: 'Ali Darwish'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={tajawal.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'