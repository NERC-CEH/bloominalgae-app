import { Capacitor } from '@capacitor/core';
import {
  Filesystem,
  Directory as FilesystemDirectory,
} from '@capacitor/filesystem';
import { Media as MediaOriginal } from '@flumens';
import { isPlatform } from '@ionic/react';
import config from 'common/config';

export default class Media extends MediaOriginal {
  async destroy(silent?: boolean) {
    // remove from internal storage
    if (!isPlatform('hybrid')) {
      if (!this.parent) return;

      this.parent.media.remove(this);

      if (silent) return;

      this.parent.save();
      return;
    }

    const URL = this.attrs.data;

    try {
      if (this.attrs.path) {
        // backwards compatible - don't delete old media
        await Filesystem.deleteFile({
          path: URL,
          directory: FilesystemDirectory.Data,
        });
      }

      if (!this.parent) return;

      this.parent.media.remove(this);

      if (silent) return;

      this.parent.save();
      return;
    } catch (err) {
      console.error(err);
    }
  }

  getURL() {
    const { data: name, path } = this.attrs;

    if (!isPlatform('hybrid') || process.env.NODE_ENV === 'test') {
      return name;
    }

    let pathToFile = config.dataPath;

    // backwards compatible
    if (!path && isPlatform('ios')) {
      pathToFile = config.dataPath.replace('/Documents/', '/Library/NoCloud/');
    }

    return Capacitor.convertFileSrc(`${pathToFile}/${name}`);
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
