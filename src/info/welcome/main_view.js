/** ****************************************************************************
 * Home main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import JST from 'JST';
import './styles.scss';
import './images/app_logo.png';
import './images/background.png';

export default Marionette.View.extend({
  id: 'home',
  template: JST['info/welcome/main'],

  triggers: {
    'click #exit': 'exit',
  },
});
