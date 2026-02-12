'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
  [key: string]: unknown;
}

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  unoptimized = false,
  ...props
}: ImageWithFallbackProps): JSX.Element {
  const [imageError, setImageError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleError = (): void => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = (): void => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div
        className={`bg-background-accent flex items-center justify-center text-text-muted ${className}`}
        style={fill ? undefined : { width, height }}
      >
        <span className="text-sm">Изображение не загружено</span>
      </div>
    );
  }

  return (
    <div className={`relative ${isLoading ? 'bg-background-accent animate-pulse' : ''} ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
          priority={priority}
          quality={quality}
          sizes={sizes}
          unoptimized={unoptimized}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
          priority={priority}
          quality={quality}
          sizes={sizes}
          unoptimized={unoptimized}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </div>
  );
}
