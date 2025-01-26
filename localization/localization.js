import {configureLocalization} from '@lit/localize';
// Generated via output.localeCodesModule
import {sourceLocale, targetLocales} from './locale-codes.js';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`./locales/${locale}.js`),
});
