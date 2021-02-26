import React from 'react';
import { IonLabel } from '@ionic/react';
import Header from 'Components/Header';
import { observer } from 'mobx-react';
import { Page, Toggle } from '@apps';
import { Trans as T } from 'react-i18next';
import axios from 'axios';
import GPS from 'helpers/GPS';
import Main from './Main';
import './styles.scss';

@observer
class Container extends React.Component {
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
    GPS.stop(this.state.locating);
    this.setState({ locating: false });
  };

  refreshCurrentLocation = async () => {
    if (this.state.locating) {
      this.stopGPS();
      return;
    }

    const currentLocation = await this.startGPS();
    this.setState({ currentLocation });
  };

  render() {
    const longPeriodToggle = (
      <>
        <IonLabel>
          <T>Use longer period</T>
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
