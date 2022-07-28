import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonBadge,
} from '@ionic/react';
import { observer } from 'mobx-react';
import { Page, Main } from '@flumens';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import { Trans as T } from 'react-i18next';
import Survey from './components/Survey';
import './styles.scss';

function byCreateTime(m1, m2) {
  const date1 = new Date(m1.metadata.created_on);
  const date2 = new Date(m2.metadata.created_on);
  return date2.getTime() - date1.getTime();
}

@observer
class UserSurveyComponent extends Component {
  static propTypes = {
    savedSamples: PropTypes.array.isRequired,
  };

  state = {
    segment: 'pending',
  };

  onSegmentClick = e => this.setState({ segment: e.detail.value });

  getSamplesList(uploaded) {
    const { savedSamples } = this.props;

    const byUploadStatus = sample =>
      uploaded ? sample.metadata.synced_on : !sample.metadata.synced_on;

    return savedSamples.filter(byUploadStatus).sort(byCreateTime);
  }

  getSurveys = surveys => {
    const getSurvey = sample => <Survey key={sample.cid} sample={sample} />;
    const surveysList = surveys.map(getSurvey);

    return surveysList;
  };

  getUploadedSurveys = () => {
    const surveys = this.getSamplesList(true);

    if (!surveys.length) {
      return <InfoBackgroundMessage>No uploaded records</InfoBackgroundMessage>;
    }
    return this.getSurveys(surveys);
  };

  getPendingSurveys = () => {
    const surveys = this.getSamplesList(false);
    const byMetadataSaved = sample => sample.metadata.saved;
    const finishedSurvey = surveys.find(byMetadataSaved);

    if (!surveys.length) {
      return (
        <InfoBackgroundMessage>
          No finished pending records.
        </InfoBackgroundMessage>
      );
    }

    if (finishedSurvey) {
      return (
        <>
          {this.getSurveys(surveys)}

          <InfoBackgroundMessage name="showSurveyUploadTip">
            Please do not forget to upload any pending records!
          </InfoBackgroundMessage>
        </>
      );
    }

    return (
      <>
        {this.getSurveys(surveys)}

        <InfoBackgroundMessage name="showSurveysDeleteTip">
          To delete any records swipe it to the left.
        </InfoBackgroundMessage>
      </>
    );
  };

  getPendingSurveysCount = () => {
    const pendingSurveys = this.getSamplesList();

    if (!pendingSurveys.length) {
      return null;
    }

    return (
      <IonBadge color="warning" slot="end">
        {pendingSurveys.length}
      </IonBadge>
    );
  };

  getUploadedSurveysCount = () => {
    const uploadedSurveys = this.getSamplesList(true);

    if (!uploadedSurveys.length) {
      return null;
    }

    return (
      <IonBadge color="light" slot="end">
        {uploadedSurveys.length}
      </IonBadge>
    );
  };

  render() {
    const { segment } = this.state;

    const showingPending = segment === 'pending';
    const showingUploaded = segment === 'uploaded';

    return (
      <Page id="home-user-surveys">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonSegment onIonChange={this.onSegmentClick} value={segment}>
              <IonSegmentButton value="pending" checked={showingPending}>
                <IonLabel className="ion-text-wrap">
                  <T>Pending</T>
                  {this.getPendingSurveysCount()}
                </IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="uploaded" checked={showingUploaded}>
                <IonLabel className="ion-text-wrap">
                  <T>Uploaded</T>
                  {this.getUploadedSurveysCount()}
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>

        <Main class="ion-padding">
          {showingPending && this.getPendingSurveys()}
          {showingUploaded && this.getUploadedSurveys()}
        </Main>
      </Page>
    );
  }
}

export default UserSurveyComponent;
