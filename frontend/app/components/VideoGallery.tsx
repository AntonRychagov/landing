'use client';

import { useEffect } from 'react';
import type { PortfolioProject } from '../../data/types';
import { initScrollAnimations } from '../utils/scrollAnimations';

interface VideoGalleryProps {
  projects: PortfolioProject[];
}

export default function VideoGallery({ projects }: VideoGalleryProps): JSX.Element {
  const videos = projects.filter((p) => p.videoUrl && p.videoUrl.trim() !== '');

  useEffect(() => {
    initScrollAnimations();
  }, []);

  const getVideoEmbedUrl = (videoUrl: string, videoType?: string): string => {
    if (!videoUrl) return '';

    // If already an embed URL, return as is
    if (videoUrl.includes('/embed/') || videoUrl.includes('/video/')) {
      return videoUrl;
    }

    if (videoType === 'youtube') {
      // Extract video ID from various YouTube URL formats
      let videoId = '';
      if (videoUrl.includes('youtube.com/watch?v=')) {
        videoId = videoUrl.split('v=')[1]?.split('&')[0] || '';
      } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (videoUrl.includes('youtube.com/embed/')) {
        return videoUrl; // Already embed URL
      } else {
        videoId = videoUrl; // Assume it's just the ID
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (videoType === 'vimeo') {
      // Extract video ID from Vimeo URL
      let videoId = '';
      if (videoUrl.includes('vimeo.com/')) {
        videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0] || '';
      } else if (videoUrl.includes('player.vimeo.com/video/')) {
        return videoUrl; // Already embed URL
      } else {
        videoId = videoUrl; // Assume it's just the ID
      }
      return `https://player.vimeo.com/video/${videoId}`;
    }

    return videoUrl;
  };

  if (videos.length === 0) {
    return (
      <section id="videos" className="py-section bg-background-secondary overflow-hidden">
        <div className="section-container">
          <h2 className="text-display-2 font-bold text-center" style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>Видео</h2>
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              Видео будут добавлены после сбора данных с Instagram
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="py-section bg-background-secondary scroll-mt-20 overflow-hidden" aria-labelledby="videos-heading">
      <div className="section-container">
        <h2 id="videos-heading" className="text-display-2 font-bold text-center scroll-fade-in" style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>Видео</h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8" role="list" style={{ gap: 'clamp(1.5rem, 4vw, 2rem)' }}>
          {videos.map((project, index) => (
            <article
              key={project.id}
              className={`bg-background-primary border border-border-default rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 scroll-fade-in ${index % 2 === 0 ? 'scroll-fade-in-delay-1' : 'scroll-fade-in-delay-2'}`}
              role="listitem"
            >
              {/* Video */}
              <div className="relative aspect-video w-full bg-background-accent rounded-t-lg overflow-hidden">
                {project.videoType === 'youtube' && (
                  <iframe
                    src={getVideoEmbedUrl(project.videoUrl || '', project.videoType)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Видео: ${project.title}`}
                    loading="lazy"
                  />
                )}
                {project.videoType === 'vimeo' && (
                  <iframe
                    src={getVideoEmbedUrl(project.videoUrl || '', project.videoType)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`Видео: ${project.title}`}
                    loading="lazy"
                  />
                )}
                {project.videoType === 'instagram' && (
                  <div className="w-full h-full flex items-center justify-center bg-background-accent">
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded px-4 py-2"
                    >
                      Смотреть на Instagram
                    </a>
                  </div>
                )}
                {!project.videoType && (
                  <video
                    src={project.videoUrl}
                    controls
                    className="w-full h-full"
                    preload="metadata"
                  >
                    Ваш браузер не поддерживает видео.
                  </video>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4 min-w-0">
                <h3 className="text-display-3 font-semibold mb-2">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-2">{project.year}</p>
                {project.description && (
                  <p className="text-text-secondary text-sm line-clamp-2">{project.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
