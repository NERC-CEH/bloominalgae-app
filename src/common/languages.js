import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  nb: 'Norsk',
  'nl-NL': 'Nederlands',
  fr: { default: 'fr-BE' },
  'fr-BE': 'Français (Belgique)',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    // demo-only languages
    'fr-LU': 'Français (Luxembourg)',
  });
}

export default languages;
