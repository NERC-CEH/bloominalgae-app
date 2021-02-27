import React, { Component } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { withIonLifeCycle, IonSpinner, IonIcon } from '@ionic/react';
import { Main, alert } from '@apps';
import appModel from 'common/models/appModel';
import CONFIG from 'config';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import { Trans as T } from 'react-i18next';
import LeafletControl from 'react-leaflet-control';
import 'leaflet.markercluster';
import { observer } from 'mobx-react';
import { locateOutline } from 'ionicons/icons';
import clsx from 'clsx';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

const getIcon = ({ verification }) =>
  L.divIcon({
    className: clsx(
      'my-custom-pin',
      verification.status_code === 'R' && 'rejected'
    ),
    html: `<span />`,
  });

function showRecord(record) {
  let image;

  if (record.images.length) {
    const imagePath = record.images[0].path;
    image = <img src={`${CONFIG.backend.mediaUrl}${imagePath}`} />;
  } else {
    image = (
      <div className="missing-image">
        <T>No image is available.</T>
      </div>
    );
  }

  alert({
    header: record.sample_date.split(' ')[0],
    cssClass: 'location-map',
    message: (
      <>
        <div className="alert-record-status">
          <T>{record.verification.status_text}</T>
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
}

const UK = [53.505, -3.09];
const BE = [50.637, 4.59];

const DEFAULT_ZOOM = 5;
const DEFAULT_LOCATED_ZOOM = 12;

@observer
class MapComponent extends Component {
  static propTypes = exact({
    records: PropTypes.array.isRequired,
    updateRecords: PropTypes.func.isRequired,
    refreshCurrentLocation: PropTypes.func.isRequired,
    locating: PropTypes.bool,
    isFetchingRecords: PropTypes.bool,
    currentLocation: PropTypes.object,
  });

  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  ionViewDidEnter = () => {
    const map = this.map.current.leafletElement;

    map.invalidateSize();

    this.markers = L.markerClusterGroup();
    map.addLayer(this.markers);
  };

  componentDidMount() {
    const isUK = appModel.attrs.language === 'en';
    const DEFAULT_POSITION = isUK ? UK : BE;

    const map = this.map.current.leafletElement;
    map.panTo(new L.LatLng(...DEFAULT_POSITION));

    this.centerMapToCurrentLocation();
  }

  redrawMarkers = async () => {
    const { records } = this.props;

    if (!records || !this.markers) {
      return;
    }

    this.markers.clearLayers();
    records.forEach(this.addMarker);
  };

  componentDidUpdate(prevProps) {
    this.redrawMarkers();

    const isNewLocation =
      JSON.stringify(prevProps.currentLocation) !==
      JSON.stringify(this.props.currentLocation);

    if (isNewLocation) {
      this.centerMapViewToCurrentLocation();
    }
  }

  centerMapViewToCurrentLocation = () => {
    const { currentLocation } = this.props;
    if (!currentLocation || !currentLocation.latitude) {
      return;
    }

    const map = this.map.current.leafletElement;
    map.setView(
      new L.LatLng(currentLocation.latitude, currentLocation.longitude),
      DEFAULT_LOCATED_ZOOM
    );
  };

  addMarker = record => {
    const marker = L.marker([record.lat, record.lng], {
      icon: getIcon(record),
    });
    const onMouseUp = () => {
      showRecord(record);
    };
    marker.on('mouseup', onMouseUp);

    this.markers.addLayer(marker);
  };

  onMoveEnd = () => this.getBoundsAndUpdateRecords();

  getBoundsAndUpdateRecords = () => {
    const bounds = this.map.current.leafletElement.getBounds();
    bounds.pad(0.5); // +50%

    this.props.updateRecords(bounds);
  };

  centerMapToCurrentLocation = () => {
    this.props.refreshCurrentLocation();
  };

  render() {
    const { isFetchingRecords, locating } = this.props;

    return (
      <Main>
        <Map ref={this.map} zoom={DEFAULT_ZOOM} onmoveend={this.onMoveEnd}>
          <TileLayer
            attribution='<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank">Mapbox</a> © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
            url="https://api.mapbox.com/styles/v1/cehapps/cipqvo0c0000jcknge1z28ejp/tiles/256/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={CONFIG.map.mapboxApiKey}
          />

          <LeafletControl position="topleft">
            <button
              className={`geolocate-btn ${locating ? 'spin' : ''}`}
              onClick={this.centerMapToCurrentLocation}
            >
              <IonIcon icon={locateOutline} mode="md" size="large" />
            </button>
          </LeafletControl>

          {isFetchingRecords && <IonSpinner mode="ios" />}
        </Map>
      </Main>
    );
  }
}

export default withIonLifeCycle(MapComponent);
