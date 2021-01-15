import { Sample } from '@apps';
import GPSExtension from './sampleGPSExt';
import Media from './media';
import surveyConfig from '../../Survey/config';
import Occurrence from './occurrence';
import { modelStore } from './store';

class AppSample extends Sample {
  static fromJSON(json) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }

  store = modelStore;

  constructor(...args) {
    super(...args);

    Object.assign(this, GPSExtension);
    this.survey = surveyConfig;

    this.gpsExtensionInit();
  }

  // TODO:  rename disable
  isDisabled() {
    return this.isUploaded();
  }
}

export default AppSample;
