import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  nb: 'Norsk',
  'nl-NL': 'Nederlands',
  fr: { default: 'fr-BE' },
  'fr-BE': 'Français (Belgique)',
  'fr-LU': 'Français (Luxembourg)',
  'sw-KE': 'Swahili',
  sw: { default: 'sw-KE' },
  'es-CL': 'Español',
  es: { default: 'es-CL' },
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    arn: 'Mapudungun',
    // demo-only languages
  });
}

export default languages;
