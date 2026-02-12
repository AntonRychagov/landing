import Link from 'next/link';
import { portfolioData } from '../data/portfolio-data';
import Footer from './components/Footer';

export default function NotFound(): JSX.Element {
  return (
    <main className="min-h-screen bg-background-primary text-text-primary pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-display-1 font-bold mb-6">404</h1>
        <h2 className="text-display-2 font-bold mb-6">Страница не найдена</h2>
        <p className="text-lg text-text-secondary mb-8">
          К сожалению, запрашиваемая страница не существует. Возможно, она была перемещена или
          удалена.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-text-primary text-background-primary font-semibold hover:bg-text-secondary transition-colors rounded-lg"
          >
            На главную
          </Link>
          <Link
            href="/#portfolio"
            className="px-8 py-4 border-2 border-text-primary text-text-primary font-semibold hover:bg-text-primary hover:text-background-primary transition-colors rounded-lg"
          >
            Портфолио
          </Link>
        </div>
      </div>
      <Footer contact={portfolioData.contact} name={portfolioData.personal.name} />
    </main>
  );
}
