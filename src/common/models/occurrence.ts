import { IObservableArray } from 'mobx';
import {
  Occurrence as OccurrenceOriginal,
  OccurrenceAttrs,
  OccurrenceMetadata,
  validateRemoteModel,
} from '@flumens';
import Media from './media';
import Sample from './sample';

export type Taxon = any;

type Attrs = Omit<OccurrenceAttrs, 'taxon'> & {
  taxon?: Taxon;
};

type Metadata = OccurrenceMetadata & {
  verification?: {
    verification_status: any;
    verification_substatus: any;
    verified_on: any;
    verifier?: { name: string };
  };
};
export default class Occurrence extends OccurrenceOriginal<Attrs, Metadata> {
  static fromJSON(json: any) {
    return super.fromJSON(json, Media);
  }

  declare media: IObservableArray<Media>;

  declare parent?: Sample;

  validateRemote = validateRemoteModel;

  getPrettyName() {
    const { taxon } = this.attrs;
    if (!taxon) return '';

    if (Number.isFinite(taxon.found_in_name))
      return taxon.common_names[taxon.found_in_name as number];

    return taxon.scientific_name;
  }

  getVerificationStatus() {
    let status = this.metadata?.verification?.verification_status;

    if (this.parent?.metadata?.verification) {
      // TODO: backwards compatible
      status = this.parent.metadata?.verification;
    }

    if (!status) return ''; // pending

    let substatus = this.metadata?.verification?.verification_substatus;

    if (this.parent?.metadata?.verification_substatus) {
      // TODO: backwards compatible
      substatus = this.parent.metadata?.verification_substatus;
    }

    if (status.match(/V/i)) return 'verified';
    if (status.match(/C/i) && substatus === '3') return 'plausible';
    if (status.match(/R/i)) return 'rejected';

    return ''; // pending
  }

  hasOccurrenceBeenVerified() {
    const isRecordInReview =
      this.metadata?.verification?.verification_status === 'C' &&
      this.metadata?.verification?.verification_substatus !== '3';

    return (
      this.isUploaded() && this.metadata?.verification && !isRecordInReview
    );
  }

  getVerificationStatusMessage() {
    const codes: { [keyof: string]: string } = {
      V: 'Accepted',
      V1: 'Accepted as correct',
      V2: 'Accepted as considered correct',

      C: 'Pending review',
      C3: 'Plausible',

      R: 'Not accepted',
      R4: 'Not accepted as unable to verify',
      R5: 'Not accepted as correct',

      // not supported
      D: 'Dubious',
      T: 'Test',
      I: 'Incomplete',
    };

    const statusWithSubstatus = `${this.metadata?.verification?.verification_status}${this.metadata?.verification?.verification_substatus}`;

    return codes[statusWithSubstatus];
  }
}
