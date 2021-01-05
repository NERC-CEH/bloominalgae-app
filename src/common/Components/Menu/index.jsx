import React from 'react';
import config from 'config';
import { withRouter, useLocation } from 'react-router';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonFooter,
} from '@ionic/react';
import {
  heartOutline,
  settingsOutline,
  informationCircleOutline,
  helpBuoyOutline,
  people,
  lockClosedOutline,
} from 'ionicons/icons';
import { observer } from 'mobx-react';
import 'common/images/flumens.svg';
import './styles.scss';

const routes = {
  appPages: [
    {
      title: 'About',
      path: '/info/about',
      icon: informationCircleOutline,
    },
    {
      title: 'Algal bloom info',
      path: '/info/info',
      icon: informationCircleOutline,
    },
    {
      title: 'Risks',
      path: '/info/risks',
      icon: helpBuoyOutline,
    },
    {
      title: 'Report a bloom',
      path: '/info/report',
      icon: people,
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
        <IonLabel color="light">{p.title}</IonLabel>
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
        <IonList lines="none">
          <IonListHeader>Navigate</IonListHeader>
          {getRoutes(routes.appPages)}
        </IonList>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div>
          <a href="https://flumens.io">
            <img src="/images/flumens.svg" alt="" />
          </a>

          <p className="app-version">{`App version: v${config.version} (${config.build})`}</p>
        </div>
      </IonFooter>
    </IonMenu>
  );
};

export default withRouter(observer(Menu));
