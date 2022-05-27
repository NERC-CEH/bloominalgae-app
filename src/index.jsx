import React from 'react';
import ReactDOM from 'react-dom';
import { setupConfig, isPlatform } from '@ionic/react';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as AppPlugin } from '@capacitor/app';
import i18n from 'i18next';
import config from 'config';
import { configure } from 'mobx';
import { initReactI18next } from 'react-i18next';
import { initAnalytics } from '@apps';
import 'common/translations/translator';
import getLangCodeFromDevice from 'common/helpers/getLangCodeFromDevice';
import languages from 'common/languages';
import '@capacitor/core';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'common/theme.scss';
import App from './App';

i18n.use(initReactI18next).init({
  lng: config.DEFAULT_LANGUAGE,
});

configure({
  enforceActions: 'never',
});

setupConfig({
  hardwareBackButton: false, // android back button
  swipeBackEnabled: false,
});

async function init() {
  await appModel._init;
  await userModel._init;
  await savedSamples._init;

  if (!appModel.attrs.language) {
    const languageCode = await getLangCodeFromDevice(Object.keys(languages));
    appModel.attrs.language = languageCode || config.DEFAULT_LANGUAGE;
    appModel.save();
  }

  appModel.attrs.sendAnalytics &&
    initAnalytics({
      dsn: config.sentryDNS,
      environment: config.environment,
      build: config.build,
      release: config.version,
      userId: userModel.attrs.id,
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
