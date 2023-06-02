import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import CountrySelectRequired from 'common/Components/CountrySelectRequired';
import UpdatedRecordsAlert from 'common/Components/UpdatedRecordsAlert';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import userModel from 'models/user';
import Menu from 'Components/Menu';
import Home from './Home';
import SplashScreenRequired from './Info/SplashScreenRequired';
import Info from './Info/router';
import Settings from './Settings/router';
import Survey from './Survey/router';
import User from './User/router';

console.log('🚩 App starting.'); // eslint-disable-line

const HomeRedirect = () => {
  return <Redirect to="home/info" />;
};

const App = () => (
  <IonApp>
    <CountrySelectRequired appModel={appModel}>
      <SplashScreenRequired appModel={appModel}>
        <IonReactRouter>
          <UpdatedRecordsAlert
            appModel={appModel}
            savedSamples={savedSamples}
          />
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
      </SplashScreenRequired>
    </CountrySelectRequired>
  </IonApp>
);

export default App;
