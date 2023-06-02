import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { helpCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Page, useAlert } from '@flumens';
import { IonLabel, IonIcon, IonButton, IonToggle } from '@ionic/react';
import GPS from 'helpers/GPS';
import Header from 'Components/Header';
import Main from './Main';
import fetchRecords from './recordsService';
import './styles.scss';

const useDurationOfRecordsAlert = () => {
  const alert = useAlert();

  const showDurationOfRecordsAlert = () =>
    alert({
      message: <T>The default setting is the past 4 weeks of records.</T>,
      buttons: [
        {
          text: 'OK, got it',
          role: 'cancel',
          cssClass: 'primary',
        },
      ],
    });

  return showDurationOfRecordsAlert;
};

const HomeMap: FC = () => {
  const [isFetchingRecords, setIsFetchingRecords] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLongPeriod, setIsLongPeriod] = useState(false);
  const [locating, setLocating] = useState<any>(false);
  const [records, setRecords] = useState([]);

  const [currentMapBounds, setCurrentMapBounds] = useState<any>(null);

  const showDurationOfRecordsAlert = useDurationOfRecordsAlert();

  const updateRecords = async (mapBounds: any, period: boolean) => {
    setIsFetchingRecords(true);
    const newRecords = await fetchRecords(
      mapBounds.getNorthWest(),
      mapBounds.getSouthEast(),
      period
    );
    setIsFetchingRecords(false);

    if (!newRecords) return;

    setRecords(newRecords);
  };

  const updateMapBounds = async (newBounds: any) => {
    setCurrentMapBounds(newBounds);
    updateRecords(newBounds, isLongPeriod);
  };

  const toggleLongPeriodReporting = (e: any) => {
    setIsLongPeriod(e.detail.checked);
    updateRecords(currentMapBounds, e.detail.checked);
  };

  const stopGPS = () => {
    if (!locating) return;

    GPS.stop(locating);
    setLocating(false);
  };

  const startGPS = () => {
    const startGPSWrap = (resolve: any, reject: any) => {
      const onPosition = (error: any, location: any) => {
        stopGPS();

        if (error) {
          reject(error);
          return;
        }

        resolve(location);
      };

      GPS.start({ callback: onPosition }).then(setLocating);
    };

    return new Promise<any>(startGPSWrap);
  };

  const refreshCurrentLocation = async () => {
    if (locating) {
      stopGPS();
      return;
    }

    const newCurrentLocation = await startGPS();
    // map re-centering - cache-busting
    const currentLocationWithTimestamp = {
      ...newCurrentLocation,
      timestamp: Date.now(),
    };

    setCurrentLocation(currentLocationWithTimestamp);
  };

  const longPeriodToggle = (
    <>
      <IonButton onClick={showDurationOfRecordsAlert}>
        <IonIcon slot="icon-only" icon={helpCircleOutline} />
      </IonButton>
      <IonLabel>
        <T>See past 12 months</T>
      </IonLabel>
      <IonToggle
        className="long-period-toggle"
        color="success"
        onIonChange={toggleLongPeriodReporting}
        checked={isLongPeriod}
      />
    </>
  );

  return (
    <Page id="home-map">
      <Header styleId="none" rightSlot={longPeriodToggle} />
      <Main
        onMoveEnd={updateMapBounds}
        isFetchingRecords={isFetchingRecords}
        records={records}
        currentLocation={currentLocation}
        refreshCurrentLocation={refreshCurrentLocation}
        locating={!!locating}
      />
    </Page>
  );
};

export default observer(HomeMap);
