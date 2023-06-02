import PropTypes from 'prop-types';
import { Page, Header, useToast } from '@flumens';
import { observer } from 'mobx-react';
import Main from './Main';

const resetApp = async (saveSamples, appModel, userModel, toast) => {
  console.log('Settings:Menu:Controller: resetting the application!', 'w');
  try {
    await saveSamples.resetDefaults();
    await appModel.resetDefaults();
    await userModel.resetDefaults();
    toast.success('Done');
  } catch (e) {
    toast.error(e);
  }
};

function onToggle(appModel, setting, checked) {
  appModel.attrs[setting] = checked; // eslint-disable-line
  appModel.save();
}

const MenuController = props => {
  const { savedSamples, appModel, userModel } = props;
  const { sendAnalytics, language, country } = appModel.attrs;
  const toast = useToast();

  const resetApplication = () =>
    resetApp(savedSamples, appModel, userModel, toast);
  const onToggleWrap = (...args) => onToggle(appModel, ...args);

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        resetApp={resetApplication}
        language={language}
        country={country}
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
