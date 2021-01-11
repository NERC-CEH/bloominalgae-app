import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext, withIonLifeCycle } from '@ionic/react';
import { Page, Header, alert } from '@apps';
import { Trans as T } from 'react-i18next';
import Main from './Main';
// import MapComponent from '../../Home/Map/Main';
// import 'leaflet/dist/leaflet.css';
import './styles.scss';

@observer
class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
  };

  askToVerifyLocation = () => {
    alert({
      header: 'Location',
      message: (
        <>
          <div>
            <T>Please confirm this is your correct location</T>
          </div>
          <br />
          {/* <MapComponent /> */}
        </>
      ),
      buttons: [
        {
          text: 'Incorrect',
          role: 'blue',
          cssClass: 'primary',
        },
        {
          text: 'Correct',
          cssClass: 'primary',
        },
      ],
    });
  };

  onUpload = () => {};

  resetGPS = () => {
    const { sample } = this.props;

    sample.toggleGPStracking();
  };

  render() {
    const { sample } = this.props;
    const isDisabled = sample.isDisabled();

    const uploadButton = !isDisabled ? (
      <IonButton onClick={this.onUpload}>Upload</IonButton>
    ) : null;

    return (
      <Page id="survey-edit">
        <Header title="Record" rightSlot={uploadButton} />
        <Main
          resetGPS={this.resetGPS}
          isDisabled={isDisabled}
          {...this.props}
        />
      </Page>
    );
  }
}

export default withIonLifeCycle(Controller);
