import { observable } from 'mobx';
import { SampleCollection } from '@flumens';
import Sample from 'models/sample';
import appModel from '../app';
import { samplesStore } from '../store';
import userModel from '../user';
import autoUploadExtInit from './savedSamplesAutoUploadExt';
import remotePullExtInit from './savedSamplesRemotePullExt';

console.log('SavedSamples: initializing');

class SampleCollectionVerified extends SampleCollection<Sample> {
  // in-memory observable to use in reports and other views
  verified = observable({ updated: [], timestamp: null });

  resetDefaults() {
    return this.reset();
  }
}

const samples = new SampleCollectionVerified({
  store: samplesStore,
  Model: Sample,
});

export function getPending() {
  const byUploadStatus = (sample: Sample) =>
    !sample.syncedAt && sample.metadata.saved;

  return samples.filter(byUploadStatus);
}

autoUploadExtInit(samples, userModel);
remotePullExtInit(samples, userModel, appModel);

export default samples;
