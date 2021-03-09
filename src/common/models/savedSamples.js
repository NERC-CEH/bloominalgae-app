import { initStoredSamples } from '@apps';
import { modelStore } from './store';
import Sample from './sample';
import userModel from './userModel';
import autoUploadExtInit from './savedSamplesAutoUploadExt';

const savedSamples = initStoredSamples(modelStore, Sample);

autoUploadExtInit(savedSamples, userModel);

export default savedSamples;
