import React, { Component } from 'react';
import { withIonLifeCycle } from '@ionic/react';
import PropTypes from 'prop-types';
import CONFIG from 'config';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { observer } from 'mobx-react';
import './styles.scss';

const icon = L.divIcon({
  className: 'my-custom-pin',
  html: `<span />`,
});

const DEFAULT_ZOOM = 15;

@observer
class MapComponent extends Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  render() {
    const { sample } = this.props;
    const { location } = sample.attrs;

    const position = [location.latitude, location.longitude];

    return (
      <div id="verify-location-map">
        <Map
          ref={this.map}
          zoom={DEFAULT_ZOOM}
          zoomControl={false}
          center={position}
          dragging={false}
          doubleClickZoom={false}
          closePopupOnClick={false}
          zoomSnap={false}
          zoomDelta={false}
          trackResize={false}
          touchZoom={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank">Mapbox</a> © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
            url="https://api.mapbox.com/styles/v1/cehapps/cipqvo0c0000jcknge1z28ejp/tiles/256/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={CONFIG.map.mapboxApiKey}
          />
          <Marker icon={icon} position={position} />
        </Map>
      </div>
    );
  }
}

export default withIonLifeCycle(MapComponent);
