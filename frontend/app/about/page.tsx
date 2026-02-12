import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioData } from '../../data/portfolio-data';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: `О себе - ${portfolioData.personal.name}`,
  description: portfolioData.personal.bio,
};

export default function AboutPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background-primary text-text-primary pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] mb-12">
        <div className="relative w-full h-full">
          {portfolioData.personal.profileImages && portfolioData.personal.profileImages[0] && (
            <Image
              src={portfolioData.personal.profileImages[0]}
              alt={portfolioData.personal.name}
              fill
              className="object-cover"
              priority
              unoptimized={portfolioData.personal.profileImages[0]?.startsWith('http') || false}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-12">
          <h1 className="text-display-1 font-bold mb-4">{portfolioData.personal.name}</h1>
          <div className="flex flex-wrap gap-4 text-lg text-text-secondary">
            {portfolioData.personal.profession.map((prof, index) => (
              <span key={index}>
                {prof}
                {index < portfolioData.personal.profession.length - 1 && (
                  <span className="mx-2">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-section">
        {/* Bio Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            {portfolioData.personal.profileImages && portfolioData.personal.profileImages[1] && (
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden">
                <Image
                  src={portfolioData.personal.profileImages[1]}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={portfolioData.personal.profileImages[1]?.startsWith('http') || false}
                />
              </div>
            )}

            {/* Bio */}
            <div>
              <h2 className="text-display-2 font-bold mb-6">О себе</h2>
              <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                <p>{portfolioData.personal.bio}</p>
                {portfolioData.personal.fullName && (
                  <p className="text-text-muted">{portfolioData.personal.fullName}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        {portfolioData.personal.education && portfolioData.personal.education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-display-2 font-bold mb-8">Образование</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {portfolioData.personal.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-background-secondary border border-border-default p-6 rounded-lg"
                >
                  <p className="text-text-secondary">{edu}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Philosophy */}
        {portfolioData.personal.philosophy && (
          <section className="mb-16">
            <h2 className="text-display-2 font-bold mb-6">Философия творчества</h2>
            <div className="bg-background-secondary border border-border-default p-8 rounded-lg">
              <p className="text-xl text-text-secondary leading-relaxed italic">
                &ldquo;{portfolioData.personal.philosophy}&rdquo;
              </p>
            </div>
          </section>
        )}

        {/* Interests */}
        {portfolioData.personal.interests && portfolioData.personal.interests.length > 0 && (
          <section className="mb-16">
            <h2 className="text-display-2 font-bold mb-6">Интересы</h2>
            <div className="flex flex-wrap gap-4">
              {portfolioData.personal.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-background-secondary text-text-secondary rounded-lg"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="mb-16">
          <h2 className="text-display-2 font-bold mb-8">Статистика</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-background-secondary border border-border-default p-6 rounded-lg text-center">
              <div className="text-display-2 font-bold text-text-primary mb-2">
                {portfolioData.projects.length}
              </div>
              <div className="text-text-secondary text-sm">Проектов</div>
            </div>
            <div className="bg-background-secondary border border-border-default p-6 rounded-lg text-center">
              <div className="text-display-2 font-bold text-text-primary mb-2">
                {portfolioData.projects.filter((p) => p.videoUrl).length}
              </div>
              <div className="text-text-secondary text-sm">Видео</div>
            </div>
            <div className="bg-background-secondary border border-border-default p-6 rounded-lg text-center">
              <div className="text-display-2 font-bold text-text-primary mb-2">
                {new Set(portfolioData.projects.map((p) => p.year)).size}
              </div>
              <div className="text-text-secondary text-sm">Лет работы</div>
            </div>
            <div className="bg-background-secondary border border-border-default p-6 rounded-lg text-center">
              <div className="text-display-2 font-bold text-text-primary mb-2">
                {portfolioData.personal.followers
                  ? (portfolioData.personal.followers / 1000).toFixed(1) + 'K'
                  : '—'}
              </div>
              <div className="text-text-secondary text-sm">Подписчиков</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-display-2 font-bold mb-6">Готовы работать вместе?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Свяжитесь со мной для обсуждения вашего проекта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-text-primary text-background-primary font-semibold hover:bg-text-secondary transition-colors rounded-lg"
            >
              Связаться
            </Link>
            <Link
              href="/#portfolio"
              className="px-8 py-4 border-2 border-text-primary text-text-primary font-semibold hover:bg-text-primary hover:text-background-primary transition-colors rounded-lg"
            >
              Посмотреть работы
            </Link>
          </div>
        </section>
      </div>

      <Footer contact={portfolioData.contact} name={portfolioData.personal.name} />
    </main>
  );
}
