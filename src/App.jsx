import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, NavContext } from '@ionic/react';
// import LanguageSelectRequired from 'common/Components/LanguageSelectRequire';
import { IonReactRouter } from '@ionic/react-router';
import Menu from 'Components/Menu';
import appModel from 'appModel';
import Info from './Info/router';
import SplashScreenRequired from './Info/SplashScreenRequired';
import Survey from './Survey/router';
import Settings from './Settings/router';
import Home from './Home';
// import 'common/translations/translator';

console.log('🚩 App starting.'); // eslint-disable-line

const HomeRedirect = () => {
  const { navigate } = useContext(NavContext);
  navigate('/home/info', 'root'); // simple redirect component doesn't work when back from login
  return null;
};

const App = () => (
  <IonApp>
    {/* <LanguageSelectRequired appModel={appModel}> */}
    <SplashScreenRequired appModel={appModel}>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id="main">
          <Route exact path="/" component={HomeRedirect} />
          <Route path="/home" component={Home} />
          {Info}
          {Survey}
          {Settings}
        </IonRouterOutlet>
      </IonReactRouter>
    </SplashScreenRequired>
    {/* </LanguageSelectRequired> */}
  </IonApp>
);

export default App;
