import { initStoredSamples } from '@flumens';
import appModel from './app';
import Sample from './sample';
import autoUploadExtInit from './savedSamplesAutoUploadExt';
import remotePullExtInit from './savedSamplesRemotePullExt';
import { modelStore } from './store';
import userModel from './user';

console.log('SavedSamples: initializing');

type Collection = Sample[] & {
  ready: Promise<any>;
  resetDefaults: any;
  verified: any;
};

const savedSamples: Collection = initStoredSamples(modelStore, Sample);

autoUploadExtInit(savedSamples, userModel);
remotePullExtInit(savedSamples, userModel, appModel);

export default savedSamples;
