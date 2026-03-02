/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from '@/components/ThemeProvider'
import { routing } from '@/i18n/routing'
import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Geist, Geist_Mono, Lora } from "next/font/google"
import { notFound } from 'next/navigation'
import "../globals.css"
import { toast } from 'sonner';

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Academic Compass — Smart Specialization Advisor",
    template: "%s | Academic Compass",
  },

  description:
    "Academic Compass is an intelligent expert system that analyzes your interests, skills, and career goals to recommend the most suitable academic specialization with clarity and confidence.",

  keywords: [
    "academic specialization",
    "expert system",
    "career guidance",
    "course advisor",
    "education technology",
    "student decision support",
  ],

  applicationName: "Academic Compass",
  authors: [{ name: "Ungarov Academy Team" }],
  generator: "Next.js",

  icons: {
    icon: "/ac-logo.png",
    shortcut: "/ac-logo.png",
    apple: "/ac-logo.png",
  },

  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "Academic Compass — Smart Academic Specialization",
    description:
      "Discover the best academic path for you using an intelligent rule-based expert system.",
    url: "https://your-domain.com",
    siteName: "Academic Compass",
    images: [
      {
        url: "/ac-logo.png",
        width: 1200,
        height: 630,
        alt: "Academic Compass Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Academic Compass — Smart Specialization Advisor",
    description:
      "An expert system that helps students choose the right academic specialization.",
    images: ["/ac-logo.png"],
  },
};

/**
 * Blocking inline script that runs before paint to prevent theme flicker.
 * Reads localStorage → falls back to system preference → applies `dark` class.
 */

const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('theme-preference');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = saved === 'dark' || (saved !== 'light' && prefersDark);
    if (isDark) document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
