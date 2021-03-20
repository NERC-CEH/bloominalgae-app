import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import savedSamples from 'savedSamples';
import { observer } from 'mobx-react';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import {
  homeOutline,
  mapOutline,
  informationCircleOutline,
  layersOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import PendingSurveysBadge from 'common/Components/PendingSurveysBadge';
import Home from './Home';
import Guide from './Guide';
import Surveys from './UserSurveys';
import MapComponent from './Map';
import './styles.scss';

const UserSurveys = () => <Surveys savedSamples={savedSamples} />;

const HomeComponent = () => {
  return (
    <>
      <IonTabs>
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
          </IonTabButton>

          <IonTabButton tab="home/map " href="/home/map">
            <IonIcon icon={mapOutline} />
          </IonTabButton>

          <IonTabButton tab="/home/surveys" href="/home/surveys">
            <IonIcon icon={layersOutline} />
            <PendingSurveysBadge savedSamples={savedSamples} />
          </IonTabButton>

          <IonTabButton tab="/home/guide" href="/home/guide">
            <IonIcon icon={informationCircleOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default observer(HomeComponent);
