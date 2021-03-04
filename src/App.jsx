import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import LanguageSelectRequired from 'common/Components/LanguageSelectRequire';
import { IonReactRouter } from '@ionic/react-router';
import Menu from 'Components/Menu';
import userModel from 'userModel';
import appModel from 'appModel';
import savedSamples from 'savedSamples';
import Info from './Info/router';
import SplashScreenRequired from './Info/SplashScreenRequired';
import Survey from './Survey/router';
import Settings from './Settings/router';
import Home from './Home';
import User from './User/router';

console.log('🚩 App starting.'); // eslint-disable-line

const HomeRedirect = () => {
  return <Redirect to="home/info" />;
};

const App = () => (
  <IonApp>
    <LanguageSelectRequired appModel={appModel}>
      <SplashScreenRequired appModel={appModel}>
        <IonReactRouter>
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
    </LanguageSelectRequired>
  </IonApp>
);

export default App;
