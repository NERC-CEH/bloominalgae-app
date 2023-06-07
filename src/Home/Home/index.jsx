import { useEffect } from 'react';
import { Trans as T } from 'react-i18next';
import { Page, Main, useAlert } from '@flumens';
import { IonItem, IonItemGroup, IonLabel, IonRouterLink } from '@ionic/react';
import appModel from 'models/app';
import Header from 'Components/Header';
import appLogo from './appLogo.png';
import backgroundImage from './homePageBackground.jpg';
import './styles.scss';

function useLanguageTip() {
  const alert = useAlert();

  const showLanguageTip = () => {
    if (!appModel.attrs.showLanguageTip) return;

    const hideTip = () => {
      appModel.attrs.showLanguageTip = false;
      appModel.save();
    };

    alert({
      message: (
        <T>
          The language will default to the language of your phone settings. If
          you want to change the language go to "Settings" in the Bloomin' Algae
          app menu and select "Language"
        </T>
      ),
      buttons: [
        {
          text: 'OK, got it',
          role: 'cancel',
          cssClass: 'primary',
          handler: hideTip,
        },
      ],
    });
  };

  return showLanguageTip;
}

function Home() {
  const showLanguageTip = useLanguageTip();
  useEffect(showLanguageTip, []);

  return (
    <Page id="home-info">
      <Header />

      <Main forceOverscroll="false">
        <div
          className="app-home-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <img className="app-logo" src={appLogo} alt="" />
          <IonItemGroup>
            <IonRouterLink routerLink="/survey/start" routerDirection="none">
              <IonItem className="pretty-button" detail>
                <IonLabel>
                  <T>Record</T>
                </IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonItemGroup>
        </div>
      </Main>
    </Page>
  );
}

export default Home;
