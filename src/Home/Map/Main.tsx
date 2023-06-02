import { useRef, FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { locateOutline } from 'ionicons/icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Trans as T } from 'react-i18next';
import MapboxMap, { MapRef, Source } from 'react-map-gl';
import { Main, useAlert } from '@flumens';
import { IonSpinner, IonIcon, useIonViewDidEnter } from '@ionic/react';
import CONFIG from 'common/config';
import { countriesByKey as countries } from 'common/countries';
import appModel from 'models/app';
import MarkerClusterLayer from './Components/ClusterLayer';
import MarkerLayer from './Components/MarkerLayer';

const getGeoJSONfromRecords = (records?: Record[]): any => {
  const getFeature = (record: Record) => ({
    type: 'Feature',
    properties: {
      id: record.id,
      type: 'record',
      verification: record.verification.status_code,
    },
    geometry: {
      type: 'Point',
      coordinates: [record.lng, record.lat, 0.0],
    },
  });

  return {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: records?.map(getFeature) || [],
  };
};

type Record = any;

const useRecordPopup = (records: Record[]) => {
  const alert = useAlert();

  const showRecordPopup = (feature: any) => {
    const byId = (record: Record) => record.id === feature.properties.id;
    const record = records?.find(byId);
    if (!record) return;

    let image;

    if (record.images.length) {
      const imagePath = record.images[0].path;
      image = <img src={`${CONFIG.backend.mediaUrl}${imagePath}`} />;
    } else {
      image = (
        <div className="missing-image">
          <T>This record has no images.</T>
        </div>
      );
    }

    const statuses = {
      R: 'rejected',
      V: 'verified',
    };

    let statusText = (statuses as any)[record.verification.status_code];
    if (
      !statusText &&
      record.verification.status_code === 'C' &&
      record.verification.substatus_code === '3'
    ) {
      statusText = 'plausible';
    }

    alert({
      header: record.sample_date.split(' ')[0],
      cssClass: 'location-map',
      message: (
        <>
          <div className="alert-record-status">
            <T>{statusText}</T>
          </div>
          {image}
        </>
      ),
      buttons: [
        {
          text: 'OK',
          cssClass: 'primary',
        },
      ],
    });
  };

  return showRecordPopup;
};

const DEFAULT_LOCATED_ZOOM = 12;

type Props = {
  records: Record[];
  onMoveEnd: any;
  refreshCurrentLocation: any;
  locating?: boolean;
  isFetchingRecords?: boolean;
  currentLocation?: any;
};

const MapComponent: FC<Props> = ({
  records,
  onMoveEnd: onMoveEndProp,
  refreshCurrentLocation,
  locating,
  isFetchingRecords,
  currentLocation,
}) => {
  const mapRef = useRef<MapRef>();
  const showRecordPopup = useRecordPopup(records);

  const resizeMap = () => mapRef.current?.resize();
  useIonViewDidEnter(resizeMap);

  const { country } = appModel.attrs;
  const initialViewState =
    (countries as any)[country]?.location || countries.uk.location;

  const centerToCurrentLocation = () => {
    mapRef.current?.flyTo({
      center: [currentLocation.longitude, currentLocation.latitude],
      zoom: DEFAULT_LOCATED_ZOOM,
    });
  };
  useEffect(centerToCurrentLocation, [currentLocation]);

  const onMoveEnd = () => {
    const bounds = mapRef.current?.getBounds();
    // bounds.pad(0.5); // +50%

    onMoveEndProp(bounds);
  };

  const centerMapToCurrentLocation = () => refreshCurrentLocation();

  const data = useMemo(
    // eslint-disable-next-line @getify/proper-arrows/name
    () => getGeoJSONfromRecords(records),
    [records]
  );

  return (
    <Main>
      <button
        className={`geolocate-btn ${locating ? 'spin' : ''}`}
        onClick={centerMapToCurrentLocation}
      >
        <IonIcon icon={locateOutline} mode="md" size="large" />
      </button>

      <MapboxMap
        ref={mapRef as any}
        initialViewState={initialViewState}
        maxZoom={17}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        minZoom={3}
        onMoveEnd={onMoveEnd}
        mapboxAccessToken={CONFIG.map.mapboxApiKey}
      >
        <Source
          id="records"
          type="geojson"
          data={data}
          cluster
          clusterMaxZoom={10}
          clusterRadius={50}
        >
          <MarkerClusterLayer source="records" />
          <MarkerLayer
            source="records"
            onClick={showRecordPopup}
            paint={{
              'circle-color': [
                'match',
                ['get', 'verification'],
                'C',
                '#e0b500',
                'V',
                '#098b5c',
                'R',
                '#f04141',
                /* other */ '#fff',
              ],
            }}
          />
        </Source>

        {isFetchingRecords && <IonSpinner />}
      </MapboxMap>
    </Main>
  );
};

export default observer(MapComponent);
