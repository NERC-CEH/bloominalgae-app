/** ****************************************************************************
 * Sample Edit header view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import Indicia from 'indicia';
import JST from 'JST';

export default Marionette.View.extend({
  tagName: 'nav',
  template: JST['samples/edit/header'],

  events: {
    'click a[data-rel="back"]': 'navigateBack',
  },

  triggers: {
    'click #sample-save-btn': 'save',
  },

  modelEvents: {
    'request sync error': 'render',
  },

  navigateBack() {
    window.history.back();
  },

  serializeData() {
    return {
      draft: !this.model.metadata.saved,
      unsent: this.options.unsent,
      isSynchronising: this.model.getSyncStatus() === Indicia.SYNCHRONISING,
    };
  },
});

