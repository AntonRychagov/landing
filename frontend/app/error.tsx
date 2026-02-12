'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { portfolioData } from '../data/portfolio-data';
import Footer from './components/Footer';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background-primary text-text-primary pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-display-1 font-bold mb-6">Что-то пошло не так</h1>
        <p className="text-lg text-text-secondary mb-8">
          Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу или
          вернуться на главную.
        </p>
        {error.message && (
          <div className="mb-8 p-4 bg-background-secondary border border-border-default rounded-lg text-left">
            <p className="text-sm text-text-muted mb-2">Детали ошибки:</p>
            <p className="text-sm text-text-secondary font-mono">{error.message}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-text-primary text-background-primary font-semibold hover:bg-text-secondary transition-colors rounded-lg"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="px-8 py-4 border-2 border-text-primary text-text-primary font-semibold hover:bg-text-primary hover:text-background-primary transition-colors rounded-lg"
          >
            На главную
          </Link>
        </div>
      </div>
      <Footer contact={portfolioData.contact} name={portfolioData.personal.name} />
    </main>
  );
}
