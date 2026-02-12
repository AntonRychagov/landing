import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from './components/Header';
import { WebVitals } from './components/WebVitals';
import { portfolioData } from '../data/portfolio-data';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Veli Eva - Сценарист и Режиссёр',
    template: '%s | Veli Eva',
  },
  description: 'Промо-лендинг сценариста и режиссера. Портфолио проектов, контакты.',
  keywords: ['сценарист', 'режиссер', 'кино', 'фильмы', 'портфолио', 'Veli Eva'],
  authors: [{ name: 'Veli Eva', url: siteUrl }],
  creator: 'Veli Eva',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Veli Eva',
    title: 'Veli Eva - Сценарист и Режиссер',
    description: 'Промо-лендинг сценариста и режиссера. Портфолио проектов, контакты.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veli Eva - Сценарист и Режиссер',
    description: 'Промо-лендинг сценариста и режиссера. Портфолио проектов, контакты.',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ru" className="dark scroll-smooth">
      <body className="bg-background-primary text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-text-primary focus:text-background-primary focus:rounded-lg"
        >
          Перейти к основному содержимому
        </a>
        <Header name={portfolioData.personal.name} />
        <main id="main-content">{children}</main>
        <WebVitals />
      </body>
    </html>
  );
}
