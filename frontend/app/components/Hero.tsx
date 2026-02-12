'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { PersonalInfo } from '../../data/types';
import { scrollToSection } from '../utils/scroll';

interface HeroProps {
  personal: PersonalInfo;
}

export default function Hero({ personal }: HeroProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScrollToPortfolio = useCallback((): void => {
    scrollToSection('portfolio', 100);
  }, []);


  const handleImageError = useCallback((): void => {
    setImageError(true);
  }, []);

  const handleVideoError = useCallback((): void => {
    setVideoError(true);
  }, []);

  const backgroundImage = useMemo(() => {
    return personal.profileImages && personal.profileImages[0]
      ? personal.profileImages[0]
      : null;
  }, [personal.profileImages]);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ 
        minHeight: 'calc(100dvh - 5rem)',
        paddingTop: 'max(env(safe-area-inset-top, 0px), 0.5rem)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 2.5rem)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)'
      }}
      aria-label="Главная секция"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {personal.backgroundVideo && !videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={backgroundImage || undefined}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 0.7,
              filter: 'brightness(1.4) contrast(1.5) saturate(1.2)',
            }}
            onError={handleVideoError}
          >
            <source src={personal.backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage && !imageError ? (
          <Image
            src={backgroundImage}
            alt={`${personal.name} - фоновое изображение`}
            fill
            className="object-cover opacity-40"
            priority
            quality={85}
            unoptimized={backgroundImage.startsWith('http')}
            onError={handleImageError}
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-background-secondary" />
        )}
        {/* Multi-layer gradient overlay for depth and focus */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/60 via-background-primary/40 to-background-primary/85" />
        {/* Vignette effect for cinematic focus */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background-primary/30" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
        }} />
        {/* Subtle center light accent with gentle animation */}
        <div className="absolute inset-0 hero-light-accent" style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% 45%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
          mixBlendMode: 'screen',
        }} />
        {/* Film grain effect for cinematic feel */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content Container - используем flex для равномерного распределения пространства */}
      <div 
        className={`relative z-10 max-w-6xl w-full px-3 sm:px-4 md:px-6 lg:px-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 0,
          overflow: 'visible'
        }}
      >
        <div 
          className="flex flex-col items-center text-center w-full" 
          style={{ 
            gap: 'clamp(0.4rem, 1.2vh, 0.8rem)',
            maxHeight: '100%',
            overflow: 'visible',
            justifyContent: 'center'
          }}
        >
          {/* Profile Image */}
          <div 
            className="relative rounded-full overflow-hidden border-4 border-text-primary/20 shadow-xl hero-profile-float hero-profile-image"
            style={{
              width: 'clamp(80px, 15vw, 180px)',
              height: 'clamp(80px, 15vw, 180px)',
              aspectRatio: '1 / 1',
              flexShrink: 0
            }}
          >
            <Image
              src={personal.profileImage}
              alt={`${personal.name} - портрет`}
              fill
              className="object-cover"
              priority
              quality={90}
              unoptimized={personal.profileImage?.startsWith('http') || false}
              sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, (max-width: 1024px) 180px, 220px"
            />
          </div>

          {/* Name */}
          <h1 
            className="font-bold px-2 hero-name text-text-primary"
            style={{
              fontSize: 'clamp(1.5rem, 4.5vw, 2.75rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            {personal.name}
          </h1>

          {/* Profession */}
          <div 
            className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-text-secondary px-2 hero-profession"
            style={{
              fontSize: 'clamp(0.875rem, 1.8vw, 1.125rem)',
              lineHeight: '1.4',
              letterSpacing: '0.01em',
              fontWeight: 400,
              flexShrink: 0
            }}
          >
            {personal.profession.map((prof, index) => (
              <span key={index} className="whitespace-nowrap">
                {prof}
                {index < personal.profession.length - 1 && (
                  <span className="mx-1.5 sm:mx-2 hidden sm:inline opacity-40">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p 
            className="text-text-secondary max-w-2xl px-2 hero-bio"
            style={{
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              lineHeight: '1.7',
              letterSpacing: '0.01em',
              fontWeight: 300,
              marginBottom: 'clamp(0.75rem, 2.5vh, 1.25rem)',
              flexShrink: 1,
              minHeight: 0,
              color: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            {personal.bio}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto px-2 hero-buttons"
            style={{ flexShrink: 0 }}
          >
            <button
              onClick={handleScrollToPortfolio}
              className="w-full sm:w-auto px-5 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4 bg-text-primary text-background-primary font-semibold hover:bg-text-secondary active:scale-95 transition-all duration-300 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ 
                fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
                letterSpacing: '0.01em',
                fontWeight: 600
              }}
              aria-label="Перейти к портфолио"
            >
              Смотреть работы
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - позиционируем относительно секции */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        style={{ 
          bottom: 'max(env(safe-area-inset-bottom, 0px), 0.75rem)'
        }}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-text-muted"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
