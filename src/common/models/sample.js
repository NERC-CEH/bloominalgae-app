import { Sample } from '@apps';
import userModel from 'userModel';
import config from 'common/config';
import { observable } from 'mobx';
import surveyConfig from '../../Survey/config';
import GPSExtension from './sampleGPSExt';
import { modelStore } from './store';
import Occurrence from './occurrence';
import Media from './media';

class AppSample extends Sample {
  static fromJSON(json) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }

  store = modelStore;

  constructor(...args) {
    super(...args);

    this.remote = observable({
      api_key: config.backend.apiKey,
      host_url: `${config.backend.url}/`,
      user: userModel.getUser.bind(userModel),
      password: userModel.getPassword.bind(userModel),
      synchronising: false,
    });

    this.survey = surveyConfig;

    Object.assign(this, GPSExtension);
    this.gpsExtensionInit();
  }

  getVerificationStatus = () => {
    // const codes = {
    //   V: 'Accepted',
    //   V1: 'Accepted as correct',
    //   V2: 'Accepted as considered correct',

    //   C: 'Pending review',
    //   C3: 'Plausible',

    //   R: 'Not accepted',
    //   R4: 'Not accepted as unable to verify',
    //   R5: 'Not accepted as incorrect',

    //   D: 'Dubious',
    //   T: 'Test',
    //   I: 'Incomplete',
    // };

    const status = this.metadata.verification;

    if (!status) return ''; // pending

    const substatus = this.metadata.verification_substatus;

    if (status.match(/V/i)) return 'verified';
    if (status.match(/C/i) && substatus === '3') return 'plausible';
    if (status.match(/R/i)) return 'rejected';

    return ''; // pending
  };
}

export default AppSample;
