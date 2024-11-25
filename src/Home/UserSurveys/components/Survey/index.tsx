import { observer } from 'mobx-react';
import { checkmarkCircle, helpCircle, closeCircle } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { getRelativeDate, useAlert } from '@flumens';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import Sample from 'common/models/sample';
import ErrorMessage from './components/ErrorMessage';
import OnlineStatus from './components/OnlineStatus';
import logo from './logo.png';
import './styles.scss';

function deleteSurvey(sample: Sample, alert: any) {
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

type Props = { sample: Sample };

const Survey = ({ sample }: Props) => {
  const survey: any = sample.getSurvey();
  const alert = useAlert();

  const { synchronising } = sample.remote;

  const [occ] = sample.occurrences;

  const speciesPhoto = occ.media.length ? occ.media[0].attrs.thumbnail : null;

  const href = !synchronising
    ? `/survey/${survey.name}/${sample.cid}`
    : undefined;

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

    return (
      <div className="record-info">
        <h3>
          <T>Record</T>
        </h3>
        <p>{getRelativeDate(date)}</p>
      </div>
    );
  }

  const deleteSurveyWrap = () => deleteSurvey(sample, alert);

  let detailIcon;
  let idClass;
  const status = occ.getVerificationStatus();
  if (status) {
    if (status === 'verified') {
      idClass = 'id-green';
      detailIcon = checkmarkCircle;
    } else if (status === 'plausible') {
      idClass = 'id-amber';
      detailIcon = helpCircle;
    } else {
      idClass = 'id-red';
      detailIcon = closeCircle;
    }
  }

  return (
    <IonItemSliding class="survey-list-item">
      <ErrorMessage sample={sample} />

      <IonItem
        routerLink={href}
        lines="none"
        detail={!synchronising}
        detailIcon={detailIcon}
        className={idClass}
      >
        {getProfilePhoto()}

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

export default observer(Survey);
