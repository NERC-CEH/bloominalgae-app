import React, { useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import savedSamples from 'savedSamples';
import { observer } from 'mobx-react';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import {
  homeOutline,
  mapOutline,
  bookOutline,
  layersOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import Home from './Home';
import Guide from './Guide';
import Surveys from './UserSurveys';
import MapComponent from './Map';
import './styles.scss';

const UserSurveys = () => <Surveys savedSamples={savedSamples} />;

const HomeComponent = () => {
  const tabsRef = useRef();

  return (
    <>
      <IonTabs ref={tabsRef}>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/info" />
          <Route path="/home/info" component={Home} exact />
          <Route path="/home/map" component={MapComponent} exact />
          <Route path="/home/guide" component={Guide} exact />
          <Route path="/home/surveys" component={UserSurveys} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="home-tab-bar">
          <IonTabButton tab="/home/info" href="/home/info">
            <IonIcon icon={homeOutline} />
            <IonLabel>
              <T>Home</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/map " href="/home/map">
            <IonIcon icon={mapOutline} />
            <IonLabel>
              <T>Map</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="/home/guide" href="/home/guide">
            <IonIcon icon={bookOutline} />
            <IonLabel>
              <T>Guide</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="/home/surveys" href="/home/surveys">
            <IonIcon icon={layersOutline} />
            <IonLabel>
              <T>My Surveys</T>
            </IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default observer(HomeComponent);
