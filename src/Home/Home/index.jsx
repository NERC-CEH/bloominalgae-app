import React from 'react';
import { Page, Main } from '@apps';
import Header from 'Components/Header';
import { IonItem, IonItemGroup, IonLabel, IonRouterLink } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import appLogo from './appLogo.png';
import './styles.scss';
import './homePageBackground.jpg';

function Home() {
  return (
    <Page id="home-info">
      <Header />

      <Main>
        <div className="app-home-background">
          <img className="app-logo" src={appLogo} alt="" />
          <IonItemGroup>
            <IonRouterLink routerLink="/survey/start">
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
