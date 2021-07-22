import { isPlatform } from '@ionic/react';

import GB from 'common/images/flags/ukFlag.png';
import NL from 'common/images/flags/nlFlag.png';
import FR from 'common/images/flags/frFlag.png';

const languages = [
  {
    flag: GB,
    label: 'English',
    value: 'en',
  },
  {
    flag: NL,
    label: 'Nederlands',
    value: 'nl-NL',
  },
];

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  languages.push({
    flag: FR,
    label: 'Français',
    value: 'fr-Fr',
  });
}

export default languages;
