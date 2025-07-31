import ClientProviders from '@/components/providers/ClientProviders'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" style={{ height: '100%' }}>
      <head>
        <title>Gazette - Agrégateur de flux RSS</title>
        <meta name="description" content="Gazette est un agrégateur de flux RSS moderne qui vous permet de découvrir, organiser et partager vos sources d'information préférées." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#606c38" />

        {/* Preload des ressources critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preload des polices critiques */}
        <link
          href="https://fonts.googleapis.com/css2?family=Staatliches&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />

        {/* Preload des icônes critiques */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />

        {/* Optimisations de performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body style={{ height: '100%' }}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
