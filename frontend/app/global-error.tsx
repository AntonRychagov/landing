'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps): JSX.Element {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="ru" className="dark">
      <body className="bg-background-primary text-text-primary antialiased">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-display-1 font-bold mb-6">Критическая ошибка</h1>
            <p className="text-lg text-text-secondary mb-8">
              Произошла критическая ошибка при загрузке приложения. Пожалуйста, обновите страницу.
            </p>
            {error.message && (
              <div className="mb-8 p-4 bg-background-secondary border border-border-default rounded-lg text-left">
                <p className="text-sm text-text-muted mb-2">Детали ошибки:</p>
                <p className="text-sm text-text-secondary font-mono">{error.message}</p>
              </div>
            )}
            <button
              onClick={reset}
              className="px-8 py-4 bg-text-primary text-background-primary font-semibold hover:bg-text-secondary transition-colors rounded-lg"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
