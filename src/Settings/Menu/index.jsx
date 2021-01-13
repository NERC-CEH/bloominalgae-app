import React from 'react';
import PropTypes from 'prop-types';
import { Page, Header, toast } from '@apps';
import { observer } from 'mobx-react';
import Log from 'helpers/log';
import Main from './Main';

const { success, error } = toast;

const resetApp = async (saveSamples, appModel, userModel) => {
  Log('Settings:Menu:Controller: resetting the application!', 'w');
  try {
    await saveSamples.resetDefaults();
    await appModel.resetDefaults();
    await userModel.resetDefaults();
    success('Done');
  } catch (e) {
    error(`${e.message}`);
  }
};

function onToggle(appModel, setting, checked) {
  appModel.attrs[setting] = checked; // eslint-disable-line
  appModel.save();
}

const MenuController = props => {
  const { savedSamples, appModel, userModel } = props;
  const { sendAnalytics, language } = appModel.attrs;

  const resetApplication = () => resetApp(savedSamples, appModel, userModel);
  const onToggleWrap = (...args) => onToggle(appModel, ...args);

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        resetApp={resetApplication}
        language={language}
        sendAnalytics={sendAnalytics}
        onToggle={onToggleWrap}
      />
    </Page>
  );
};

MenuController.propTypes = {
  userModel: PropTypes.object.isRequired,
  appModel: PropTypes.object.isRequired,
  savedSamples: PropTypes.array.isRequired,
};

export default observer(MenuController);
