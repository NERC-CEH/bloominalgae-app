/** ****************************************************************************
 * Sample Edit main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import Indicia from 'indicia';
import JST from 'JST';
import DateHelp from 'helpers/date';
import StringHelp from 'helpers/string';

import './styles.scss';

export default Marionette.View.extend({
  template: JST['samples/edit/main'],

  initialize() {
    const sample = this.model.get('sample');
    this.listenTo(sample, 'request sync error geolocation', this.render);
  },

  serializeData() {
    const sample = this.model.get('sample');
    const occ = sample.getOccurrence();

    const locationPrint = sample.printLocation();
    const location = sample.get('location') || {};

    const number = occ.get('number') && StringHelp.limit(occ.get('number'));

    return {
      id: sample.cid,
      training: occ.metadata.training,
      isLocating: sample.isGPSRunning(),
      isSynchronising: sample.getSyncStatus() === Indicia.SYNCHRONISING,
      location: locationPrint,
      location_name: location.name,
      date: DateHelp.print(sample.get('date'), true),
      number,
      comment: occ.get('comment') && StringHelp.limit(occ.get('comment')),
    };
  },
});
