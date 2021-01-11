import { date } from '@apps';
import {
  expandOutline,
  calendarOutline,
  chatboxEllipsesOutline,
  bicycleOutline,
} from 'ionicons/icons';

const bloomSizeValues = [
  { value: 'Doormat', id: 10634 },
  { value: 'Parking space', id: 10635 },
  { value: 'Tennis court', id: 10636 },
  { value: 'Even bigger', id: 10637 },
];

const activitiesValues = [
  { isPlaceholder: true, label: 'What activities were you doing?' },
  { value: '', label: 'Walking / Running', id: 10638 },
  { value: '', label: 'Dog-walking', id: 10639 },
  { value: '', label: 'Cycling', id: 10640 },
  { value: '', label: 'Birdwatching', id: 10641 },
  { value: '', label: 'Fishing', id: 10642 },
  { value: '', label: 'Swimming', id: 10643 },
  { value: '', label: 'Boats / Watersports', id: 10644 },
  { value: '', label: 'Others', id: 10645 },
  {
    isPlaceholder: true,
    label: 'What activities are done at this location?',
  },
  { value: '', label: 'Walking / Running', id: 10638 },
  { value: '', label: 'Cycling', id: 10640 },
  { value: '', label: 'Birdwatching', id: 10641 },
  { value: '', label: 'Fishing', id: 10642 },
  { value: '', label: 'Swimming', id: 10643 },
  { value: '', label: 'Boats / Watersports', id: 10644 },
  { value: '', label: 'Other', id: 10645 },
];

const survey = {
  name: 'survey',
  label: 'Record',
  id: -1,

  getDraftIdKey: () => `draftId:${survey.name}`,

  attrs: {
    location: {
      remote: {
        id: 'entered_sref',
        values(location) {
          return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
            location.longitude
          ).toFixed(7)}`;
        },
      },
    },

    date: {
      label: 'Date',
      id: 'date',
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
      values: bloomSizeValues,
      remote: {
        id: -1,
        values: bloomSizeValues,
      },
    },

    activities: {
      id: 1016,
      type: 'checkbox',
      label: 'Activities',
      icon: bicycleOutline,
      info: 'Please select the activities type for this record.',
      values: activitiesValues,
      remote: {
        id: -1,
        values: activitiesValues,
      },
    },

    comment: {
      icon: chatboxEllipsesOutline,
      required: false,
      label: 'Comment',
      type: 'textarea',
      info: 'Please add any extra info about this record.',
      skipValueTranslation: true,
      remote: {
        id: -1,
      },
    },
  },

  verify() {},

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

    sample.startGPS();

    return sample;
  },
};

export default survey;
