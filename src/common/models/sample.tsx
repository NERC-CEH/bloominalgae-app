/* eslint-disable max-classes-per-file */

/* eslint-disable no-param-reassign */
import { IObservableArray } from 'mobx';
import { useTranslation } from 'react-i18next';
import {
  Sample as SampleOriginal,
  SampleAttrs,
  SampleOptions,
  SampleMetadata,
  getDeepErrorMessage,
  device,
  useAlert,
} from '@flumens';
import config from 'common/config';
import userModel from 'models/user';
import surveyConfig from 'Survey/config';
import Media from './media';
import Occurrence from './occurrence';
import GPSExtension from './sampleGPSExt';
import { modelStore } from './store';

type Location = {
  latitude?: string;
  longitude?: string;
  source?: string;
  accuracy?: number;
  gridref?: string;
};

type Attrs = SampleAttrs & {
  location?: Location;
  activities?: any;
};

type Metadata = SampleMetadata & {
  /**
   * Survey name.
   */
  survey: 'survey';

  saved?: boolean;

  // verification
  verification: any;
  verification_substatus: any;
};

export default class Sample extends SampleOriginal<Attrs, Metadata> {
  static fromJSON(json: any) {
    return super.fromJSON(json, Occurrence, Sample, Media);
  }

  declare occurrences: IObservableArray<Occurrence>;

  declare samples: IObservableArray<Sample>;

  declare media: IObservableArray<Media>;

  declare parent?: Sample;

  declare survey: any;

  declare toggleGPStracking: any;

  startGPS: any; // from extension

  isGPSRunning: any; // from extension

  stopGPS: any; // from extension

  constructor({
    isSubSample,
    ...options
  }: SampleOptions & { isSubSample?: boolean }) {
    // only top samples should have the store, otherwise sync() will save sub-samples on attr change.
    const store = isSubSample ? undefined : modelStore; // eventually remove this once using a SubSample class.

    super({ ...options, store });

    this.remote.url = `${config.backend.indicia.url}/index.php/services/rest`;
    // eslint-disable-next-line
    this.remote.headers = async () => ({
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
    });

    this.survey = surveyConfig;

    Object.assign(this, GPSExtension());
  }

  cleanUp() {
    this.stopGPS();

    const stopGPS = (smp: Sample) => {
      smp.stopGPS();
    };
    this.samples.forEach(stopGPS);
  }

  async upload() {
    if (this.remote.synchronising || this.isUploaded()) return true;

    const invalids = this.validateRemote();
    if (invalids) return false;

    if (!device.isOnline) return false;

    const isActivated = await userModel.checkActivation();
    if (!isActivated) return false;

    this.cleanUp();

    return this.saveRemote();
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

export const useValidateCheck = (sample: Sample) => {
  const alert = useAlert();
  const { t } = useTranslation();

  const showValidateCheck = () => {
    const invalids = sample.validateRemote();
    if (invalids) {
      alert({
        header: t('Survey incomplete'),
        skipTranslation: true,
        // TODO: remove the replace once the flumens lib is fixed
        message: (
          <>
            <div>
              {getDeepErrorMessage(invalids)
                .split('<br/>')
                .map(val => (
                  <div> {val}</div>
                ))}
            </div>
          </>
        ),
        buttons: [
          {
            text: t('Got it'),
            role: 'cancel',
          },
        ],
      });
      return false;
    }
    return true;
  };

  return showValidateCheck;
};
