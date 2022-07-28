import { Media } from '@flumens';
import config from 'common/config';
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default class AppMedia extends Media {
  async destroy(silent) {
    console.log('MediaModel: destroying.');

    // remove from internal storage
    if (!Capacitor.isNativePlatform() || window.testing) {
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

    if (!Capacitor.isNativePlatform() || window.testing) {
      return name;
    }

    // make backwards compatible with cordova.file.dataDirectory
    if (!path) {
      if (isPlatform('ios')) {
        path = config.dataPath.replace('/Documents/', '/Library/NoCloud/');
      } else {
        name = name.replace('file://', '');
      }
    } else if (isPlatform('ios')) {
      // when rebuilding across (dev?) builds the app ID changes and so the image is not found
      // probably best to stick to the config.dataPath and also set the path to the image for future
      // reference. Even better would be to store in the image only the last path "/Documents" or whatever goes
      // after the app ID.
      path = config.dataPath;
    }

    return Capacitor.convertFileSrc(`${path}/${name}`);
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
