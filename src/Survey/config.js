import { date } from '@apps';
import {
  expandOutline,
  calendarOutline,
  chatboxEllipsesOutline,
  bicycleOutline,
} from 'ionicons/icons';
import * as Yup from 'yup';
import Occurrence from 'common/models/occurrence';

const fixedLocationSchema = Yup.object().shape({
  latitude: Yup.number().required(),
  longitude: Yup.number().required('Please select location'),
});

const validateLocation = val => {
  if (!val) {
    return false;
  }
  fixedLocationSchema.validateSync(val);
  return true;
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
  { value: 'Walking / Running', label: 'Walking / Running', id: 10638 },
  { value: 'Dog-walking', label: 'Dog-walking', id: 10639 },
  { value: 'Cycling', label: 'Cycling', id: 10640 },
  { value: 'Birdwatching', label: 'Birdwatching', id: 10641 },
  { value: 'Fishing', label: 'Fishing', id: 10642 },
  { value: 'Swimming', label: 'Swimming', id: 10643 },
  { value: 'Boats / Water sports', label: 'Boats / Water sports', id: 10644 },
  { value: 'Other', label: 'Other', id: 10645 },
  {
    isPlaceholder: true,
    label: 'What activities are done at this location?',
  },
  { value: 'act Walking / Running', label: 'Walking / Running', id: 10638 },
  { value: 'act Dog-walking', label: 'Dog-walking', id: 10639 },
  { value: 'act Cycling', label: 'Cycling', id: 10640 },
  { value: 'act Birdwatching', label: 'Birdwatching', id: 10641 },
  { value: 'act Fishing', label: 'Fishing', id: 10642 },
  { value: 'act Swimming', label: 'Swimming', id: 10643 },
  {
    value: 'act Boats / Water sports ',
    label: 'Boats / Water sports',
    id: 10644,
  },
  { value: 'act Other', label: 'Other', id: 10645 },
];

const survey = {
  name: 'survey',
  label: 'Record',
  id: 445,

  getDraftIdKey: () => `draftId:${survey.name}`,

  attrs: {
    location_accuracy: { remote: { id: 282 } },
    location_source: { remote: { id: 760 } },
    location_gridref: { remote: { id: 335 } },

    location: {
      remote: {
        id: 'entered_sref',
        values(location, submission) {
          const { accuracy, source, gridref, name } = location;

          const keys = survey.attrs;
          const locationAttributes = {
            location_name: name,
            [keys.location_source.remote.id]: source,
            [keys.location_gridref.remote.id]: gridref,
            [keys.location_accuracy.remote.id]: accuracy,
          };
          Object.assign(submission.values, locationAttributes);

          const lat = parseFloat(location.latitude);
          const lon = parseFloat(location.longitude);
          return `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        },
      },
    },

    date: {
      label: 'Date',
      icon: calendarOutline,
      values: d => date.print(d),
      isValid: val => val && val.toString() !== 'Invalid Date',
      type: 'date',
      max: () => new Date(),
      skipValueTranslation: true,
    },

    'bloom-size': {
      type: 'radio',
      label: 'Boom Size',
      icon: expandOutline,
      info: 'Select the closest match below.',
      options: bloomSizeValues,
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
      options: activitiesValues,
      remote: {
        id: 1016,
        values: activitiesValues,
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
