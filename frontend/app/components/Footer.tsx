'use client';

import { useMemo } from 'react';
import type { ContactInfo } from '../../data/types';

interface FooterProps {
  contact: ContactInfo;
  name: string;
}

// SVG Icons for social media
const InstagramIcon = (): JSX.Element => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const VKIcon = (): JSX.Element => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.831-1.834-2.644-.315-3.05.12-.405.405-1.126 1.126-1.531 1.126-.405 0-.56-.315-1.126-1.126-1.126-1.831-2.05-3.05-2.86-3.86-.66-.66-1.126-.405-1.126-.66 0-.405.12-.66.12-1.126 0-.405.315-.66.66-.66h1.744c.66 0 .9.315 1.126.66.66 1.126 1.41 2.355 1.836 2.781.405.405.66.315.66-.12 0-.66.12-1.531.12-2.355 0-.9-.315-1.41-1.41-1.41h-2.355c-.405 0-.66.12-.9.405-.315.315-.405.66-.405.9 0 .66.12 1.41.12 2.16 0 .66-.12 1.126-.405 1.41-.315.315-.66.315-1.126.315h-.66c-.66 0-1.41-.315-2.16-.66-.405-.12-.66-.315-.9-.315-.66 0-.9.315-.9.9v1.41c0 .66.315.9.9 1.126.9.405 1.86.9 2.355 1.41 1.41 1.41 2.16 2.781 3.36 2.781h1.41c.66 0 .9-.315.9-.9v-1.531c0-.66-.12-.9-.66-1.41-.315-.315-.66-.66-1.41-1.41-.315-.315-.405-.66 0-1.126.315-.405.9-.9 1.41-1.41.66-.66 1.126-1.126 1.126-1.531 0-.405-.12-.66-.12-.9 0-.405.315-.66.66-.66h2.355c.9 0 1.41.315 1.41 1.41v3.36c0 .66.315.9.66 1.41.405.405.66.66.66 1.126 0 .66-.315.9-.9.9z"/>
  </svg>
);

const TelegramIcon = (): JSX.Element => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.84 8.678c-.135.608-.479.758-.97.472l-2.68-1.97-1.293 1.244c-.146.146-.27.27-.554.27l.197-2.79 4.94-4.466c.216-.19-.047-.295-.335-.104l-6.11 3.848-2.635-.823c-.574-.18-.59-.574.12-.88l10.32-3.977c.48-.18.897.112.74.694z"/>
  </svg>
);

const getSocialIcon = (platform: string): JSX.Element | null => {
  const normalized = platform.toLowerCase();
  if (normalized.includes('instagram')) return <InstagramIcon />;
  if (normalized.includes('vk') || normalized.includes('вк')) return <VKIcon />;
  if (normalized.includes('telegram')) return <TelegramIcon />;
  return null;
};

