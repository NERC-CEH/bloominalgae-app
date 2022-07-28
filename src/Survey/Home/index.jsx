import { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonButton, NavContext } from '@ionic/react';
import { Trans as T, withTranslation } from 'react-i18next';
import { Page, Header, showInvalidsMessage, alert } from '@flumens';
import MapComponent from '../Components/Map';
import Main from './Main';
import './styles.scss';

@observer
class Controller extends Component {
  static contextType = NavContext;

  static propTypes = {
    sample: PropTypes.object.isRequired,
    appModel: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
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

  onFinish = async () => {
    const { sample, appModel, userModel, match } = this.props;

    const invalids = sample.validateRemote();
    if (invalids) {
      showInvalidsMessage(invalids, { header: 'Record incomplete' });
      return;
    }

    const isDraft = !sample.metadata.saved;
    if (isDraft) {
      const isLocationValid = await this.askToVerifyLocation();
      if (!isLocationValid) {
        this.context.navigate(`${match.url}/location`);
        return;
      }

      appModel.attrs['draftId:survey'] = null;
      await appModel.save();

      sample.metadata.saved = true;
      sample.save();
    }

    const isLoggedIn = !!userModel.attrs.email;
    if (!isLoggedIn) {
      this.context.navigate(`/user/register`);
      return;
    }

    sample.saveRemote();

    this.context.navigate(`/home/surveys`, 'root');
  };

  resetGPS = () => {
    const { sample } = this.props;

    sample.toggleGPStracking();
  };

  render() {
    const { sample, t } = this.props;

    const isEditing = sample.metadata.saved;

    const isDisabled = sample.isUploaded();

    const finishButton = isDisabled ? null : (
      <IonButton onClick={this.onFinish}>
        {isEditing ? t('Upload') : t('Finish')}
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

export default withTranslation()(Controller);
