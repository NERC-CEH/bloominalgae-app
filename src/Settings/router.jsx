import { Route } from 'react-router-dom';
import appModel from 'models/app';
import userModel from 'models/user';
import savedSamples from 'models/savedSamples';
import Menu from './Menu';
import Language from './Language';
import Country from './Country';

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
