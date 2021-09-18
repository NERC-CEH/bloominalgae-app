import { Media } from '@apps';
import Log from 'helpers/log';
import config from 'config';
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

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
        directory: Directory.Data,
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
    let { data: name, path = '' } = this.attrs;

    if (!Capacitor.isNative || window.testing) {
      return name;
    }

    // make backwards compatible with cordova.file.dataDirectory
    if (!path) {
      if (isPlatform('ios')) {
        path = config.dataPath.replace('/Documents/', '/Library/NoCloud/');
      } else {
        name = name.replace('file://', '');
      }
    }

    return Capacitor.convertFileSrc(`${path}/${name}`);
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
