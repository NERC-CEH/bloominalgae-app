import { initStoredSamples } from '@apps';
import { modelStore } from './store';
import Sample from './sample';
import userModel from './userModel';
import remotePullExtInit from './savedSamplesRemotePullExt';
import autoUploadExtInit from './savedSamplesAutoUploadExt';

const savedSamples = initStoredSamples(modelStore, Sample);

function migrateDataToAppVersion2() {
  const changeActivitiesFormat = sample => {
    try {
      if (!Array.isArray(sample.attrs.activities)) {
        console.log('Migrating sample');
        let activities = [];
        if (sample.attrs.activities && sample.attrs.activities.others) {
          activities = [...sample.attrs.activities.others];
        }

        if (sample.attrs.activities && sample.attrs.activities.personal) {
          const prependUser = activity => `user_${activity}`;
          activities = [
            ...activities,
            ...sample.attrs.activities.others.map(prependUser),
          ];
        }

        console.log('Migrated ', activities);
        sample.attrs.activities = activities; // eslint-disable-line
        sample.save();
      }
    } catch (error) {
      console.error(error);
    }
  };
  savedSamples.forEach(changeActivitiesFormat);
}
savedSamples._init.then(migrateDataToAppVersion2);

autoUploadExtInit(savedSamples, userModel);
remotePullExtInit(savedSamples, userModel);

export default savedSamples;
