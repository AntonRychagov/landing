'use client';

import Image from 'next/image';
import type { Testimonial } from '../../data/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps): JSX.Element {
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-section bg-background-secondary overflow-hidden">
        <div className="section-container">
          <h2 className="text-display-2 font-bold text-center" style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>Отзывы</h2>
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              Отзывы будут добавлены после сбора данных с Instagram
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-section bg-background-secondary scroll-mt-20 overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="section-container">
        <h2 id="testimonials-heading" className="text-display-2 font-bold text-center" style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>Отзывы и пресса</h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8" role="list" style={{ gap: 'clamp(1.5rem, 4vw, 2rem)' }}>
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-background-primary border border-border-default p-6 md:p-8 hover:border-text-secondary hover:shadow-lg transition-all duration-300 rounded-lg min-w-0"
              role="listitem"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-text-muted mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg text-text-secondary leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {testimonial.logo && (
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={testimonial.logo}
                      alt={testimonial.publication || testimonial.author}
                      fill
                      className="object-contain"
                      sizes="48px"
                      unoptimized={testimonial.logo?.startsWith('http') || false}
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-text-primary">
                    {testimonial.author}
                  </div>
                  {testimonial.role && (
                    <div className="text-sm text-text-secondary">{testimonial.role}</div>
                  )}
                  {testimonial.publication && (
                    <div className="text-sm text-text-muted">{testimonial.publication}</div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
