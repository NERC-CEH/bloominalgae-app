import { Component } from 'react';
import { IonLabel, IonIcon, IonButton } from '@ionic/react';
import Header from 'Components/Header';
import { observer } from 'mobx-react';
import { Page, Toggle, alert } from '@flumens';
import { Trans as T } from 'react-i18next';
import axios from 'axios';
import { helpCircleOutline } from 'ionicons/icons';
import GPS from 'helpers/GPS';
import Main from './Main';
import './styles.scss';

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

@observer
class Container extends Component {
  state = {
    isFetchingRecords: null,
    currentLocation: null,
    isLongPeriod: false,
    locating: false,
    records: [],
  };

  toggleLongPeriodReporting = () => {
    const toggle = state => {
      return { isLongPeriod: !state.isLongPeriod };
    };
    this.setState(toggle);
    this.updateRecords(this._bounds);
  };

  fetchRecords = async (northWest, southEast) => {
    const params = {
      survey: 'bloominAlgae',
      report: 'appMap',
      period: this.state.isLongPeriod ? '12M' : '1M',
      tlLat: northWest.lat,
      tlLon: northWest.lng,
      brLat: southEast.lat,
      brLon: southEast.lng,
    };

    if (this.requestCancelToken) {
      this.requestCancelToken.cancel();
    }

    this.requestCancelToken = axios.CancelToken.source();

    let records = [];
    try {
      const process = axios(
        `https://eip.ceh.ac.uk/hydrology-ukscape/bloominAlgae`,
        {
          params,
          cancelToken: this.requestCancelToken.token,
        }
      );

      this.setState({ isFetchingRecords: true });

      const { data } = await process;

      records = data.data;
    } catch (e) {
      if (axios.isCancel(e)) {
        return null;
      }
    } finally {
      this.setState({ isFetchingRecords: false });
    }

    return records;
  };

  updateRecords = async bounds => {
    this._bounds = bounds; // cache for toggling;

    const records = await this.fetchRecords(
      bounds.getNorthWest(),
      bounds.getSouthEast()
    );

    if (!records) {
      return;
    }
    this.setState({ records });
  };

  startGPS = () => {
    const startGPS = (resolve, reject) => {
      const onPosition = (error, location) => {
        this.stopGPS();

        if (error) {
          reject(error);
          return;
        }

        resolve(location);
      };

      const locatingJobId = GPS.start({ callback: onPosition });
      this.setState({ locating: locatingJobId });
    };

    return new Promise(startGPS);
  };

  stopGPS = () => {
    if (!this.state.locating) {
      return;
    }

    GPS.stop(this.state.locating);
    this.setState({ locating: false });
  };

  refreshCurrentLocation = async () => {
    if (this.state.locating) {
      this.stopGPS();
      return;
    }

    const currentLocation = await this.startGPS();
    const currentLocationWithTimestamp = {
      ...currentLocation,
      timestamp: Date.now(),
    }; // map re-centering - cache-busting

    this.setState({
      currentLocation: currentLocationWithTimestamp,
    });
  };

  render() {
    const longPeriodToggle = (
      <>
        <IonButton onClick={showDurationOfRecordsAlert}>
          <IonIcon slot="icon-only" icon={helpCircleOutline} />
        </IonButton>
        <IonLabel>
          <T>See past 12 months</T>
        </IonLabel>
        <Toggle
          className="long-period-toggle"
          color="success"
          checked={this.state.isLongPeriod}
          onToggle={this.toggleLongPeriodReporting}
        />
      </>
    );

    return (
      <Page id="home-map">
        <Header styleId="none" rightSlot={longPeriodToggle} />
        <Main
          updateRecords={this.updateRecords}
          isFetchingRecords={this.state.isFetchingRecords}
          records={this.state.records}
          currentLocation={this.state.currentLocation}
          refreshCurrentLocation={this.refreshCurrentLocation}
          locating={!!this.state.locating}
        />
      </Page>
    );
  }
}

export default Container;
