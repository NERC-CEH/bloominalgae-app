import { Sample } from '@apps';
import GPSExtension from './sampleGPSExt';
import surveyConfig from '../../Survey/config';
import { modelStore } from './store';

class AppSample extends Sample {
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
