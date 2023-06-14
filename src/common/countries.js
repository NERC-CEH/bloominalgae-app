import { isPlatform } from '@ionic/react';
import BE from 'common/images/flags/beFlag.svg';
import LU from 'common/images/flags/luFlag.svg';
import NL from 'common/images/flags/nlFlag.svg';
import NO from 'common/images/flags/noFlag.svg';
import UK from 'common/images/flags/ukFlag.svg';

const countries = [
  {
    flag: UK,
    label: 'United Kingdom',
    value: 'UK',
    location: { latitude: 53.505, longitude: -3.09, zoom: 5 },
  },
  {
    flag: BE,
    label: 'Belgium',
    value: 'BE',
    location: { latitude: 50.495, longitude: 3.147, zoom: 5 },
  },
  {
    flag: NO,
    label: 'Norway',
    value: 'NO',
    location: { latitude: 64.192, longitude: 14.726, zoom: 3 },
  },
  {
    flag: LU,
    label: 'Luxembourg',
    value: 'LU',
    location: { latitude: 49.815, longitude: 6.103, zoom: 8 },
  },
  {
    flag: NL,
    label: 'Netherlands',
    value: 'NL',
    location: { latitude: 52.207, longitude: 5.311, zoom: 6 },
  },
  {
    label: 'Other',
    value: 'OTHER',
    location: { latitude: 53, longitude: 5, zoom: 2 }, // default to Europe
  },
];

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  countries.push(
    ...[
      // demo only countries here
    ]
  );
}

const byKey = (agg, country) => {
  // eslint-disable-next-line no-param-reassign
  agg[country.value] = country;
  return agg;
};
export const countriesByKey = countries.reduce(byKey, {});

export default countries;
