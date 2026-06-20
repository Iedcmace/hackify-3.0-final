import { Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'Hackify 3.O — Hack To Defy',
  description:
    'A 36-hour national level war-tech hackathon to predict, protect & rebuild. Presented by IEDC MACE.',
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0c08',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${orbitron.variable} ${rajdhani.variable} bg-background`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Black+Ops+One&display=swap" 
          rel="stylesheet" 
        />
        
        {/* ADD THIS EXACT LINE TO THE HEAD */}
        <script defer async src="https://apply.devfolio.co/v2/sdk.js"></script>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
