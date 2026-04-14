import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://black-hole-react-zkra.vercel.app/'),
  title: 'Cosmic Explorer | Black Hole Research',
  description: 'Advanced scientific exploration of cosmic phenomena',
  keywords: ['black holes', 'astrophysics', 'cosmology', 'space'],
  authors: [{ name: 'VIVEK' }],
  creator: 'Cosmic Explorer',
  publisher: 'Cosmic Explorer',
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
