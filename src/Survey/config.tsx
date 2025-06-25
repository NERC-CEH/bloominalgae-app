import { expandOutline, calendarOutline, bicycleOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import { dateFormat } from '@flumens';
import { IonIcon } from '@ionic/react';
import OccurrenceClass from 'common/models/occurrence';
import { Survey, blockToAttr } from './Survey';

export const commentAttr = {
  id: 'comment',
  type: 'text_input',
  title: 'Comment',
  appearance: 'multiline',
} as const;

const bloomSizeValues = [
  { title: 'Doormat', data_name: '10634' },
  { title: 'Parking space', data_name: '10635' },
  { title: 'Tennis court', data_name: '10636' },
  { title: 'Even bigger', data_name: '10637' },
];

export const sizeAttr = {
  id: 'smpAttr:1014',
  type: 'choice_input',
  title: 'Bloom size',
  prefix: (<IonIcon src={expandOutline} className="size-6" />) as any,
  appearance: 'button',
  choices: bloomSizeValues,
} as const;

const activitiesValues = [
  { title: 'Walking / Running', data_name: '10638' },
  { title: 'Dog-walking', data_name: '10639' },
  { title: 'Cycling', data_name: '10640' },
  { title: 'Birdwatching', data_name: '10641' },
  { title: 'Fishing', data_name: '10642' },
  { title: 'Swimming', data_name: '10643' },
  { title: 'Boats / Watersports', data_name: '10644' },
  { title: 'Other', data_name: '10645' },
] as const;

export const userActivitiesAttr = {
  id: 'smpAttr:1015',
  type: 'choice_input',
  title: 'What activities were you doing?',
  multiple: true,
  prefix: (<IonIcon src={bicycleOutline} className="size-6" />) as any,
  container: 'inline',
  choices: activitiesValues,
} as const;

export const activitiesAttr = {
  id: 'smpAttr:1016',
  type: 'choice_input',
  title: 'What activities are done at this location?',
  multiple: true,
  prefix: (<IonIcon src={bicycleOutline} className="size-6" />) as any,
  container: 'inline',
  choices: activitiesValues,
} as const;

export const activitiesGroupAttr = {
  id: 'activities',
  type: 'group',
  container: 'page',
  blocks: [userActivitiesAttr, activitiesAttr] as any,
} as const;

const survey: Survey = {
  name: 'main',
  label: 'Record',
  id: 445,

  attrs: {
    location: {
      remote: {
        id: 'entered_sref',
        values(location: any, submission: any) {
          // eslint-disable-next-line
          submission.values = {
            ...submission.values,

            location_name: location.name,
            [`smpAttr:760`]: location.source,
            [`smpAttr:335`]: location.gridref,
            [`smpAttr:282`]: location.accuracy,
          };

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
      menuProps: { parse: 'date', icon: calendarOutline },
      pageProps: {
        attrProps: {
          input: 'date',
          inputProps: { max: () => new Date() },
        },
      },
      remote: { values: (d: number) => dateFormat.format(new Date(d)) },
    },

    ...blockToAttr(sizeAttr),
    activities: {
      ...blockToAttr(activitiesGroupAttr).activities,
      // For backwards compatibility, remove once everyone uploads their records
      remote: {
        id: 1016,
        values(allValues: any, submission: any) {
          const reg = /^user_/;
          const getId = (val: any) => {
            const byValue = ({ value }: any) => value === val;
            return activitiesValues.find(byValue)?.data_name;
          };

          // personal
          const isPersonal = (val: any) => reg.test(val);
          submission.values[`smpAttr:1015`] = allValues // eslint-disable-line
            .filter(isPersonal)
            .map(getId);

          // others
          const isNotPersonal = (val: any) => !reg.test(val);
          const other = allValues.filter(isNotPersonal).map(getId);
          return other;
        },
      } as any,
    },
  },

  occ: {
    attrs: {
      taxon: {
        // For backwards compatibility, remove once everyone uploads their records
        remote: {
          id: 'taxa_taxon_list_id',
          values: ({ warehouseId }: any) => warehouseId,
        },
      },
    },

    create({ Occurrence }) {
      return new Occurrence({
        attrs: {
          taxaTaxonListId: 400349, // Cyanobacteria
        },
      });
    },

    verify: (_: any, occ: OccurrenceClass) =>
      object({
        media: z.array(object({})).min(1, 'Please add a photo of the bloom'),
      }).safeParse(occ).error,
  },

  verify: (attrs: any) =>
    object({
      date: z.string(), // TODO: check future dates
      location: object(
        { latitude: z.number(), longitude: z.number() },
        { required_error: 'Please select location.' }
      ),
    }).safeParse(attrs).error,

  create({ Sample }) {
    const sample = new Sample({ attrs: { surveyId: survey.id } });

    const occurrence = survey.occ!.create!({ Occurrence: OccurrenceClass });
    sample.occurrences.push(occurrence);

    sample.startGPS();

    return sample;
  },
};

export default survey;
