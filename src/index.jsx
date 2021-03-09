import React from 'react';
import ReactDOM from 'react-dom';
import { setupConfig, isPlatform } from '@ionic/react';
import appModel from 'appModel';
import savedSamples from 'savedSamples';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import i18n from 'i18next';
import config from 'config';
import { configure } from 'mobx';
import { initReactI18next } from 'react-i18next';
import { initAnalytics } from '@apps';
import 'common/translations/translator';
import App from './App';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'common/theme.scss';

const { App: AppPlugin, StatusBar, SplashScreen } = Plugins;

i18n.use(initReactI18next).init({
  lng: 'en',
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
  // await userModel._init; // TODO:
  await savedSamples._init;

  initAnalytics({
    dsn: config.sentryDNS,
    environment: config.environment,
    build: config.build,
    release: config.version,
    // userId: userModel.attrs.id, // TODO:
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
