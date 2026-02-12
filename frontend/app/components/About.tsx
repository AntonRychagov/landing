'use client';

import Image from 'next/image';
import { useMemo, useEffect, useState } from 'react';
import type { PersonalInfo } from '../../data/types';
import { initScrollAnimations } from '../utils/scrollAnimations';

interface AboutProps {
  personal: PersonalInfo;
}

export default function About({ personal }: AboutProps): JSX.Element {
  const [imageError, setImageError] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  const profileImage = useMemo(
    () => personal.profileImages && personal.profileImages[1] ? personal.profileImages[1] : null,
    [personal.profileImages]
  );

  const backgroundImage = useMemo(
    () => personal.profileImages && personal.profileImages[2] ? personal.profileImages[2] : profileImage,
    [personal.profileImages, profileImage]
  );

  useEffect(() => {
    // Delay initialization to avoid blocking initial render
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initScrollAnimations();
      });
    });
    return () => {
      if (typeof timer === 'number') {
        cancelAnimationFrame(timer);
      }
    };
  }, []);

  const handleImageError = (): void => {
    setImageError(true);
  };

  const handleVideoError = (): void => {
    setVideoError(true);
  };

  return (
    <section 
      id="about" 
      className="relative flex items-center justify-center scroll-mt-20" 
      aria-labelledby="about-heading"
      style={{
        minHeight: 'calc(100dvh - 5rem)',
        paddingBlock: 'clamp(2rem, 8vh, 6rem)',
        paddingBlockStart: 'max(env(safe-area-inset-top, 0px), clamp(2rem, 8vh, 4rem))',
        paddingBlockEnd: 'max(env(safe-area-inset-bottom, 0px), clamp(2rem, 8vh, 4rem))',
        paddingInline: 'max(env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px), clamp(1rem, 4vw, 3rem))',
        overflow: 'visible'
      }}
    >
      {/* Background Image/Video - Similar to Hero */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
              opacity: 0.6,
              filter: 'brightness(1.3) contrast(1.4) saturate(1.1)',
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
            className="object-cover opacity-35"
            loading="lazy"
            quality={85}
            unoptimized={backgroundImage.startsWith('http')}
            onError={handleImageError}
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-background-secondary" />
        )}
        {/* Multi-layer gradient overlay for depth and focus */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/70 via-background-primary/50 to-background-primary/90" />
        {/* Vignette effect for cinematic focus */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
        }} />
        {/* Subtle center light accent */}
        <div className="absolute inset-0 hero-light-accent" style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)',
          mixBlendMode: 'screen',
        }} />
        {/* Film grain effect for cinematic feel */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
          }}
        />
        {/* Decorative corner accents - hidden on mobile */}
        <div className="hidden md:block absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-text-primary/20 opacity-50 pointer-events-none" />
        <div className="hidden md:block absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-text-primary/20 opacity-50 pointer-events-none" />
        <div className="hidden md:block absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-text-primary/20 opacity-50 pointer-events-none" />
        <div className="hidden md:block absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-text-primary/20 opacity-50 pointer-events-none" />
      </div>

      {/* Content Container - Centered like Hero */}
      <div 
        className="relative z-10 w-full"
        style={{
          maxWidth: 'min(90vw, 75rem)',
          marginInline: 'auto',
          paddingInline: 'clamp(1rem, 4vw, 2rem)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 0,
          overflow: 'visible'
        }}
      >
        <h2 id="about-heading" className="sr-only">О себе</h2>
        
        {/* Centered content layout similar to Hero */}
        <div 
          className="flex flex-col items-center text-center w-full scroll-fade-in"
          style={{ 
            maxWidth: 'min(100%, 64rem)',
            gap: 'clamp(2rem, 5vh, 4rem)',
            overflow: 'visible'
          }}
        >
          {/* Main heading - minimal styling */}
          <div className="scroll-fade-in-delay-1 w-full flex flex-col items-center">
            <h3 
              className="font-bold text-text-primary" 
              style={{ 
                fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                fontWeight: 700,
                marginBlockEnd: 'clamp(1.75rem, 4.5vh, 2.75rem)'
              }}
            >
              О себе
            </h3>
          </div>

          {/* Bio - elegantly designed text block */}
          <div className="scroll-fade-in-delay-2 w-full">
            <div className="relative mx-auto" style={{ maxWidth: 'min(100%, 56rem)' }}>
              {/* Elegant container - simplified structure */}
              <div className="relative group">
                {/* Left accent line with gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-text-primary/30 via-text-primary/15 to-transparent z-10" 
                  style={{ 
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)'
                  }} 
                />
                
                {/* Single container with all styling */}
                <div className="bg-background-primary/30 backdrop-blur-md rounded-xl border border-text-primary/10 group-hover:border-text-primary/20 transition-all duration-500"
                  style={{
                    paddingBlock: 'clamp(3rem, 7vh, 4.5rem)',
                    paddingInline: 'clamp(2.5rem, 6vw, 4rem)',
                    paddingInlineStart: 'clamp(3rem, 7vw, 4rem)',
                    paddingInlineEnd: 'clamp(2rem, 5vw, 3rem)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.875rem',
                    WebkitBorderRadius: '0.875rem',
                    MozBorderRadius: '0.875rem',
                    willChange: 'border-color, box-shadow',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    isolation: 'isolate',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Content */}
                  <div className="relative z-10">
                    <p 
                      className="text-text-secondary" 
                      style={{ 
                        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        lineHeight: '1.8',
                        letterSpacing: '0.01em',
                        wordBreak: 'normal',
                        overflowWrap: 'break-word',
                        fontWeight: 300,
                        color: 'rgba(255, 255, 255, 0.85)'
                      }}
                    >
                      {personal.aboutBio || personal.bio}
                    </p>
                    {personal.fullName && (
                      <div style={{ 
                        marginBlockStart: 'clamp(2.5rem, 6vh, 3rem)',
                        paddingBlockStart: 'clamp(2rem, 5vh, 2.5rem)',
                        borderBlockStart: '1px solid rgba(255, 255, 255, 0.12)'
                      }}>
                        <p 
                          className="text-text-muted font-medium text-right tracking-wider"
                          style={{ 
                            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          {personal.fullName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simple spacing divider */}
          <div className="w-full scroll-fade-in-delay-3" style={{ 
            marginBlock: 'clamp(3rem, 7vh, 4.5rem)'
          }} />

          {/* Content Grid - Two columns for additional info */}
          <div 
            className="grid md:grid-cols-2 w-full scroll-fade-in-delay-3"
            style={{ 
              maxWidth: 'min(100%, 69rem)',
              gap: 'clamp(1.5rem, 4vw, 2rem)',
              paddingInline: 'clamp(0.5rem, 2vw, 1rem)'
            }}
          >
            {/* Education - Enhanced card style */}
            {personal.education && personal.education.length > 0 && (
              <div className="text-left scroll-fade-in-left scroll-fade-in-delay-4 relative group flex flex-col">
                {/* Single card container */}
                <div className="bg-background-primary/45 backdrop-blur-md rounded-xl border border-text-primary/10 group-hover:border-text-primary/30 group-hover:bg-background-primary/55 transition-all duration-500 shadow-lg flex-1 flex flex-col"
                  style={{ 
                    padding: 'clamp(2rem, 5vw, 2.5rem)',
                    borderRadius: '0.875rem',
                    WebkitBorderRadius: '0.875rem',
                    MozBorderRadius: '0.875rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                    willChange: 'border-color, background-color, box-shadow',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    isolation: 'isolate',
                    overflow: 'hidden',
                    position: 'relative'
                  }} 
                >
                  {/* Title */}
                  <h4 
                    className="font-semibold text-text-primary"
                    style={{ 
                      fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                      lineHeight: '1.3',
                      letterSpacing: '-0.015em',
                      marginBlockEnd: 'clamp(1.5rem, 4vh, 2rem)',
                      fontWeight: 600
                    }}
                  >
                    Образование
                  </h4>
                  <ul className="flex-1" style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(0.875rem, 2vh, 1rem)'
                  }}>
                    {personal.education.map((edu, index) => (
                      <li 
                        key={index} 
                        className="text-text-secondary flex items-start group/item transition-all duration-300 hover:text-text-primary"
                        style={{ 
                          fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                          lineHeight: '1.75',
                          letterSpacing: '0.01em',
                          wordBreak: 'normal',
                          overflowWrap: 'break-word',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontWeight: 300
                        }}
                      >
                        <span 
                          className="mr-3 text-text-primary/80 flex-shrink-0 mt-0.5 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-text-primary"
                          style={{ fontSize: '1.15em', lineHeight: '1', fontWeight: 500 }}
                        >
                          ▸
                        </span>
                        <span className="flex-1 leading-relaxed">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Philosophy - Enhanced card style */}
            {personal.philosophy && (
              <div className="text-left scroll-fade-in-right scroll-fade-in-delay-4 relative group flex flex-col">
                {/* Single card container */}
                <div className="bg-background-primary/45 backdrop-blur-md rounded-xl border border-text-primary/10 group-hover:border-text-primary/30 group-hover:bg-background-primary/55 transition-all duration-500 shadow-lg flex-1 flex flex-col"
                  style={{ 
                    padding: 'clamp(2rem, 5vw, 2.5rem)',
                    borderRadius: '0.875rem',
                    WebkitBorderRadius: '0.875rem',
                    MozBorderRadius: '0.875rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                    willChange: 'border-color, background-color, box-shadow',
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    isolation: 'isolate',
                    overflow: 'hidden',
                    position: 'relative'
                  }} 
                >
                  {/* Title */}
                  <h4 
                    className="font-semibold text-text-primary"
                    style={{ 
                      fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                      lineHeight: '1.3',
                      letterSpacing: '-0.015em',
                      marginBlockEnd: 'clamp(1.5rem, 4vh, 2rem)',
                      fontWeight: 600
                    }}
                  >
                    Философия творчества
                  </h4>
                  <p 
                    className="text-text-secondary flex-1 flex flex-col justify-center italic"
                    style={{ 
                      fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
                      lineHeight: '1.85',
                      fontStyle: 'italic',
                      letterSpacing: '0.012em',
                      wordBreak: 'normal',
                      overflowWrap: 'break-word',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontWeight: 300
                    }}
                  >
                    {personal.philosophy}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interests - minimal styling */}
          {personal.interests && personal.interests.length > 0 && (
            <div className="w-full scroll-fade-in-delay-5" style={{ 
              maxWidth: 'min(100%, 56rem)',
              marginBlockStart: 'clamp(3rem, 7vh, 4.5rem)',
              paddingInline: 'clamp(1rem, 3vw, 2rem)'
            }}>
              <h4 
                className="font-semibold text-center text-text-primary"
                style={{ 
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                  lineHeight: '1.3',
                  letterSpacing: '-0.015em',
                  marginBlockEnd: 'clamp(2rem, 5vh, 2.5rem)',
                  fontWeight: 600
                }}
              >
                Интересы
              </h4>
              <div className="flex flex-wrap justify-center" style={{ 
                gap: 'clamp(0.875rem, 2vw, 1.125rem)'
              }}>
                {personal.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 bg-background-primary/50 backdrop-blur-md text-text-secondary rounded-lg border border-text-primary/15 transition-all duration-300 hover:bg-background-primary/70 hover:border-text-primary/40 hover:text-text-primary hover:scale-105"
                    style={{ 
                      fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                      letterSpacing: '0.02em',
                      fontWeight: 400,
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
