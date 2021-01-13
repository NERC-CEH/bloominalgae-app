import React from 'react';
import { Route } from 'react-router-dom';
import appModel from 'appModel';
import userModel from 'userModel';
import savedSamples from 'savedSamples';
import Menu from './Menu';
import Language from './Language';

const MenuWrap = () => (
  <Menu appModel={appModel} savedSamples={savedSamples} userModel={userModel} />
);

const LanguageWrap = () => <Language appModel={appModel} />;

export default [
  <Route
    path="/settings/menu"
    key="/settings/menu"
    exact
    component={MenuWrap}
  />,

  <Route
    path="/settings/language"
    key="/settings/language"
    exact
    render={LanguageWrap}
  />,
];
