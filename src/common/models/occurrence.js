import { Occurrence } from '@apps';
import Media from './media';

export default class AppOccurrence extends Occurrence {
  static fromJSON(json) {
    return super.fromJSON(json, Media);
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}