import { Metadata, Viewport } from 'next'
import { Poppins, Staatliches } from 'next/font/google'
import ClientProviders from '@/components/providers/ClientProviders'

// Configuration des polices avec next/font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
})

const staatliches = Staatliches({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-staatliches',
  preload: true,
})

// Metadata essentielles pour le layout root
export const metadata: Metadata = {
  title: {
    default: 'Gazette',
    template: '%s | Gazette',
  },
  description: 'Agrégateur de flux RSS moderne',
}

// Viewport essentiel
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${staatliches.variable}`}
      suppressHydrationWarning
    >
      <body className={poppins.className} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
