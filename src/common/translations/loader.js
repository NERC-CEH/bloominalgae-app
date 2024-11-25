/* eslint-disable @getify/proper-arrows/name */

/* eslint-disable no-param-reassign */

/* eslint-disable camelcase */
import arn from './interface/arn.po';
import en from './interface/en.pot';
import esCL from './interface/es_CL.po';
import frBE from './interface/fr_BE.po';
import frLU from './interface/fr_LU.po';
import nl from './interface/nl_BE.po';
import nb from './interface/no.po';
import swKE from './interface/sw_KE.po';

// using "no" because of mistake

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
  'fr-BE': {
    interface: rawToKeyVal(frBE),
  },
  'fr-LU': {
    interface: rawToKeyVal(frLU),
  },
  nb: {
    interface: rawToKeyVal(nb),
  },
  'es-CL': {
    interface: rawToKeyVal(esCL),
  },
  'sw-KE': {
    interface: rawToKeyVal(swKE),
  },
  arn: {
    interface: rawToKeyVal(arn),
  },
};
