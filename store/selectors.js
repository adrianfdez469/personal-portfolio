import { selector } from 'recoil';
import { atomLocale } from './atoms';

import { ES, EN } from '../public/static/locales';

export const selectorLocale = selector({
  key: 'SelectorUserName',
  get: ({ get }) => {
    const { locale } = get(atomLocale);
    if (locale) {
      const language = locale === 'es' ? ES : EN;
      return language;
    }
    return '';
  },
});

export const other = selector({
  key: '',
  get: ({ get }) => {
    const others = get();
    return others;
  },
});
