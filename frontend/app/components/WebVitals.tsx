'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals(): null {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(metric.name, metric.value, metric.rating);
    }
  });
  return null;
}
