import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Page, Main } from '@apps';
import { observer } from 'mobx-react';
import {
  IonSlides,
  IonSlide,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import Log from 'helpers/log';
import { arrowForward, closeOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import './images/first.jpg';
import './images/second.jpg';
import './images/third.jpg';
import './styles.scss';

const SplashScreen = ({ appModel }) => {
  const [showSkip, setShowSkip] = useState(true);

  function exit() {
    Log('Info:Welcome:Controller: exit.');
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }
  const slideRef = useRef(null);

  const handleSlideChangeStart = async () => {
    const isEnd = await slideRef.current.isEnd();
    setShowSkip(!isEnd);
  };

  const onIonSlidesDidLoadWrap = e => {
    // TODO: remove once bug is fixed
    // https://github.com/ionic-team/ionic/issues/19641
    // https://github.com/ionic-team/ionic/issues/19638
    e.target.update();
  };

  return (
    <Page id="welcome-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && (
              <IonButton color="none" onClick={exit}>
                <IonIcon icon={closeOutline} color="dark" />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <Main>
        <IonSlides
          pager
          ref={slideRef}
          onIonSlideWillChange={handleSlideChangeStart}
          onIonSlidesDidLoad={onIonSlidesDidLoadWrap}
        >
          <IonSlide className="first">
            <div className="slide-header">
              <div className="message-blur-container">
                <div className="message">
                  <h2>
                    <T>Lorrum ipsum</T>
                  </h2>
                  <p>
                    <T>
                      Vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti quos dolores et quas m.
                    </T>
                  </p>
                </div>
              </div>
            </div>
          </IonSlide>

          <IonSlide className="second">
            <div className="slide-header">
              <div className="message-blur-container">
                <div className="message">
                  <h2>
                    <T>Lorrum ipsum</T>
                  </h2>
                  <p>
                    <T>
                      Vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti quos dolores et quas m.
                    </T>
                  </p>
                </div>
              </div>
            </div>
          </IonSlide>

          <IonSlide className="third">
            <div className="slide-header">
              <div className="message-blur-container">
                <div className="message">
                  <h2 className="warning">
                    <T>Warning</T>
                  </h2>
                  <p>
                    <T>
                      Blue-Green algae (also known as Cyanobacteria) can be
                      harmful to the health of people and animals. Do NOT touch
                      or ingest anything you suspect to be a bloom and do not
                      allow pets or children to come into contact with, or
                      swallow, the water.
                    </T>
                  </p>

                  <IonButton fill="clear" onClick={exit}>
                    <T>Got it!</T>
                    <IonIcon slot="end" icon={arrowForward} />
                  </IonButton>
                </div>
              </div>
            </div>
          </IonSlide>
        </IonSlides>
      </Main>
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
