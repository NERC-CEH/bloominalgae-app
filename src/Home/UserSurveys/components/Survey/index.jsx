import React from 'react';
import PropTypes from 'prop-types';
import { alert, date as dateUtils } from '@apps';
import { observer } from 'mobx-react';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import logo from './logo.png';
import OnlineStatus from './components/OnlineStatus';
import ErrorMessage from './components/ErrorMessage';
import './styles.scss';

function deleteSurvey(sample) {
  alert({
    header: 'Delete',
    message: <T>Are you sure you want to delete this record ?</T>,
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

  const speciesPhoto = sample.media.length ? sample.media[0].getURL() : null;

  const href = `/${survey.name}/start/${sample.cid}`;

  const getProfilePhoto = () => {
    const photo = speciesPhoto ? (
      <img src={speciesPhoto} />
    ) : (
      <img src={logo} className="default-logo" />
    );

    return <div className="record-photo-profile">{photo}</div>;
  };

  function getSampleInfo() {
    const { date } = sample.attrs;

    const prettyDate = dateUtils.print(date);

    return (
      <div className="record-info">
        <h3>
          <T>Record</T>
        </h3>
        <p>{prettyDate}</p>
      </div>
    );
  }

  const deleteSurveyWrap = () => deleteSurvey(sample);
  return (
    <IonItemSliding class="survey-list-item">
      <ErrorMessage sample={sample} />

      <IonItem routerLink={href} detail lines="none">
        {getProfilePhoto(speciesPhoto)}

        <IonLabel className="ion-no-margin">{getSampleInfo()}</IonLabel>
        <OnlineStatus sample={sample} />
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={deleteSurveyWrap}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

Survey.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default observer(Survey);
