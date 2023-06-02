import {
  expandOutline,
  calendarOutline,
  chatboxEllipsesOutline,
  bicycleOutline,
  locationOutline,
} from 'ionicons/icons';
import * as Yup from 'yup';
import { date } from '@flumens';
import Occurrence from 'common/models/occurrence';
import SampleClass from 'common/models/sample';

const fixedLocationSchema = Yup.object().shape({
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

const validateLocation = (val: any) => {
  try {
    fixedLocationSchema.validateSync(val);
    return true;
  } catch (e) {
    return false;
  }
};

export const verifyLocationSchema = Yup.mixed().test(
  'location',
  'Please select location.',
  validateLocation
);

const bloomSizeValues = [
  { value: 'Doormat', id: 10634 },
  { value: 'Parking space', id: 10635 },
  { value: 'Tennis court', id: 10636 },
  { value: 'Even bigger', id: 10637 },
];

const activitiesValues = [
  { isPlaceholder: true, label: 'What activities were you doing?' },
  {
    value: 'user_Walking / Running',
    label: 'Walking / Running',
    id: 10638,
  },
  { value: 'user_Dog-walking', label: 'Dog-walking', id: 10639 },
  { value: 'user_Cycling', label: 'Cycling', id: 10640 },
  { value: 'user_Birdwatching', label: 'Birdwatching', id: 10641 },
  { value: 'user_Fishing', label: 'Fishing', id: 10642 },
  { value: 'user_Swimming', label: 'Swimming', id: 10643 },
  {
    value: 'user_Boats / Watersports',
    label: 'Boats / Watersports',
    id: 10644,
  },
  { value: 'user_Other', label: 'Other', id: 10645 },
  {
    isPlaceholder: true,
    label: 'What activities are done at this location?',
  },
  { value: 'Walking / Running', label: 'Walking / Running', id: 10638 },
  { value: 'Dog-walking', label: 'Dog-walking', id: 10639 },
  { value: 'Cycling', label: 'Cycling', id: 10640 },
  { value: 'Birdwatching', label: 'Birdwatching', id: 10641 },
  { value: 'Fishing', label: 'Fishing', id: 10642 },
  { value: 'Swimming', label: 'Swimming', id: 10643 },
  {
    value: 'Boats / Watersports',
    label: 'Boats / Watersports',
    id: 10644,
  },
  { value: 'Other', label: 'Other', id: 10645 },
];

const survey = {
  name: 'survey',
  label: 'Record',
  id: 445,

  attrs: {
    locationAccuracy: { remote: { id: 282 } },
    locationSource: { remote: { id: 760 } },
    locationGridref: { remote: { id: 335 } },
    location: {
      label: 'Location',
      icon: locationOutline,
      remote: {
        id: 'entered_sref',
        values(location: any, submission: any) {
          // convert accuracy for map and gridref sources
          const { accuracy, source, gridref, name } = location;

          const keys = survey.attrs;
          const locationAttributes = {
            location_name: name,
            [keys.locationSource.remote.id]: source,
            [keys.locationGridref.remote.id]: gridref,
            [keys.locationAccuracy.remote.id]: accuracy,
          };

          // add other location related attributes
          // eslint-disable-next-line
          submission.fields = { ...submission.fields, ...locationAttributes };

          const lat = parseFloat(location.latitude);
          const lon = parseFloat(location.longitude);

          if (Number.isNaN(lat) || Number.isNaN(lat)) {
            return null;
          }

          return `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        },
      },
    },

    date: {
      isValid: (val: any) => val && val.toString() !== 'Invalid Date',
      menuProps: { parse: 'date', icon: calendarOutline },
      pageProps: {
        attrProps: {
          input: 'date',
          inputProps: { max: () => new Date() },
        },
      },
      remote: { values: (d: any) => date.print(d, false) },
    },

    size: {
      menuProps: {
        icon: expandOutline,
        label: 'Bloom size',
      },
      pageProps: {
        attrProps: {
          input: 'radio',
          info: 'Select the closest match below.',
          inputProps: { options: bloomSizeValues },
        },
      },

      remote: { id: 1014, values: bloomSizeValues },
    },

    activities: {
      menuProps: {
        icon: bicycleOutline,
      },
      pageProps: {
        attrProps: {
          input: 'checkbox',
          info: 'Please select the activities type for this record.',
          inputProps: { options: activitiesValues },
        },
      },

      remote: {
        id: 1016,
        id_user: 1015,
        values(allValues: any, submission: any) {
          const { remote } = survey.attrs.activities;

          const reg = /^user_/;
          const getId = (val: any) => {
            const byValue = ({ value }: any) => value === val;
            return activitiesValues.find(byValue)?.id;
          };

          // personal
          const isPersonal = (val: any) => reg.test(val);
          submission.values[`smpAttr:${remote.id_user}`] = allValues // eslint-disable-line
            .filter(isPersonal)
            .map(getId);

          // others
          const isNotPersonal = (val: any) => !reg.test(val);
          const other = allValues.filter(isNotPersonal).map(getId);
          return other;
        },
      },
    },
  },

  occ: {
    attrs: {
      taxon: {
        remote: {
          id: 'taxa_taxon_list_id',
          values: ({ warehouseId }: any) => warehouseId,
        },
      },

      comment: {
        menuProps: {
          icon: chatboxEllipsesOutline,
        },
        pageProps: {
          attrProps: {
            input: 'textarea',
            info: 'Please add any extra info about this record.',
          },
        },
      },
    },

    create() {
      return new Occurrence({
        attrs: {
          taxon: {
            warehouseId: 400349, // Cyanobacteria
          },
        },
      });
    },

    verify(_: any, occ: Occurrence) {
      try {
        Yup.object()
          .shape({
            media: Yup.array()
              .min(1, 'Please add a photo of the bloom')
              .required(),
          })
          .validateSync(occ, { abortEarly: false });
      } catch (attrError) {
        return attrError;
      }
      return null;
    },
  },

  verify(_: any, sample: SampleClass) {
    try {
      Yup.object()
        .shape({
          attrs: Yup.object().shape({
            location: verifyLocationSchema,
          }),
        })
        .validateSync(sample, { abortEarly: false });
    } catch (attrError) {
      return attrError;
    }
    return null;
  },

  create(Sample: typeof SampleClass) {
    const sample = new Sample({
      metadata: {
        survey: survey.name,
        survey_id: survey.id,
      },

      attrs: {
        location_type: 'latlon',
        size: null,
        location: null,
        activities: [],
      },
    });

    const occurrence = survey.occ.create();
    sample.occurrences.push(occurrence);

    sample.startGPS();

    return sample;
  },
};

export default survey;
