'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook for scroll-triggered animations
 * Adds 'visible' class when element enters viewport
 */
export function useScrollAnimation(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLElement>, boolean] {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isVisible) return;

    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observerOptions: IntersectionObserverInit = {
      ...defaultOptions,
      ...options,
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          element.classList.add('visible');
          observer.unobserve(element);
        }
      },
      observerOptions
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, options]);

  return [elementRef, isVisible];
}

/**
 * Initialize scroll animations for all elements with scroll animation classes
 * Optimized for performance with requestAnimationFrame and batching
 */
let observerInstance: IntersectionObserver | null = null;
let animationFrameId: number | null = null;
let pendingElements: Set<Element> = new Set();
let isProcessing = false;

function processPendingElements(): void {
  if (pendingElements.size === 0 || !observerInstance || isProcessing) return;

  isProcessing = true;

  // Batch process all pending elements
  const elementsToProcess = Array.from(pendingElements);
  pendingElements.clear();

  elementsToProcess.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.classList.add('visible');
      observerInstance?.unobserve(element);
    }
  });

  isProcessing = false;
  animationFrameId = null;
}

export function initScrollAnimations(): void {
  if (typeof window === 'undefined') return;

  // Clean up existing observer if any
  if (observerInstance) {
    observerInstance.disconnect();
    observerInstance = null;
  }

  // Cancel pending animation frame
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  pendingElements.clear();
  isProcessing = false;

  const elements = document.querySelectorAll(
    '.scroll-fade-in, .scroll-fade-in-left, .scroll-fade-in-right, .scroll-scale-in'
  );

  if (elements.length === 0) return;

  // Optimized observer options for better performance
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1, // Single threshold for better performance
    rootMargin: '0px 0px -30px 0px', // Reduced margin for better performance
  };

  observerInstance = new IntersectionObserver(
    (entries) => {
      // Batch all entries
      let hasNewElements = false;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          if (!pendingElements.has(entry.target)) {
            pendingElements.add(entry.target);
            hasNewElements = true;
          }
        }
      });

      // Only schedule RAF if there are new elements and no pending frame
      if (hasNewElements && animationFrameId === null) {
        animationFrameId = requestAnimationFrame(processPendingElements);
      }
    },
    observerOptions
  );

  // Observe all elements
  elements.forEach((element) => {
    observerInstance?.observe(element);
  });
}
