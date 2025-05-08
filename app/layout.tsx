import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoftSell - Turn Unused Software Licenses Into Cash",
  description:
    "SoftSell helps businesses recover value from unused or excess software licenses. Get fair market value quickly and securely.",
  keywords: "software resale, license resale, software license marketplace, sell unused licenses",
  authors: [{ name: "SoftSell" }],
  openGraph: {
    title: "SoftSell - Turn Unused Software Licenses Into Cash",
    description:
      "SoftSell helps businesses recover value from unused or excess software licenses. Get fair market value quickly and securely.",
    url: "https://softsell.com",
    siteName: "SoftSell",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftSell - Turn Unused Software Licenses Into Cash",
    description:
      "SoftSell helps businesses recover value from unused or excess software licenses. Get fair market value quickly and securely.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://bcassetcdn.com/public/blog/wp-content/uploads/2022/11/09184213/software-company-cube-by-mypen-brandcrowd.png" type="image/svg+xml" />
        <link rel="icon" href="https://bcassetcdn.com/public/blog/wp-content/uploads/2022/11/09184213/software-company-cube-by-mypen-brandcrowd.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
