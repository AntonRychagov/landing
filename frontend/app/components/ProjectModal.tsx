'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import type { PortfolioProject } from '../../data/types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps): JSX.Element | null {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) {
    return null;
  }

  const roleLabels: Record<string, string> = {
    director: 'Режиссер',
    screenwriter: 'Сценарист',
    both: 'Режиссер, Сценарист',
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-overlay backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-background-secondary border border-border-default rounded-lg shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-background-primary text-text-primary hover:bg-background-accent active:scale-95 transition-all duration-200 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Закрыть модальное окно"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Poster/Header Image */}
          <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={project.posterImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized={project.posterImage?.startsWith('http') || false}
            />
          </div>

          {/* Project Info */}
          <div className="mb-6">
            <h2 id="modal-title" className="text-display-2 font-bold mb-2">{project.title}</h2>
            <div className="flex flex-wrap gap-4 text-text-secondary mb-4">
              <span>{project.year}</span>
              <span>•</span>
              <span>{roleLabels[project.role]}</span>
              {project.genre && (
                <>
                  <span>•</span>
                  <span>{project.genre}</span>
                </>
              )}
              {project.duration && (
                <>
                  <span>•</span>
                  <span>{project.duration}</span>
                </>
              )}
            </div>
            <p className="text-lg text-text-secondary leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Images Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-display-3 font-semibold mb-4">Галерея</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square hover:opacity-80 transition-opacity rounded-md overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - изображение ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      unoptimized={image?.startsWith('http') || false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {project.videoUrl && (
            <div className="mb-6">
              <h3 className="text-display-3 font-semibold mb-4">Видео</h3>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                {project.videoType === 'youtube' && (
                  <iframe
                    src={project.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={project.title}
                  />
                )}
                {project.videoType === 'vimeo' && (
                  <iframe
                    src={project.videoUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={project.title}
                  />
                )}
              </div>
            </div>
          )}

          {/* Awards */}
          {(project.awards && project.awards.length > 0) ||
          (project.nominations && project.nominations.length > 0) ? (
            <div className="mb-6">
              <h3 className="text-display-3 font-semibold mb-4">Награды и номинации</h3>
              {project.awards && project.awards.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2 text-text-primary">Награды:</h4>
                  <ul className="space-y-1">
                    {project.awards.map((award, index) => (
                      <li key={index} className="text-text-secondary">
                        • {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.nominations && project.nominations.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-2 text-text-primary">Номинации:</h4>
                  <ul className="space-y-1">
                    {project.nominations.map((nomination, index) => (
                      <li key={index} className="text-text-secondary">
                        • {nomination}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}

          {/* Watch Link */}
          {project.watchUrl && (
            <div>
              <a
                href={project.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-text-primary text-background-primary font-semibold hover:bg-text-secondary transition-colors rounded-lg"
              >
                Смотреть проект
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
