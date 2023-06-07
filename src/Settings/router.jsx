import { Route } from 'react-router-dom';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import userModel from 'models/user';
import Country from './Country';
import Language from './Language';
import Menu from './Menu';

const MenuWrap = () => (
  <Menu appModel={appModel} savedSamples={savedSamples} userModel={userModel} />
);

const LanguageWrap = () => <Language appModel={appModel} />;
const CountryWrap = () => <Country appModel={appModel} />;

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

  <Route
    path="/settings/country"
    key="/settings/country"
    exact
    render={CountryWrap}
  />,
];
