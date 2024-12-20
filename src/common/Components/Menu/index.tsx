/* eslint-disable jsx-a11y/control-has-associated-label */
import { observer } from 'mobx-react';
import {
  heartOutline,
  settingsOutline,
  informationCircleOutline,
  lockClosedOutline,
  personOutline,
  logOut,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { useLocation } from 'react-router';
import { useAlert } from '@flumens';
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
import config from 'common/config';
import flumensLogo from 'common/images/flumens.svg';
import './styles.scss';

function showLogoutConfirmationDialog(callback: any, alert: any) {
  alert({
    header: 'Logout',
    cssClass: 'logout-alert',
    message: <T>Are you sure you want to logout?</T>,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },

      {
        text: 'Logout',
        cssClass: 'primary',
        handler: () => callback(),
      },
    ],
  });
}

const routes = {
  appPages: [
    {
      title: 'About Bloomin’ Algae',
      path: '/info/about',
      icon: informationCircleOutline,
    },
    {
      title: 'Using the app',
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
      title: 'Health risks',
      path: '/info/risks',
      icon: informationCircleOutline,
    },
    {
      title: 'Further action',
      path: '/info/report',
      icon: informationCircleOutline,
    },
    {
      title: 'BRC approved',
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
  loggedOutPages: [
    {
      title: 'Register/Login',
      path: '/user/register',
      icon: personOutline,
    },
  ],
};

function renderMenuRoutes(list: any, location: any) {
  const getMenuItem = (p: any) => (
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

function loggingOut(userModel: any, savedSamples: any, alert: any) {
  const onReset = async (reset: any) => {
    if (reset) {
      await savedSamples.resetDefaults();
    }

    userModel.logOut();
  };

  showLogoutConfirmationDialog(onReset, alert);
}

const getLogoutButton = (userModel: any, savedSamples: any, alert: any) => {
  const { firstName, secondName } = userModel.attrs; // console.log('Home:Info: logging out.');

  const loggingOutWrap = () => loggingOut(userModel, savedSamples, alert);

  return (
    <IonItem detail={false} routerDirection="none" onClick={loggingOutWrap}>
      <IonIcon slot="start" icon={logOut} />
      <IonLabel>
        <T>Logout</T>: {firstName} {secondName}
      </IonLabel>
    </IonItem>
  );
};

const Menu = ({ userModel, savedSamples }: any) => {
  const location = useLocation();
  const alert = useAlert();

  const getRoutes = (routesList: any) => renderMenuRoutes(routesList, location);

  const isLoggedIn = !!userModel.attrs.email;

  const isUserLoggedIn = isLoggedIn
    ? getLogoutButton(userModel, savedSamples, alert)
    : getRoutes(routes.loggedOutPages);

  return (
    <IonMenu type="overlay" contentId="main" swipeGesture={false}>
      <IonContent forceOverscroll={false}>
        {isUserLoggedIn}

        <IonList lines="none">{getRoutes(routes.appPages)}</IonList>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div className="flex flex-col justify-center py-2">
          <a href="https://flumens.io">
            <img src={flumensLogo} alt="" className="inline-block" />
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

export default observer(Menu);
