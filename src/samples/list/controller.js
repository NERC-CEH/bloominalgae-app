/** ****************************************************************************
 * Sample List controller.
 *****************************************************************************/
import Indicia from 'indicia';
import radio from 'radio';
import Log from 'helpers/log';
import Analytics from 'helpers/analytics';
import ImageHelp from 'helpers/image';
import appModel from 'app_model';
import savedSamples from 'saved_samples';
import Sample from 'sample';
import Occurrence from 'occurrence';
import ImageModel from '../../common/models/image';
import MainView from './main_view';
import HeaderView from './header_view';

const API = {
  show() {
    Log(`Samples:List:Controller: showing ${savedSamples.length}.`);

    // MAIN
    const mainView = new MainView({
      collection: savedSamples,
      appModel,
    });

    mainView.on('childview:sample:edit:attr', (childView, attr) => {
      radio.trigger('samples:edit:attr', childView.model.cid, attr);
    });

    mainView.on('childview:sample:delete', (childView) => {
      const sample = childView.model;
      API.sampleDelete(sample);
    });
    radio.trigger('app:main', mainView);

    // HEADER
    const headerView = new HeaderView({ model: appModel });

    headerView.on('photo:upload', (e) => {
      const photo = e.target.files[0];
      API.photoUpload(photo);
    });

    // android gallery/camera selection
    headerView.on('photo:selection', API.photoSelect);

    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  sampleDelete(sample) {
    Log('Samples:List:Controller: deleting sample.');

    const syncStatus = sample.getSyncStatus();
    let body = 'This record hasn\'t been saved to iRecord yet, ' +
      'are you sure you want to remove it from your device?';

    if (syncStatus === Indicia.SYNCED) {
      body = 'Are you sure you want to remove this record from your device?';
      body += '</br><i><b>Note:</b> it will remain on the server.</i>';
    }
    radio.trigger('app:dialog', {
      title: 'Delete',
      body,
      buttons: [
        {
          title: 'Cancel',
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Delete',
          class: 'btn-negative',
          onClick() {
            sample.destroy();
            radio.trigger('app:dialog:hide');
            Analytics.trackEvent('List', 'sample remove');
          },
        },
      ],
    });
  },

  photoUpload(photo) {
    Log('Samples:List:Controller: photo upload.');

    // todo: show loader
    API.createNewSample(photo).catch((err) => {
      Log(err, 'e');
      radio.trigger('app:dialog:error', err);
    });
  },

  photoSelect() {
    Log('Samples:List:Controller: photo select.');

    radio.trigger('app:dialog', {
      title: 'Choose a method to upload a photo',
      buttons: [
        {
          title: 'Camera',
          onClick() {
            ImageHelp.getImage((entry) => {
              API.createNewSample(entry.nativeURL, () => {});
            });
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Gallery',
          onClick() {
            ImageHelp.getImage((entry) => {
              API.createNewSample(entry.nativeURL, () => {});
            }, {
              sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
              saveToPhotoAlbum: false,
            });
            radio.trigger('app:dialog:hide');
          },
        },
      ],
    });
  },

  /**
   * Creates a new sample with an image passed as an argument.
   */
  createNewSample(photo) {
    return ImageHelp.getImageModel(ImageModel, photo)
      .then((image) => {
        const occurrence = new Occurrence();
        occurrence.addMedia(image);

        const sample = new Sample();
        sample.addOccurrence(occurrence);

        return sample.save().then(() => {
          savedSamples.add(sample);
          // no previous location
          sample.startGPS();

          return sample;
        });
      });
  },
};

export { API as default };
