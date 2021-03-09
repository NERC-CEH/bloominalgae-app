import { initStoredSamples } from '@apps';
import { modelStore } from './store';
import Sample from './sample';
import userModel from './userModel';
import remotePullExtInit from './savedSamplesRemotePullExt';
import autoUploadExtInit from './savedSamplesAutoUploadExt';

const savedSamples = initStoredSamples(modelStore, Sample);

autoUploadExtInit(savedSamples, userModel);
remotePullExtInit(savedSamples, userModel);

export default savedSamples;
