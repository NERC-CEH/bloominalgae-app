import React from 'react';
import config from 'config';
import { withRouter, useLocation } from 'react-router';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonFooter,
} from '@ionic/react';
import {
  heartOutline,
  settingsOutline,
  informationCircleOutline,
  lockClosedOutline,
} from 'ionicons/icons';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import 'common/images/flumens.svg';
import './styles.scss';

const routes = {
  appPages: [
    {
      title: 'About Bloomin’ Algae',
      path: '/info/about',
      icon: informationCircleOutline,
    },
    {
      title: 'More information on using the app',
      path: '/info/more-information',
      icon: informationCircleOutline,
    },
    {
      title: 'What do we use your records for?',
      path: '/info/record-usage',
      icon: informationCircleOutline,
    },
    {
      title: 'What are blue-green algae?',
      path: '/info/info',
      icon: informationCircleOutline,
    },
    {
      title: 'When do they occur?',
      path: '/info/occur',
      icon: informationCircleOutline,
    },
    {
      title: 'Health Risks',
      path: '/info/risks',
      icon: informationCircleOutline,
    },
    {
      title: 'Further action',
      path: '/info/report',
      icon: informationCircleOutline,
    },
    {
      title: 'BRC Approved',
      path: '/info/brc-approved',
      icon: lockClosedOutline,
    },
    {
      title: 'Credits',
      path: '/info/credits',
      icon: heartOutline,
    },
    {
      title: 'Settings',
      path: '/settings/menu',
      icon: settingsOutline,
    },
  ],
};

function renderMenuRoutes(list, location) {
  const getMenuItem = p => (
    <IonMenuToggle key={p.title} auto-hide="false">
      <IonItem
        detail={false}
        routerLink={p.path}
        href={p.href}
        routerDirection="none"
        className={
          location.pathname.startsWith(p.path) ? 'selected' : undefined
        }
      >
        <IonIcon slot="start" icon={p.icon} />
        <IonLabel color="light">
          <T>{p.title}</T>
        </IonLabel>
      </IonItem>
    </IonMenuToggle>
  );

  return list.map(getMenuItem);
}

const Menu = () => {
  const location = useLocation();

  const getRoutes = routesList => renderMenuRoutes(routesList, location);

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">{getRoutes(routes.appPages)}</IonList>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div>
          <a href="https://flumens.io">
            <img src="/images/flumens.svg" alt="" />
          </a>

          <p className="app-version">
            <T>App version</T>
            {`: v${config.version} (${config.build})`}
          </p>
        </div>
      </IonFooter>
    </IonMenu>
  );
};

export default withRouter(observer(Menu));
