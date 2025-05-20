import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);   // Cumulative Layout Shift
    getFID(onPerfEntry);   // First Input Delay
    getLCP(onPerfEntry);   // Largest Contentful Paint
    getFCP(onPerfEntry);   // First Contentful Paint
    getTTFB(onPerfEntry);  // Time to First Byte
  }
}

export function reportWebVitals(metric) {
  console.log(`[Web Vitals] ${metric.name}:`, metric.value);
}