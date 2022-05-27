import { isPlatform } from '@ionic/react';

import UK from 'common/images/flags/ukFlag.svg';
import BE from 'common/images/flags/beFlag.svg';
import NO from 'common/images/flags/noFlag.svg';

const countries = [
  {
    flag: UK,
    label: 'United Kingdom',
    value: 'UK',
  },
  {
    flag: BE,
    label: 'Belgium',
    value: 'BE',
  },
  {
    flag: NO,
    label: 'Norway',
    value: 'NO',
  },
];

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  countries.push(
    ...[
      // {
      //   flag: CL,
      //   label: 'Chile',
      //   value: 'CHL',
      //   warehouseId: 18973
      // },
      // {
      //   flag: AR,
      //   label: 'Argentina',
      //   value: 'AR',
      //   warehouseId: 18969
      // },
    ]
  );
}

export default countries;
