/** ****************************************************************************
 * Sample Edit controller.
 *****************************************************************************/
import Backbone from 'backbone';
import _ from 'lodash';
import Indicia from 'indicia';
import Device from 'helpers/device';
import ImageHelp from 'helpers/image';
import Analytics from 'helpers/analytics';
import Log from 'helpers/log';
import App from 'app';
import radio from 'radio';
import appModel from 'app_model';
import userModel from 'user_model';
import savedSamples from 'saved_samples';
import ImageModel from '../../common/models/image';
import Sample from '../../common/models/sample';
import Occurrence from '../../common/models/occurrence';
import MainView from './main_view';
import HeaderView from './header_view';
import FooterView from './footer_view';

const API = {
  show(sampleID) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      const that = this;
      savedSamples.once('fetching:done', () => {
        API.show.apply(that, [sampleID]);
      });
      return;
    }

    Log('Samples:Edit:Controller: showing.');

    let sample;
    const draftSampleID = appModel.get('draftSampleID');
    if (sampleID) {
      sample = savedSamples.get(sampleID);
      // Not found
      if (!sample) {
        Log('No sample model found.', 'e');
        radio.trigger('app:404:show', { replace: true });
        return;
      }
    } else {
      sample = savedSamples.get(draftSampleID);
      // Not found
      if (!sample) {
        Log('No sample model found.', 'e');
        radio.trigger('app:404:show', { replace: true });
        return;
      }
    }

    // can't edit a saved one - to be removed when sample update
    // is possible on the server
    if (sample.getSyncStatus() === Indicia.SYNCED) {
      radio.trigger('samples:show', sampleID, { replace: true });
      return;
    }


    // MAIN
    const mainView = new MainView({
      model: new Backbone.Model({ sample, appModel }),
    });
    radio.trigger('app:main', mainView);

    // on finish sync move to show
    function checkIfSynced() {
      if (sample.getSyncStatus() === Indicia.SYNCED) {
        radio.trigger('samples:show', sampleID, { replace: true });
      }
    }
    sample.on('request sync error', checkIfSynced);
    mainView.on('destroy', () => {
      // unbind when page destroyed
      sample.off('request sync error', checkIfSynced);
    });


    // HEADER
    let unsent = false;
    savedSamples.each((model) => {
      if (model.cid !== draftSampleID && model.getSyncStatus() !== Indicia.SYNCED) {
        unsent = true;
      }
    });
    const headerView = new HeaderView({
      model: sample,
      unsent,
    });

    headerView.on('save', () => {
      API.save(sample);
    });

    radio.trigger('app:header', headerView);

    // FOOTER
    const footerView = new FooterView({
      model: sample,
    });

    footerView.on('photo:upload', (e) => {
      const photo = e.target.files[0];
      API.photoUpload(sample, photo);
    });

    footerView.on('childview:photo:delete', (model) => {
      API.photoDelete(model);
    });

    // android gallery/camera selection
    footerView.on('photo:selection', () => {
      API.photoSelect(sample);
    });

    radio.trigger('app:footer', footerView);
  },

  save(sample) {
    Log('Samples:Edit:Controller: save clicked.');

    const promise = sample.setToSend();

    // invalid sample
    if (!promise) {
      const invalids = sample.validationError;
      API.showInvalidsMessage(invalids);
      return;
    }

    promise
      .then(() => {
        // create new sample
        const draft = new Sample();
        const occurrence = new Occurrence();
        draft.addOccurrence(occurrence);
        draft.save()
          .then(() => {
            savedSamples.add(draft);

            draft.startGPS();

            appModel.set('draftSampleID', draft.cid);
            appModel.save();

            // navigate to sample edit
            radio.trigger('samples:edit');
          })
          .then(() => {
            // send old one
            if (!Device.isOnline()) {
              radio.trigger('app:dialog:error', {
                message: 'Looks like you are offline!',
              });
              return;
            }

            if (!userModel.hasLogIn()) {
              radio.trigger('user:login', {
                onSuccess() {
                  setTimeout(() => {
                    API._send(sample);
                  }, 200);
                },
              });
              return;
            }

            API._send(sample);
          });
      })
      .catch((err) => {
        Log(err, 'e');
        radio.trigger('app:dialog:error', err);
      });
  },

  _send(sample) {
    radio.trigger('app:dialog', {
      title: '<span class="icon icon-check" style="color:green"></span>' +
      ' Sending the record',
      body: '<p>It has been moved and can be viewed clicking top-right <b>Account</b> button' +
      '<span class="icon icon-user"></span></p>',
      timeout: 10000,
    });

    // sync
    sample.save(null, { remote: true })
      .catch((err = {}) => {
        Log(err, 'e');

        const visibleDialog = App.regions.getRegion('dialog').$el.is(':visible');
        // we don't want to close any other dialog
        if (err.message && !visibleDialog) {
          radio.trigger('app:dialog:error',
            `Sorry, we have encountered a problem while sending the record.
                
                 <p><i>${err.message}</i></p>`
          );
        }
      });
  },

  showInvalidsMessage(invalids) {
    // it wasn't saved so of course this error
    delete invalids.sample.saved; // eslint-disable-line

    let missing = '';
    if (invalids.occurrences) {
      _.each(invalids.occurrences, (message, invalid) => {
        missing += `<b>${invalid}</b> - ${message}</br>`;
      });
    }
    if (invalids.sample) {
      _.each(invalids.sample, (message, invalid) => {
        missing += `<b>${invalid}</b> - ${message}</br>`;
      });
    }

    radio.trigger('app:dialog', {
      title: 'Sorry',
      body: missing,
      timeout: 2000,
    });
  },

  photoUpload(sample, photo) {
    Log('Samples:Edit:Controller: photo uploaded.');

    const occurrence = sample.getOccurrence();
    // todo: show loader
    API.addPhoto(occurrence, photo).catch((err) => {
      Log(err, 'e');
      radio.trigger('app:dialog:error', err);
    });
  },

  photoDelete(photo) {
    radio.trigger('app:dialog', {
      title: 'Delete',
      body: 'Are you sure you want to remove this photo from the sample?' +
      '</br><i><b>Note:</b> it will remain in the gallery.</i>',
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
            // show loader
            photo.destroy({
              success: () => {
                Log('Samples:Edit:Controller: photo deleted.');

                // hide loader
              },
            });
            radio.trigger('app:dialog:hide');
            Analytics.trackEvent('Sample', 'photo remove');
          },
        },
      ],
    });
  },

  photoSelect(sample) {
    Log('Samples:Edit:Controller: photo selection.');
    const occurrence = sample.getOccurrence();

    radio.trigger('app:dialog', {
      title: 'Choose a method to upload a photo',
      buttons: [
        {
          title: 'Camera',
          onClick() {
            ImageHelp.getImage((entry) => {
              API.addPhoto(occurrence, entry.nativeURL, (occErr) => {
                if (occErr) {
                  radio.trigger('app:dialog:error', occErr);
                }
              });
            });
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Gallery',
          onClick() {
            ImageHelp.getImage((entry) => {
              API.addPhoto(occurrence, entry.nativeURL, (occErr) => {
                if (occErr) {
                  radio.trigger('app:dialog:error', occErr);
                }
              });
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
   * Adds a new image to occurrence.
   */
  addPhoto(occurrence, photo) {
    return ImageHelp.getImageModel(ImageModel, photo)
      .then((image) => {
        occurrence.addMedia(image);
        return occurrence.save();
      });
  },
};

export { API as default };
