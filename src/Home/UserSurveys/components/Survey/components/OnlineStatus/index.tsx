import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonSpinner, IonLabel, IonChip } from '@ionic/react';
import Sample from 'common/models/sample';
import './styles.scss';

type Props = {
  sample: Sample;
};

const UsersSurveys = ({ sample }: Props) => {
  const { saved } = sample.metadata;

  if (!saved) {
    return (
      <IonLabel slot="end" class="survey-status">
        <IonChip color="dark" class="ion-text-wrap">
          <T>Draft</T>
        </IonChip>
      </IonLabel>
    );
  }

  if (!sample.remote.synchronising) {
    return null;
  }

  return <IonSpinner class="survey-status" />;
};

export default observer(UsersSurveys);
