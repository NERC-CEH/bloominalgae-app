import React, { Component } from 'react';
import { withIonLifeCycle } from '@ionic/react';
import { Main } from '@apps';
import CONFIG from 'config';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import { observer } from 'mobx-react';
import 'leaflet/dist/leaflet.css';

const DEFAULT_POSITION = [51.505, -0.09];
const DEFAULT_ZOOM = 18;

@observer
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  ionViewDidEnter = () => {
    const map = this.map.current.leafletElement;

    map.invalidateSize();
  };

  componentDidMount() {
    const map = this.map.current.leafletElement;

    map.panTo(new L.LatLng(...DEFAULT_POSITION));
  }

  render() {
    return (
      <Main>
        <Map ref={this.map} zoom={DEFAULT_ZOOM} zoomControl={false}>
          <TileLayer
            attribution='<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank">Mapbox</a> © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
            url="https://api.mapbox.com/styles/v1/cehapps/cipqvo0c0000jcknge1z28ejp/tiles/256/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={CONFIG.map.mapboxApiKey}
          />
        </Map>
      </Main>
    );
  }
}

export default withIonLifeCycle(MapComponent);
