'use client';

import { useEffect } from 'react';

export function ErrorHandler() {
  useEffect(() => {
    // Override console.error to catch Event objects
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      args.forEach((arg, index) => {
        if (arg && typeof arg === 'object' && arg.constructor && arg.constructor.name === 'Event') {
          console.warn(`FOUND IT: Event object at argument ${index}:`, arg);
          console.warn('Stack trace:', new Error().stack);
        }
      });
      originalConsoleError.apply(console, args);
    };

    // Override alert to catch Event objects
    const originalAlert = window.alert;
    window.alert = (message: any) => {
      if (message && typeof message === 'object' && message.constructor && message.constructor.name === 'Event') {
        console.error('FOUND IT: Event object passed to alert!', message);
        console.error('Stack trace:', new Error().stack);
        originalAlert('Error: An Event object was passed to alert - check console for details');
      } else {
        originalAlert(message);
      }
    };

    // Global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      if (event.reason && typeof event.reason === 'object' && event.reason.constructor.name === 'Event') {
        console.error('FOUND IT: An Event object was passed to a promise rejection!', event.reason);
      }
      event.preventDefault();
    };

    // Global error handler for regular errors
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      if (event.error && typeof event.error === 'object' && event.error.constructor.name === 'Event') {
        console.error('FOUND IT: An Event object was passed to an error handler!', event.error);
      }
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
      // Restore original functions
      console.error = originalConsoleError;
      window.alert = originalAlert;
    };
  }, []);

  return null;
}