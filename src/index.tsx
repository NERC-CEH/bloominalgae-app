import { configure as mobxConfig } from 'mobx';
import i18n from 'i18next';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';
import { App as AppPlugin } from '@capacitor/app';
import '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { initAnalytics } from '@flumens';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { setupIonicReact, isPlatform } from '@ionic/react';
import config from 'common/config';
import getLangCodeFromDevice from 'common/helpers/getLangCodeFromDevice';
import languages from 'common/languages';
import 'common/theme.scss';
import 'common/translations/translator';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import userModel from 'models/user';
import App from './App';

console.log('🚩 App starting.'); // eslint-disable-line

i18n.use(initReactI18next).init({
  lng: config.DEFAULT_LANGUAGE,
});

setupIonicReact({
  hardwareBackButton: false, // android back button
  swipeBackEnabled: false,
});

mobxConfig({ enforceActions: 'never' });

async function init() {
  await appModel.ready;
  await userModel.ready;
  await savedSamples.ready;

  if (!appModel.attrs.language) {
    const langCode =
      (await getLangCodeFromDevice(Object.entries(languages))) ||
      config.DEFAULT_LANGUAGE;

    appModel.attrs.language = langCode;
    appModel.save();
  }

  appModel.attrs.sendAnalytics &&
    initAnalytics({
      dsn: config.sentryDNS,
      environment: config.environment,
      build: config.build,
      release: config.version,
      userId: userModel.id,
      tags: {
        'app.appSession': appModel.attrs.appSession,
      },
    });

  appModel.attrs.appSession += 1;
  appModel.save();

  ReactDOM.render(<App />, document.getElementById('root'));

  if (isPlatform('hybrid')) {
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });

    SplashScreen.hide();

    AppPlugin.addListener('backButton', () => {
      /* disable android app exit using back button */
    });
  }
}

init();
