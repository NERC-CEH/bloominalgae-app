import { FC, useState } from 'react';
import { locateOutline } from 'ionicons/icons';
import { IonIcon, IonSpinner } from '@ionic/react';
import GPS from 'helpers/GPS';
import './styles.scss';

type Props = { onChange: any };

const GPSButton: FC<Props> = ({ onChange }) => {
  const [locating, setLocating] = useState<any>(false);

  const stopGPS = () => locating && GPS.stop(locating);

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

      GPS.start({ callback: onPosition });
    };

    return new Promise<any>(startGPSWrap);
  };

  const refreshCurrentLocation = async () => {
    if (locating) {
      stopGPS();
      setLocating(false);
      return;
    }

    setLocating(true);

    try {
      const newCurrentLocation = await startGPS();
      onChange(newCurrentLocation);
    } catch (error: any) {
      // ignore errors
      console.warn('GPS location error:', error.message);
    }

    setLocating(false);
  };

  return (
    <button className="map-geolocate-btn" onClick={refreshCurrentLocation}>
      {!locating ? (
        <IonIcon icon={locateOutline} mode="md" size="large" color="primary" />
      ) : (
        <IonSpinner color="primary" />
      )}
    </button>
  );
};

export default GPSButton;
