import "./globals.css";

export const metadata = {
  title: "HACKIFY '26 | WARTECH COMMAND",
  description: "36-Hour National Sprint operated by IEDC MACE & KSUM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Directly pre-loading Google Fonts so the CSS compiler doesn't crash! */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Black+Ops+One&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}