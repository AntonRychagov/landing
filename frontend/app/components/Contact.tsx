'use client';

import { useEffect } from 'react';
import type { ContactInfo } from '../../data/types';
import { initScrollAnimations } from '../utils/scrollAnimations';

interface ContactProps {
  contact: ContactInfo;
}

export default function Contact({ contact }: ContactProps): JSX.Element {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <section id="contact" className="py-section bg-background-primary scroll-mt-20 overflow-hidden" aria-labelledby="contact-heading">
      <div className="section-container max-w-4xl">
        <h2 id="contact-heading" className="text-display-2 font-bold text-center scroll-fade-in" style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>Связаться</h2>

        <div className="max-w-2xl mx-auto scroll-fade-in">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <h4 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wide">
                Email
              </h4>
              <a
                href={`mailto:${contact.email}`}
                className="text-lg text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                aria-label={`Отправить email на ${contact.email}`}
              >
                {contact.email}
              </a>
            </div>

            {/* Phone */}
            {contact.phone && (
              <div>
                <h4 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wide">
                  Телефон
                </h4>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                  aria-label={`Позвонить по номеру ${contact.phone}`}
                >
                  {contact.phone}
                </a>
              </div>
            )}

            {/* Instagram */}
            {contact.instagram && (
              <div>
                <h4 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wide">
                  Instagram
                </h4>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                  aria-label="Открыть Instagram профиль в новой вкладке"
                >
                  <span>@{contact.instagram.split('/').filter(Boolean).pop() ?? 'instagram'}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Other Socials */}
            {contact.otherSocials && contact.otherSocials.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wide">
                  Другие соцсети
                </h4>
                <div className="flex flex-wrap gap-4">
                  {contact.otherSocials.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                      aria-label={`Открыть ${social.platform} в новой вкладке`}
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