export default function Footer({ contact, name }: FooterProps): JSX.Element {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className="relative bg-background-primary overflow-hidden"
      role="contentinfo"
      style={{
        paddingTop: 'clamp(5rem, 12vh, 7rem)',
        paddingBottom: 'clamp(3rem, 7vh, 4rem)',
      }}
    >
      {/* Decorative gradient overlay */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
        }}
      />

      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative z-10">
        <div 
          className="flex flex-col items-center md:items-start"
          style={{ 
            marginBottom: 'clamp(3rem, 7vh, 4.5rem)',
            maxWidth: '100%',
          }}
        >
          {/* Contact & Social */}
          <div className="w-full max-w-2xl group">
            {/* Decorative accent line - centered on mobile, left on desktop */}
            <div 
              className="mb-8 md:mb-10 h-px w-20 md:w-24 mx-auto md:mx-0 bg-gradient-to-r from-transparent via-text-primary/50 to-transparent md:from-text-primary/50 md:via-transparent"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
              }}
            />

            <h3 
              className="text-text-primary font-bold mb-8 md:mb-10 text-center md:text-left relative inline-block w-full md:w-auto group-hover:tracking-wider transition-all duration-500" 
              style={{ 
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                fontWeight: 700,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block',
              }}
            >
              Контакты
            </h3>
            
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Contact Information - Centered on mobile, left on desktop */}
              <address className="not-italic flex flex-col gap-5 md:gap-6 items-center md:items-start">
                <a
                  href={`mailto:${contact.email}`}
                  className="group/link relative inline-flex items-center gap-4 text-text-secondary hover:text-text-primary transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary px-4 py-2 rounded-lg hover:bg-background-primary/30 transition-colors"
                  aria-label={`Отправить email на ${contact.email}`}
                  style={{ 
                    fontSize: 'clamp(1.0625rem, 1.3vw, 1.125rem)',
                    lineHeight: '1.5',
                    letterSpacing: '0.01em',
                  }}
                >
                  <span className="text-text-primary/60 group-hover/link:text-text-primary transition-colors duration-300 text-xl">✉</span>
                  <span className="relative group-hover/link:translate-x-1 transition-transform duration-300">{contact.email}</span>
                </a>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="group/link relative inline-flex items-center gap-4 text-text-secondary hover:text-text-primary transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary px-4 py-2 rounded-lg hover:bg-background-primary/30 transition-colors"
                    aria-label={`Позвонить по номеру ${contact.phone}`}
                    style={{ 
                      fontSize: 'clamp(1.0625rem, 1.3vw, 1.125rem)',
                      lineHeight: '1.5',
                      letterSpacing: '0.01em',
                    }}
                  >
                    <span className="text-text-primary/60 group-hover/link:text-text-primary transition-colors duration-300 text-xl">📞</span>
                    <span className="relative group-hover/link:translate-x-1 transition-transform duration-300">{contact.phone}</span>
                  </a>
                )}
              </address>

              {/* Social Media - Elegant divider with glow effect */}
              {(contact.instagram || (contact.otherSocials && contact.otherSocials.length > 0)) && (
                <div 
                  className="flex flex-col gap-6 mt-4 md:mt-6 relative w-full"
                  style={{ 
                    marginTop: 'clamp(1.5rem, 3vh, 2rem)',
                    paddingTop: 'clamp(2rem, 4vh, 2.5rem)',
                  }}
                >
                  {/* Glowing divider */}
                  <div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.1)',
                    }}
                  />
                  
                  {/* Social links - centered on mobile, left on desktop */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 pt-2">
                    {contact.instagram && (
                      <a
                        href={contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-text-primary/10 hover:border-text-primary/30 bg-background-primary/50 hover:bg-background-primary/80 backdrop-blur-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                        aria-label="Открыть Instagram в новой вкладке"
                        style={{ 
                          fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)',
                          letterSpacing: '0.01em',
                        }}
                      >
                        <span className="text-text-secondary group-hover/social:text-text-primary group-hover/social:scale-110 transition-all duration-300">
                          <InstagramIcon />
                        </span>
                        <span className="text-text-secondary group-hover/social:text-text-primary transition-colors duration-300">Instagram</span>
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-text-primary/5 to-transparent opacity-0 group-hover/social:opacity-100 group-hover/social:animate-shimmer transition-opacity duration-300" />
                      </a>
                    )}
                    {contact.otherSocials &&
                      contact.otherSocials.map((social, index) => {
                        const icon = getSocialIcon(social.platform);
                        return (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/social relative flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-text-primary/10 hover:border-text-primary/30 bg-background-primary/50 hover:bg-background-primary/80 backdrop-blur-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                            aria-label={`Открыть ${social.platform} в новой вкладке`}
                            style={{ 
                              fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)',
                              letterSpacing: '0.01em',
                            }}
                          >
                            {icon && (
                              <span className="text-text-secondary group-hover/social:text-text-primary group-hover/social:scale-110 transition-all duration-300">
                                {icon}
                              </span>
                            )}
                            <span className="text-text-secondary group-hover/social:text-text-primary transition-colors duration-300">{social.platform}</span>
                            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-text-primary/5 to-transparent opacity-0 group-hover/social:opacity-100 group-hover/social:animate-shimmer transition-opacity duration-300" />
                          </a>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Copyright - Enhanced with subtle effects */}
        <div 
          className="relative text-center"
          style={{
            paddingTop: 'clamp(2.5rem, 6vh, 3rem)',
          }}
        >
          {/* Glowing divider */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)',
              boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)',
            }}
          />
          
          <p 
            className="text-text-muted mt-8 relative inline-block" 
            style={{ 
              fontSize: 'clamp(0.8125rem, 0.95vw, 0.875rem)',
              lineHeight: '1.6',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}
          >
            © {currentYear} {name}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
