import { Media } from '@apps';
import Log from 'helpers/log';
import config from 'config';
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';

const { Filesystem } = Plugins;

export default class AppMedia extends Media {
  async destroy(silent) {
    Log('MediaModel: destroying.');

    // remove from internal storage
    if (!Capacitor.isNative || window.testing) {
      if (!this.parent) {
        return null;
      }

      this.parent.media.remove(this);

      if (silent) {
        return null;
      }

      return this.parent.save();
    }

    const URL = this.attrs.data;

    try {
      await Filesystem.deleteFile({
        path: URL,
        directory: FilesystemDirectory.Data,
      });

      if (!this.parent) {
        return null;
      }

      this.parent.media.remove(this);

      if (silent) {
        return null;
      }

      return this.parent.save();
    } catch (err) {
      Log(err, 'e');
    }

    return null;
  }

  getURL() {
    const { data: name } = this.attrs;

    if (!Capacitor.isNative || window.testing) {
      return name;
    }

    return Capacitor.convertFileSrc(`${config.dataPath}/${name}`);
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
