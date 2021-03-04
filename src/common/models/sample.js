import { Sample } from '@apps';
import userModel from 'userModel';
import config from 'common/config/config';
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
}

export default AppSample;
