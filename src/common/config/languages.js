import { isPlatform } from '@ionic/react';

import GB from 'common/images/flags/ukFlag.svg';
import NL from 'common/images/flags/nlFlag.svg';
import FR from 'common/images/flags/frFlag.svg';
import NO from 'common/images/flags/noFlag.svg';

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
    flag: NO,
    label: 'Norsk',
    value: 'no',
  });
  languages.push({
    flag: FR,
    label: 'Français',
    value: 'fr-Fr',
  });
}

export default languages;
