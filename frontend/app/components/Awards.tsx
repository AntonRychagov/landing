'use client';

import Image from 'next/image';
import type { Award } from '../../data/types';

interface AwardsProps {
  awards: Award[];
}

export default function Awards({ awards }: AwardsProps): JSX.Element {
  if (awards.length === 0) {
    return (
      <section id="awards" className="py-section bg-background-primary overflow-hidden">
        <div className="section-container">
          <h2 className="text-display-2 font-bold text-center" style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>Награды и достижения</h2>
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              Награды будут добавлены после сбора данных с Instagram
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Group awards by year
  const awardsByYear = awards.reduce((acc, award) => {
    if (!acc[award.year]) {
      acc[award.year] = [];
    }
    acc[award.year].push(award);
    return acc;
  }, {} as Record<number, Award[]>);

  const sortedYears = Object.keys(awardsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id="awards" className="py-section bg-background-primary scroll-mt-20 overflow-hidden" aria-labelledby="awards-heading">
      <div className="section-container">
        <h2 id="awards-heading" className="text-display-2 font-bold text-center" style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>Награды и достижения</h2>

        <div className="space-y-12">
          {sortedYears.map((year) => (
            <section key={year} aria-labelledby={`awards-${year}`}>
              <h3 id={`awards-${year}`} className="text-display-3 font-semibold mb-6 text-text-secondary">
                {year}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
                {awardsByYear[year].map((award) => (
                  <article
                    key={award.id}
                    className="bg-background-secondary border border-border-default p-6 hover:border-text-secondary hover:shadow-lg transition-all duration-300 rounded-lg"
                  >
                    {/* Logo */}
                    {award.logo && (
                      <div className="relative w-16 h-16 mb-4 rounded-md overflow-hidden">
                        <Image
                          src={award.logo}
                          alt={award.festival}
                          fill
                          className="object-contain"
                          sizes="64px"
                          unoptimized={award.logo?.startsWith('http') || false}
                        />
                      </div>
                    )}

                    {/* Award Info */}
                    <h4 className="text-lg font-semibold mb-2">{award.title}</h4>
                    <p className="text-text-secondary text-sm mb-1">{award.festival}</p>
                    <p className="text-text-muted text-xs mb-3">{award.category}</p>

                    {award.description && (
                      <p className="text-text-secondary text-sm">{award.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center" style={{ marginTop: 'clamp(2rem, 5vh, 3rem)', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <div>
            <div className="text-display-2 font-bold text-text-primary">
              {awards.length}
            </div>
            <div className="text-text-secondary text-sm mt-2">Наград</div>
          </div>
          <div>
            <div className="text-display-2 font-bold text-text-primary">
              {sortedYears.length}
            </div>
            <div className="text-text-secondary text-sm mt-2">Лет активности</div>
          </div>
          <div>
            <div className="text-display-2 font-bold text-text-primary">
              {new Set(awards.map((a) => a.festival)).size}
            </div>
            <div className="text-text-secondary text-sm mt-2">Фестивалей</div>
          </div>
          <div>
            <div className="text-display-2 font-bold text-text-primary">
              {new Set(awards.map((a) => a.category)).size}
            </div>
            <div className="text-text-secondary text-sm mt-2">Категорий</div>
          </div>
        </div>
      </div>
    </section>
  );
}
