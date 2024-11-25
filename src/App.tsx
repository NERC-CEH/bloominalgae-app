import { Route, Redirect } from 'react-router-dom';
import {
  TailwindBlockContext,
  TailwindContext,
  TailwindContextValue,
  defaultContext,
} from '@flumens';
import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import CountrySelectRequired from 'common/Components/CountrySelectRequired';
import UpdatedRecordsAlert from 'common/Components/UpdatedRecordsAlert';
import 'common/theme.scss';
import 'common/translations/translator';
import savedSamples from 'models/collections/samples';
import userModel from 'models/user';
import Menu from 'Components/Menu';
import Home from './Home';
import SplashScreenRequired from './Info/SplashScreenRequired';
import Info from './Info/router';
import Settings from './Settings/router';
import Survey from './Survey/router';
import User from './User/router';

const platform = isPlatform('ios') ? 'ios' : 'android';
const tailwindContext: TailwindContextValue = { platform };
const tailwindBlockContext = {
  ...defaultContext,
  ...tailwindContext,
  basePath: '',
};

const HomeRedirect = () => {
  return <Redirect to="home/info" />;
};

const App = () => (
  <IonApp>
    <CountrySelectRequired>
      <SplashScreenRequired>
        <TailwindContext.Provider value={tailwindContext}>
          <TailwindBlockContext.Provider value={tailwindBlockContext}>
            <IonReactRouter>
              <UpdatedRecordsAlert />
              <IonRouterOutlet id="user">{User}</IonRouterOutlet>
              <Menu userModel={userModel} savedSamples={savedSamples} />
              <IonRouterOutlet id="main">
                <Route exact path="/" component={HomeRedirect} />
                <Route path="/home" component={Home} />
                {Info}
                {Survey}
                {Settings}
                {User}
              </IonRouterOutlet>
            </IonReactRouter>
          </TailwindBlockContext.Provider>
        </TailwindContext.Provider>
      </SplashScreenRequired>
    </CountrySelectRequired>
  </IonApp>
);

export default App;
