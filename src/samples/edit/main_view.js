/** ****************************************************************************
 * Sample Edit main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import Indicia from 'indicia';
import JST from 'JST';
import DateHelp from 'helpers/date';
import StringHelp from 'helpers/string';
import './images/app_logo_dark.png';


import './styles.scss';

export default Marionette.View.extend({
  template: JST['samples/edit/main'],

  initialize() {
    const sample = this.model.get('sample');
    this.listenTo(sample, 'request sync error geolocation', this.render);
  },

  serializeData() {
    const appModel = this.model.get('appModel');
    const sample = this.model.get('sample');
    const occ = sample.getOccurrence();

    const locationPrint = sample.printLocation();
    const location = sample.get('location') || {};

    const activities = sample.get('activities') || {
        personal: [],
        others: [],
      };

    let activitiesText = '';
    if (activities.personal.length + activities.others.length) {
      activitiesText = `${activities.personal.length + activities.others.length} acitivities`;
    }

    return {
      id: sample.cid,
      training: occ.metadata.training,
      isLocating: sample.isGPSRunning(),
      isSynchronising: sample.getSyncStatus() === Indicia.SYNCHRONISING,
      location: locationPrint,
      location_name: location.name,
      date: DateHelp.print(sample.get('date'), true),
      size: sample.get('size'),
      activitiesText,
      comment: occ.get('comment') && StringHelp.limit(occ.get('comment')),
    };
  },
});
