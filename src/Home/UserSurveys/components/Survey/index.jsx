import React from 'react';
import PropTypes from 'prop-types';
import { alert } from '@apps';
import { observer } from 'mobx-react';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
  IonAvatar,
} from '@ionic/react';
import OnlineStatus from './components/OnlineStatus';
import ErrorMessage from './components/ErrorMessage';
import './styles.scss';

function deleteSurvey(sample) {
  alert({
    header: 'Delete',
    message: 'Are you sure you want to delete this survey?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: 'Delete',
        cssClass: 'secondary',
        handler: () => sample.destroy(),
      },
    ],
  });
}

const Survey = ({ sample }) => {
  const survey = sample.getSurvey();

  function getSampleInfo() {
    return (
      <>
        <IonAvatar />

        <IonLabel class="ion-text-wrap">
          <h3>
            <b>{survey.label}</b>
          </h3>
          <IonBadge color="medium" />
        </IonLabel>
      </>
    );
  }

  const deleteSurveyWrap = () => deleteSurvey(sample);
  return (
    <IonItemSliding class="survey-list-item">
      <ErrorMessage sample={sample} />
      <IonItem>
        {getSampleInfo()}
        <OnlineStatus sample={sample} />
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={deleteSurveyWrap}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

Survey.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default observer(Survey);
