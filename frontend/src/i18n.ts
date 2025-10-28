import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
// pt = Portuguese (European/Portugal variant for EU project)
// Future: could add pt-BR for Brazilian Portuguese if needed
const locales = ['en', 'es', 'fr', 'de', 'pt', 'nl'];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});