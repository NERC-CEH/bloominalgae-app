import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext, withIonLifeCycle } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { Page, Header, showInvalidsMessage, alert, device, toast } from '@apps';
import MapComponent from '../Components/Map';
import Main from './Main';
import './styles.scss';

const { warn } = toast;

@observer
class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  askToVerifyLocation = () => {
    const { sample, match } = this.props;

    const askToVerifyLocationWrap = resolve => {
      alert({
        header: 'Location',
        cssClass: 'location-map',
        message: (
          <>
            <p>
              <T>Please confirm this is your correct location.</T>
            </p>
            <br />
            <MapComponent sample={sample} />
          </>
        ),
        buttons: [
          {
            text: 'Incorrect',
            role: 'blue',
            cssClass: 'primary',
            handler: () => {
              this.context.navigate(`${match.url}/location`);
            },
          },
          {
            text: 'Correct',
            cssClass: 'primary',
            handler: () => resolve(true),
          },
        ],
      });
    };

    return new Promise(askToVerifyLocationWrap);
  };

  onUpload = async () => {
    const { sample } = this.props;

    const invalids = sample.validateRemote();

    if (invalids) {
      showInvalidsMessage(invalids);
      return;
    }

    if (!device.isOnline()) {
      warn('Looks like you are offline!');
      return;
    }

    await this.askToVerifyLocation();

    this.context.navigate('/home/info', 'root');
  };

  resetGPS = () => {
    const { sample } = this.props;

    sample.toggleGPStracking();
  };

  render() {
    const { sample } = this.props;
    const isDisabled = sample.isDisabled();

    const uploadButton = !isDisabled ? (
      <IonButton onClick={this.onUpload}>
        <T>Upload</T>
      </IonButton>
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
