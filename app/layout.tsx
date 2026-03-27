import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import Loading from "@/components/loading"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Katia & Adel - 17 Avril 2026",
  description: "Rejoins-nous pour célébrer notre mariage.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${lato.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <Suspense fallback={<Loading />}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
