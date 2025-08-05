import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/analytics'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Tuhin Chakrabarty - Full-Stack Developer | AI/ML Enthusiast',
    template: '%s | Tuhin Chakrabarty'
  },
  description: 'Software Engineer at Bank of America, passionate about modern web technologies, AI/ML, and scalable applications. Full-Stack Developer with expertise in React, Angular, Python, and AI/ML.',
  keywords: ['Full-Stack Developer', 'AI/ML Engineer', 'React', 'Angular', 'Python', 'Machine Learning', 'Bank of America', 'Software Engineer'],
  authors: [{ name: 'Tuhin Chakrabarty' }],
  creator: 'Tuhin Chakrabarty',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tuhin-dev.lovable.app',
    title: 'Tuhin Chakrabarty - Full-Stack Developer | AI/ML Enthusiast',
    description: 'Software Engineer at Bank of America, passionate about modern web technologies, AI/ML, and scalable applications.',
    siteName: 'Tuhin Chakrabarty Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tuhin Chakrabarty - Full-Stack Developer | AI/ML Enthusiast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tuhin Chakrabarty - Full-Stack Developer | AI/ML Enthusiast',
    description: 'Software Engineer at Bank of America, passionate about modern web technologies, AI/ML, and scalable applications.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
} 