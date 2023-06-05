import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Header, useToast, useLoader } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import userModel from 'models/user';
import Main from './Main';

const resetApp = async (toast: any) => {
  console.log('Settings:Menu:Controller: resetting the application!', 'w');
  try {
    await savedSamples.resetDefaults();
    await appModel.resetDefaults();
    await userModel.resetDefaults();
    toast.success('Done');
  } catch (e) {
    toast.error(e);
  }
};

const useDeleteUser = () => {
  const toast = useToast();
  const loader = useLoader();
  const { goBack } = useContext(NavContext);

  const deleteUser = async () => {
    console.log('Settings:Menu:Controller: deleting the user!');

    await loader.show('Please wait...');

    try {
      await userModel.delete();
      goBack();
      toast.success('Done');
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  };

  return deleteUser;
};

function onToggle(setting: string, checked: boolean) {
  (appModel.attrs as any)[setting] = checked; // eslint-disable-line
  appModel.save();
}

const MenuController: FC = () => {
  const { sendAnalytics, language, country } = appModel.attrs;
  const toast = useToast();
  const deleteUser = useDeleteUser();

  const resetApplication = () => resetApp(toast);

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        isLoggedIn={userModel.isLoggedIn()}
        deleteUser={deleteUser}
        resetApp={resetApplication}
        language={language}
        country={country}
        sendAnalytics={sendAnalytics}
        onToggle={onToggle}
      />
    </Page>
  );
};

export default observer(MenuController);
