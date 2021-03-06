import { Model } from '@apps';
import { genericStore } from './store';

class AppModel extends Model {}

const defaults = {
  appSession: 0,
  showedWelcome: false,
  language: null,
  sendAnalytics: true,
  recordDraftId: null,

  // tips
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,

  // draft survey pointers
  'draftId:survey': null,
};

const appModel = new AppModel(genericStore, 'app', defaults);

export { appModel as default, AppModel };
