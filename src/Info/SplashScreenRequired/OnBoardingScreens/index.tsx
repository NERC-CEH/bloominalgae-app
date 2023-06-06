import { FC, useState } from 'react';
import { arrowForward, alertCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Page } from '@flumens';
import {
  IonButton,
  IonIcon,
  IonButtons,
  IonToolbar,
  IonFooter,
} from '@ionic/react';
import '@ionic/react/css/ionic-swiper.css';
import firstBackgroundImage from './images/first.jpg';
import secondBackgroundImage from './images/second.jpg';
import './styles.scss';

const Main: FC = ({ children }) => <div>{children}</div>;

type Props = {
  onExit: any;
};

const OnboardingScreens: FC<Props> = ({ onExit }) => {
  const [moreSlidesExist, setMoreSlidesExist] = useState(true);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>();

  const handleSlideChangeStart = async () => {
    const isEnd = controlledSwiper && controlledSwiper.isEnd;
    setMoreSlidesExist(!isEnd);
  };

  const slideNext = () => controlledSwiper && controlledSwiper.slideNext();

  return (
    <Page id="welcome-page">
      <Main>
        <Swiper
          onSwiper={setControlledSwiper}
          modules={[Pagination]}
          pagination={moreSlidesExist}
          onSlideChange={handleSlideChangeStart}
        >
          <SwiperSlide
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
          </SwiperSlide>

          <SwiperSlide
            className="second"
            style={{ backgroundImage: `url(${secondBackgroundImage})` }}
          >
            <Main>
              <div className="message-container blur">
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

                <p className="small-font">
                  <T>
                    By clicking “I Understand” you agree that you have read and
                    understood this warning
                  </T>
                  .
                </p>

                <IonButton onClick={onExit} color="secondary">
                  <T>I Understand</T>
                </IonButton>
              </div>
            </Main>
          </SwiperSlide>
        </Swiper>
      </Main>

      {moreSlidesExist && (
        <IonFooter className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={slideNext}>
                <IonIcon icon={arrowForward} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </Page>
  );
};

export default OnboardingScreens;
