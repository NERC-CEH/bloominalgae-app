import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext, withIonLifeCycle } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { Page, Header, showInvalidsMessage, alert } from '@apps';
import MapComponent from '../Components/Map';
import Main from './Main';
import './styles.scss';

@observer
class Controller extends React.Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  askToVerifyLocation = () => {
    const { sample } = this.props;

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
              resolve(false);
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

  _processSubmission = () => {
    const { sample, userModel } = this.props;

    const invalids = sample.validateRemote();

    if (invalids) {
      showInvalidsMessage(invalids);
      return;
    }

    const isLoggedIn = !!userModel.attrs.id;
    if (!isLoggedIn) {
      this.context.navigate(`/user/register`);
      return;
    }

    sample.saveRemote();

    this.context.navigate(`/home/surveys`, 'root');
  };

  _processDraft = async () => {
    const { appModel, sample, match } = this.props;

    const invalids = sample.validateRemote();
    if (invalids) {
      showInvalidsMessage(invalids);
      return;
    }

    const isLocationValid = await this.askToVerifyLocation();
    if (!isLocationValid) {
      this.context.navigate(`${match.url}/location`);
      return;
    }

    appModel.attrs['draftId:survey'] = null;
    await appModel.save();

    sample.metadata.saved = true;
    sample.save();

    this.context.navigate(`/home/surveys`, 'root');
  };

  onFinish = async () => {
    const { sample } = this.props;

    if (!sample.metadata.saved) {
      await this._processDraft();
      return;
    }

    await this._processSubmission();
  };

  resetGPS = () => {
    const { sample } = this.props;

    sample.toggleGPStracking();
  };

  render() {
    const { sample } = this.props;

    const isEditing = sample.metadata.saved;

    const isDisabled = sample.isUploaded();

    const finishButton = isDisabled ? null : (
      <IonButton
        onClick={this.onFinish}
        color="primary"
        fill="solid"
        shape="round"
      >
        {isEditing ? 'Upload' : 'Finish'}
      </IonButton>
    );

    return (
      <Page id="survey-edit">
        <Header title="Record" rightSlot={finishButton} />
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
