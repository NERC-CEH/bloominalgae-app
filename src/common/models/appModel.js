import { Model } from '@apps';
import { genericStore } from './store';

class AppModel extends Model {}

const defaults = {
  showedWelcome: false,
  language: null,
  sendAnalytics: true,
  recordDraftId: null,
};

const appModel = new AppModel(genericStore, 'app', defaults);

export { appModel as default, AppModel };
