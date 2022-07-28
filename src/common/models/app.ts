import { Model, ModelAttrs } from '@flumens';
import { genericStore } from './store';

export interface Attrs extends ModelAttrs {
  sendAnalytics: boolean;
  appSession: number;
  language: string;
  country: string;

  feedbackGiven: boolean;
  showedWelcome: boolean;

  // draft survey pointers
  'draftId:survey'?: string;

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

  // tips
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,
  showLanguageTip: true,

  // draft survey pointers
  'draftId:survey': '',
};

export class AppModel extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });
export default appModel;
