import { date } from '@apps';
import {
  expandOutline,
  calendarOutline,
  chatboxEllipsesOutline,
  bicycleOutline,
  locationOutline,
} from 'ionicons/icons';
import * as Yup from 'yup';
import Occurrence from 'common/models/occurrence';

const fixedLocationSchema = Yup.object().shape({
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

const validateLocation = val => {
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
    value: 'user_Boats / Water sports',
    label: 'Boats / Water sports',
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
    value: 'Boats / Water sports ',
    label: 'Boats / Water sports',
    id: 10644,
  },
  { value: 'Other', label: 'Other', id: 10645 },
];

const survey = {
  name: 'survey',
  label: 'Record',
  id: 445,

  getDraftIdKey: () => `draftId:${survey.name}`,

  attrs: {
    locationAccuracy: { remote: { id: 282 } },
    locationSource: { remote: { id: 760 } },
    locationGridref: { remote: { id: 335 } },
    location: {
      label: 'Location',
      icon: locationOutline,
      remote: {
        id: 'entered_sref',
        values(location, submission) {
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
      type: 'date',
      label: 'Date',
      icon: calendarOutline,
      isValid: val => val && val.toString() !== 'Invalid Date',
      required: true,
      componentProps: {
        max: () => new Date(),
      },
      remote: {
        values: d => date.print(d, false),
      },
    },

    'bloom-size': {
      type: 'radio',
      label: 'Bloom Size',
      icon: expandOutline,
      info: 'Select the closest match below.',
      componentProps: {
        options: bloomSizeValues,
      },
      remote: {
        id: 1014,
        values: bloomSizeValues,
      },
    },

    activities: {
      type: 'checkbox',
      label: 'Activities',
      icon: bicycleOutline,
      info: 'Please select the activities type for this record.',
      componentProps: {
        options: activitiesValues,
      },
      remote: {
        id: 1016,
        id_user: 1015,
        values(allValues, submission) {
          const { remote } = survey.attrs.activities;

          const reg = /^user_/;
          const getId = val => {
            const byValue = ({ value }) => value === val;
            return activitiesValues.find(byValue).id;
          };

          // personal
          const isPersonal = val => reg.test(val);
          submission.fields[remote.id_user] = allValues // eslint-disable-line
            .filter(isPersonal)
            .map(getId);

          // others
          const isNotPersonal = val => !reg.test(val);
          const other = allValues.filter(isNotPersonal).map(getId);
          return other;
        },
      },
    },

    comment: {
      icon: chatboxEllipsesOutline,
      label: 'Comment',
      type: 'textarea',
      info: 'Please add any extra info about this record.',
      skipValueTranslation: true,
    },
  },

  occ: {
    attrs: {
      taxon: {
        remote: {
          id: 'taxa_taxon_list_id',
          values: taxon => taxon.Cyanobacteria,
        },
      },
    },

    create() {
      return new Occurrence({
        attrs: {
          taxon: {
            Cyanobacteria: 400349,
          },
        },
      });
    },
  },

  verify(_, sample) {
    try {
      Yup.object().shape({
        attrs: Yup.object()
          .shape({
            media: Yup.array()
              .min(1, 'Please add a photo of the bloom')
              .required(),

            attrs: Yup.object().shape({
              location: verifyLocationSchema,
            }),
          })

          .validateSync(sample, { abortEarly: false }),
      });
    } catch (attrError) {
      return attrError;
    }
    return null;
  },

  create(Sample) {
    const sample = new Sample({
      metadata: {
        survey: survey.name,
        survey_id: survey.id,
      },

      attrs: {
        location_type: 'latlon',
        'bloom-size': null,
        location: null,
        activities: [],
      },
    });

    const occurrence = survey.occ.create(Occurrence);
    sample.occurrences.push(occurrence);

    sample.startGPS();

    return sample;
  },
};

export default survey;
