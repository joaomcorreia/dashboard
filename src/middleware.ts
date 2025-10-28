import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'fr', 'de', 'pt', 'nl'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Prefix for default locale
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|es|fr|pt|nl)/:path*']
};