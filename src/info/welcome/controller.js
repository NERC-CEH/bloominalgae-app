import radio from 'radio';
import savedSamples from 'saved_samples';
import appModel from '../../common/models/app_model';
import Sample from '../../common/models/sample';
import Occurrence from '../../common/models/occurrence';
import MainView from './main_view';

const API = {
  show() {
    const mainView = new MainView();
    radio.trigger('app:main', mainView);
    mainView.on('exit', API.exit);

    // HEADER
    radio.trigger('app:header:hide');

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  // sample species
  exit() {
    appModel.save({ showWelcome: false });

    // create new sample
    const sample = new Sample();
    const occurrence = new Occurrence();
    sample.addOccurrence(occurrence);
    sample.save().then(() => {
      savedSamples.add(sample);

      sample.startGPS();

      appModel.set('draftSampleID', sample.cid);
      appModel.save();

      // navigate to sample edit
      radio.trigger('samples:edit');
    });
  },
};

export { API as default };
