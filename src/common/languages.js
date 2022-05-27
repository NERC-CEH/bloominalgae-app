import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  nb: 'Norsk',
  'nl-NL': 'Nederlands',
  'fr-Fr': 'Français',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    // 'fr-Fr': 'Français',
  });
}

export default languages;
