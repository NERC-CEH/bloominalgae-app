/* eslint-disable @getify/proper-arrows/name */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import en from './interface/en.pot';

import fr from './interface/fr.po';
import nl from './interface/nl_BE.po';
import no from './interface/no.po';

const rawToKeyVal = lang =>
  Object.entries(lang).reduce((agg, pair) => {
    const [key, translation] = pair;
    // console.log(pair);
    if (!key) {
      return agg;
    }

    const [, val, ...pluralVals] = translation;
    if (!val) {
      return agg;
    }

    if (pluralVals.length) {
      const pluralValsWrap = (plural, index) => {
        agg[`${key}_${index + 1}`] = plural;
      };

      pluralVals.forEach(pluralValsWrap);
    }

    agg[key] = val; // eslint-disable-line no-param-reassign
    return agg;
  }, {});

export default {
  en: {
    interface: rawToKeyVal(en),
  },
  nl: {
    interface: rawToKeyVal(nl),
  },
  fr: {
    interface: rawToKeyVal(fr),
  },
  no: {
    interface: rawToKeyVal(no),
  },
};
