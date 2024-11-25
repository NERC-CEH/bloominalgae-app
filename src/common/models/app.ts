import { Model, ModelAttrs } from '@flumens';
import { mainStore } from './store';

export interface Attrs extends ModelAttrs {
  sendAnalytics: boolean;
  appSession: number;
  language: string;
  country: string;

  feedbackGiven: boolean;
  showedWelcome: boolean;

  // draft survey pointers
  'draftId:survey'?: string;

  showVerifiedRecordsNotification: boolean;
  verifiedRecordsTimestamp: null | number;

  // tips
  showSurveysDeleteTip: boolean;
  showSurveyUploadTip: boolean;
  showLanguageTip: boolean;
}

const defaults: Attrs = {
  appSession: 0,
  showedWelcome: false,
  language: '',
  country: '',
  sendAnalytics: true,
  feedbackGiven: false,

  showVerifiedRecordsNotification: true,
  verifiedRecordsTimestamp: null,

  // tips
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,
  showLanguageTip: true,

  // draft survey pointers
  'draftId:survey': '',
};

export class AppModel extends Model<Attrs> {
  constructor(options: any) {
    super({ ...options, attrs: { ...defaults, ...options.attrs } });

    // fix old language choices - TODO: remove in the future
    this.ready?.then(() => {
      if (this.attrs.language === 'fr-Fr') {
        console.log('Changing fr-Fr to fr-BE');
        this.attrs.language = 'fr-BE';
        this.save();
      }
    });
  }

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: mainStore });
export default appModel;
