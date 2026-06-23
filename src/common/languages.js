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
  el: { default: 'el-GR' },
  'el-GR': 'Ελληνικά',
  es: { default: 'es-CL' },
  arn: 'Mapudungun',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    // demo-only languages
  });
}

export default languages;
