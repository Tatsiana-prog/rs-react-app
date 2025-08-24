import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const defaultLocale = 'en';
export const locales = ['en', 'ru'] as const;
type Locale = (typeof locales)[number];

type Messages = Record<string, string>;

export default getRequestConfig(
  async ({ locale }): Promise<{ locale: Locale; messages: Messages }> => {
    const validatedLocale = locales.find((l) => l === locale);
    if (!validatedLocale) notFound();

    const messages: Messages = (
      await import(`../messages/${validatedLocale}.json`)
    ).default;

    return {
      locale: validatedLocale,
      messages,
    };
  }
);
