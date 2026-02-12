'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import type { PortfolioProject } from '../../data/types';
import { initScrollAnimations } from '../utils/scrollAnimations';

interface PortfolioProps {
  projects: PortfolioProject[];
}

export default function Portfolio({ projects }: PortfolioProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(3);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Определяем количество видимых карточек в зависимости от размера экрана
  useEffect(() => {
    const updateCardsVisible = (): void => {
      const width = window.innerWidth;
      if (width < 640) {
        // Мобильные устройства: 1 карточка
        setCardsVisible(1);
      } else if (width < 1024) {
        // Планшеты: 2 карточки
        setCardsVisible(2);
      } else {
        // Десктоп: 3 карточки
        setCardsVisible(3);
      }
    };

    updateCardsVisible();
    window.addEventListener('resize', updateCardsVisible);
    return () => window.removeEventListener('resize', updateCardsVisible);
  }, []);

  // Проверяем предпочтения пользователя по анимации
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent): void => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    initScrollAnimations();
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const roleLabels = useMemo<Record<string, string>>(
    () => ({
      director: 'Режиссер',
      screenwriter: 'Сценарист',
      both: 'Режиссер, Сценарист',
    }),
    []
  );

  // Используем IntersectionObserver и scroll события для определения активного слайда
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || projects.length === 0) return;

    const updateActiveIndex = (): void => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentIndex((prevIndex) => {
        // Обновляем только если индекс действительно изменился
        return closestIndex !== prevIndex ? closestIndex : prevIndex;
      });
    };

    const updateScrollState = (): void => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const threshold = 1;
      setCanScrollLeft(scrollLeft > threshold);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - threshold);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Находим элемент с наибольшим intersectionRatio
        let maxRatio = 0;
        let activeIndex = -1;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const index = itemRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              activeIndex = index;
            }
          }
        });

        if (maxRatio > 0.3 && activeIndex !== -1) {
          setCurrentIndex((prevIndex) => {
            return activeIndex !== prevIndex ? activeIndex : prevIndex;
          });
        }
      },
      {
        root: container,
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '0px',
      }
    );

    // Наблюдаем только существующие элементы
    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    // Простой обработчик скролла с RAF для плавности
    let rafId: number | null = null;
    const handleScroll = (): void => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateActiveIndex();
          updateScrollState();
          rafId = null;
        });
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Инициализация с использованием requestAnimationFrame для надежности
    const initId = requestAnimationFrame(() => {
      updateActiveIndex();
      updateScrollState();
    });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      cancelAnimationFrame(initId);
      observer.disconnect();
    };
  }, [projects.length]);

  const getScrollMetrics = useCallback(() => {
    const container = scrollRef.current;
    if (!container || projects.length === 0) return null;
    const gap = 12;
    const cardsShown = Math.min(cardsVisible, projects.length);
    const cardWidth = (container.clientWidth - gap * (cardsShown - 1)) / cardsShown;
    return { gap, cardWidth, cardsShown };
  }, [projects.length, cardsVisible]);

  // Функция для прокрутки к конкретному индексу
  const scrollToIndex = useCallback((index: number): void => {
    const container = scrollRef.current;
    const item = itemRefs.current[index];
    if (!container || !item) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;
    const itemLeft = itemRect.left - containerRect.left + scrollLeft;

    // Используем нативный smooth scroll
    container.scrollTo({
      left: itemLeft,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [prefersReducedMotion]);

  // Навигация стрелками
  const scrollBy = useCallback(
    (direction: 'left' | 'right'): void => {
      const container = scrollRef.current;
      if (!container) return;

      const metrics = getScrollMetrics();
      if (!metrics) return;
      const { gap, cardWidth, cardsShown } = metrics;
      const step = (cardWidth + gap) * cardsShown;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      let targetScroll: number;
      if (direction === 'left') {
        targetScroll = Math.max(0, currentScroll - step);
      } else {
        targetScroll = Math.min(maxScroll, currentScroll + step);
      }

      container.scrollTo({
        left: targetScroll,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion, getScrollMetrics]
  );

  // Поддержка клавиатурной навигации
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      // Проверяем, что фокус находится внутри карусели
      if (!container.contains(document.activeElement)) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          scrollBy('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          scrollBy('right');
          break;
        case 'Home':
          e.preventDefault();
          scrollToIndex(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToIndex(projects.length - 1);
          break;
        case 'PageUp':
          e.preventDefault();
          scrollBy('left');
          break;
        case 'PageDown':
          e.preventDefault();
          scrollBy('right');
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [scrollBy, scrollToIndex, projects.length]);

  // Вычисляем ширину карточки для адаптивности
  const getCardWidth = useCallback((): string => {
    if (cardsVisible === 1) {
      // На мобильных показываем часть следующей карточки (peek effect)
      return 'w-[calc(100%-24px)] min-w-[calc(100%-24px)] sm:w-full sm:min-w-full';
    } else if (cardsVisible === 2) {
      return 'w-[calc(50%-6px)] min-w-[calc(50%-6px)]';
    } else {
      return 'w-[calc(33.333%-8px)] min-w-[calc(33.333%-8px)]';
    }
  }, [cardsVisible]);

  return (
    <>
      <section id="portfolio" className="py-section bg-background-primary scroll-mt-20" aria-labelledby="portfolio-heading">
        <div className="section-container max-w-5xl">
          <h2 
            id="portfolio-heading" 
            className="text-display-2 font-bold text-center text-text-primary scroll-fade-in" 
            style={{ 
              marginBottom: 'clamp(2rem, 5vh, 3rem)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              fontWeight: 700
            }}
          >
            Портфолио
          </h2>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p 
                className="text-text-secondary"
                style={{
                  fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                  lineHeight: '1.6',
                  letterSpacing: '0.01em',
                  fontWeight: 300,
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                Проекты будут добавлены после сбора данных с Instagram
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative">
              {/* Стрелки навигации - скрываем на мобильных, так как используется swipe */}
              <button
                type="button"
                onClick={() => scrollBy('left')}
                className="hidden sm:flex flex-shrink-0 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full border bg-background-secondary border-border-default text-text-primary hover:border-text-secondary hover:bg-background-accent hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                aria-label="Предыдущие проекты"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Контейнер с градиентными overlay для мобильных */}
              <div className="flex-1 min-w-0 relative">
                {/* Градиентные fade эффекты по краям (только на мобильных) */}
                {cardsVisible === 1 && (
                  <>
                    {/* Левый градиент */}
                    {canScrollLeft && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background-primary to-transparent pointer-events-none z-10 sm:hidden"
                        aria-hidden="true"
                      />
                    )}
                    {/* Правый градиент */}
                    {canScrollRight && (
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background-primary to-transparent pointer-events-none z-10 sm:hidden"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}

                <div
                  ref={scrollRef}
                  className={`portfolio-carousel-track flex gap-3 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide ${
                    cardsVisible === 1 ? 'px-3 sm:px-0' : ''
                  }`}
                  style={{
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
                    scrollPaddingLeft: cardsVisible === 1 ? '12px' : '0px',
                    scrollPaddingRight: cardsVisible === 1 ? '12px' : '0px',
                  }}
                  role="region"
                  aria-label="Портфолио проектов"
                  aria-roledescription="carousel"
                  tabIndex={0}
                >
                {projects.map((project, index) => (
                  <article
                    key={project.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className={`group flex-shrink-0 ${getCardWidth()} bg-background-secondary border border-border-default hover:border-text-secondary hover:shadow-lg transition-all duration-500 ease-out rounded-lg overflow-hidden`}
                    style={{ 
                      scrollSnapAlign: 'center',
                      scrollSnapStop: 'always',
                    }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Слайд ${index + 1} из ${projects.length}`}
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="block focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md"
                      aria-label={`Подробнее о проекте ${project.title}`}
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                          src={project.posterImage}
                          alt={`Постер проекта ${project.title}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                          sizes={cardsVisible === 1 ? '100vw' : cardsVisible === 2 ? '50vw' : '(max-width: 1024px) 33vw, 280px'}
                          loading={index < cardsVisible ? 'eager' : 'lazy'}
                          quality={85}
                          unoptimized={project.posterImage?.startsWith('http') || false}
                        />
                        <div className="absolute inset-0 bg-background-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center pointer-events-none">
                          <span 
                            className="text-text-primary font-medium"
                            style={{
                              fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)',
                              letterSpacing: '0.02em',
                              fontWeight: 500
                            }}
                          >
                            Подробнее
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link
                      href={`/projects/${project.id}`}
                      className="block p-2 sm:p-3 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-lg transition-colors duration-300"
                    >
                      <h3 
                        className="font-semibold mb-1 leading-tight line-clamp-1 text-text-primary"
                        style={{
                          fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)',
                          letterSpacing: '-0.01em',
                          fontWeight: 600
                        }}
                      >
                        {project.title}
                      </h3>
                      <div 
                        className="flex flex-wrap gap-1.5 text-text-secondary"
                        style={{
                          fontSize: 'clamp(0.75rem, 0.9vw, 0.8125rem)',
                          letterSpacing: '0.01em',
                          fontWeight: 400
                        }}
                      >
                        <span>{project.year}</span>
                        <span className="opacity-50">•</span>
                        <span className="truncate">{roleLabels[project.role]}</span>
                      </div>
                    </Link>
                  </article>
                ))}
                </div>

                {/* Индикатор свайпа для мобильных */}
                {cardsVisible === 1 && projects.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-4 sm:hidden">
                    <div className="flex items-center gap-1.5 text-text-muted text-xs">
                      <svg 
                        className="w-4 h-4 animate-pulse" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      <span>Свайпните</span>
                      <svg 
                        className="w-4 h-4 animate-pulse" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Стрелки навигации - скрываем на мобильных, так как используется swipe */}
              <button
                type="button"
                onClick={() => scrollBy('right')}
                className="hidden sm:flex flex-shrink-0 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full border bg-background-secondary border-border-default text-text-primary hover:border-text-secondary hover:bg-background-accent hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                aria-label="Следующие проекты"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
