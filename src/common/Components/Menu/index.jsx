import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import config from 'config';
import { useLocation } from 'react-router';
import { alert } from '@apps';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonFooter,
  IonCheckbox,
} from '@ionic/react';
import {
  heartOutline,
  settingsOutline,
  informationCircleOutline,
  lockClosedOutline,
  personOutline,
  logOut,
} from 'ionicons/icons';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import flumensLogo from 'common/images/flumens.svg';
import './styles.scss';

function showLogoutConfirmationDialog(callback) {
  let deleteData = true;

  const onCheckboxChange = e => {
    deleteData = e.detail.checked;
  };

  alert({
    header: 'Logout',
    cssClass: 'logout-alert',
    message: (
      <>
        <T>Are you sure you want to logout?</T>
        <br />
        <br />
        <IonItem
          lines="none"
          className="log-out-checkbox"
          style={{ background: 'transperant' }}
        >
          <IonLabel>
            <T>Discard local data</T>
          </IonLabel>
          <IonCheckbox checked onIonChange={onCheckboxChange} />
        </IonItem>
      </>
    ),
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },

      {
        text: 'Logout',
        cssClass: 'primary',
        handler: () => callback(deleteData),
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

function loggingOut(userModel, savedSamples) {
  const onReset = async reset => {
    if (reset) {
      await savedSamples.resetDefaults();
    }

    userModel.logOut();
  };

  showLogoutConfirmationDialog(onReset);
}

const getLogoutButton = (userModel, savedSamples) => {
  const { firstName, secondName } = userModel.attrs; // Log('Home:Info: logging out.');

  const loggingOutWrap = () => loggingOut(userModel, savedSamples);

  return (
    <IonItem detail={false} routerDirection="none" onClick={loggingOutWrap}>
      <IonIcon slot="start" icon={logOut} />
      <IonLabel>
        <T>Logout</T>: {firstName} {secondName}
      </IonLabel>
    </IonItem>
  );
};

const Menu = ({ userModel, savedSamples }) => {
  const location = useLocation();

  const getRoutes = routesList => renderMenuRoutes(routesList, location);

  const isLoggedIn = !!userModel.attrs.id;

  const isUserLoggedIn = isLoggedIn
    ? getLogoutButton(userModel, savedSamples)
    : getRoutes(routes.loggedOutPages);

  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent forceOverscroll={false}>
        {isUserLoggedIn}

        <IonList lines="none">{getRoutes(routes.appPages)}</IonList>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div>
          <a href="https://flumens.io">
            <img src={flumensLogo} alt="" />
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

Menu.propTypes = exact({
  userModel: PropTypes.object.isRequired,
  savedSamples: PropTypes.array.isRequired,
});

export default observer(Menu);
