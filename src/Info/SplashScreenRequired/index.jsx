import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Page, Main } from '@apps';
import { observer } from 'mobx-react';
import {
  IonSlides,
  IonSlide,
  IonButton,
  IonIcon,
  IonButtons,
  IonToolbar,
  IonFooter,
} from '@ionic/react';
import Log from 'helpers/log';
import { arrowForward, alertCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import firstBackgroundImage from './images/first.jpg';
import secondBackgroundImage from './images/second.jpg';
import './styles.scss';

const SplashScreen = ({ appModel }) => {
  const [isEnd, setIsEnd] = useState(false);

  function exit() {
    Log('Info:Welcome:Controller: exit.');
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }
  const slideRef = useRef(null);

  const onIonSlidesDidLoadWrap = e => {
    // TODO: remove once bug is fixed
    // https://github.com/ionic-team/ionic/issues/19641
    // https://github.com/ionic-team/ionic/issues/19638
    e.target.update();
  };

  const handleSlideChangeStart = async () => {
    const isThisLastSlide = await slideRef.current.isEnd();
    setIsEnd(isThisLastSlide);
  };

  const slideNextOrClose = async () => {
    slideRef.current.swiper.slideNext();
  };

  return (
    <Page id="welcome-page">
      <Main>
        <IonSlides
          pager
          ref={slideRef}
          onIonSlideWillChange={handleSlideChangeStart}
          onIonSlidesDidLoad={onIonSlidesDidLoadWrap}
        >
          <IonSlide
            className="first"
            style={{ backgroundImage: `url(${firstBackgroundImage})` }}
          >
            <div className="message-container blur">
              <div className="message-header">
                <h2>
                  <T>Welcome to Bloomin’ Algae!</T>
                </h2>
              </div>

              <p>
                <T>
                  Bloomin’ Algae is a Citizen Science app for reporting the
                  presence of harmful blooms of blue-green algae. The records
                  you send in help speed up warnings to minimise risks to public
                  and animal health. Thanks for taking part!
                </T>
              </p>
            </div>
          </IonSlide>

          <IonSlide
            className="second"
            style={{ backgroundImage: `url(${secondBackgroundImage})` }}
          >
            <Main>
              <div className="message-container">
                <div className="message-header">
                  <IonIcon icon={alertCircleOutline} />
                  <h2>
                    <T>Warning</T>
                  </h2>
                </div>

                <p>
                  <T>
                    Blue-Green algae (also known as cyanobacteria) can be
                    harmful to the health of people and animals. Do NOT touch or
                    ingest anything you suspect to be a bloom and do not allow
                    pets or children to come into contact with, or swallow, the
                    water.
                  </T>
                </p>

                <p>
                  <T>
                    By clicking “I Understand” you agree that you have read and
                    understood this warning
                  </T>
                </p>

                <IonButton onClick={exit} color="secondary">
                  <T>I Understand</T>
                </IonButton>
              </div>
            </Main>
          </IonSlide>
        </IonSlides>
      </Main>
      {!isEnd && (
        <IonFooter className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={slideNextOrClose}>
                <IonIcon icon={arrowForward} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </Page>
  );
};

SplashScreen.propTypes = {
  appModel: PropTypes.object.isRequired,
};

const onBoardingScreens = ({ appModel, children }) => {
  const { showedWelcome } = appModel.attrs;

  if (!showedWelcome) {
    return <SplashScreen appModel={appModel} />;
  }

  return children;
};

onBoardingScreens.propTypes = {
  appModel: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default observer(onBoardingScreens);
