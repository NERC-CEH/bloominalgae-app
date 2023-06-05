import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  nb: 'Norsk',
  'nl-NL': 'Nederlands',
  fr: { default: 'fr-BE' },
  'fr-BE': 'Français (Belgique)',
  'fr-LU': 'Français (Luxembourg)',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    // demo-only languages
  });
}

export default languages;
