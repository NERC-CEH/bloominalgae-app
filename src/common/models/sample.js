import { Sample } from '@apps';
import GPSExtension from './sampleGPSExt';
// import surveyConfig from '../../Survey/config';
import { modelStore } from './store';

class AppSample extends Sample {
  store = modelStore;

  constructor(...args) {
    super(...args);

    Object.assign(this, GPSExtension);
    this.gpsExtensionInit();
  }

  // getSurvey() {
  //   const survey = surveyConfig;

  //   if (!survey) {
  //     throw new Error('No survey config was found');
  //   }

  //   if (this.parent) {
  //     return survey.smp;
  //   }

  //   return survey;
  // }

  isDisabled() {
    if (this.parent) {
      return this.parent.isDisabled();
    }

    return !!this.metadata.synced_on;
  }
}

export default AppSample;
