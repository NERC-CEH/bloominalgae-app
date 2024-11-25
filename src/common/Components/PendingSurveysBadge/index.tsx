import { observer } from 'mobx-react';
import { IonBadge } from '@ionic/react';
import Sample from 'common/models/sample';
import './styles.scss';

function getPendingCount(savedSamples: any) {
  const byUploadStatus = (sample: Sample) => !sample.syncedAt;

  return savedSamples.filter(byUploadStatus).length;
}

type Props = { savedSamples: any };

function PendingSurveysBadge({ savedSamples }: Props) {
  const count = getPendingCount(savedSamples);

  if (count <= 0) {
    return null;
  }

  return (
    <IonBadge color="secondary" className="pending-surveys-badge">
      {count}
    </IonBadge>
  );
}

export default observer(PendingSurveysBadge);
