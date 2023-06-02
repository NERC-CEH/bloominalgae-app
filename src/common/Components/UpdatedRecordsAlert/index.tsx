import { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Trans as T, useTranslation } from 'react-i18next';
import { useAlert } from '@flumens';
import { IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import './styles.scss';

let isPopupVisible = false;

const UpdatedRecordsDialog: FC = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  const { showVerifiedRecordsNotification } = appModel.attrs;

  const onToggleAlert = (e: any) => {
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showVerifiedRecordsNotification = !e.detail.checked;
  };

  const showAlert = () => {
    if (!showVerifiedRecordsNotification || isPopupVisible) return;

    if (!savedSamples.verified.updated.length) return;

    isPopupVisible = true;

    const message = (
      <>
        <p>
          <T>
            Some of your records have been verified. Please check your records
            list.
          </T>
        </p>

        <IonItem lines="none">
          <IonCheckbox
            slot="start"
            checked={false}
            onIonChange={onToggleAlert}
          />
          <IonLabel>
            <small>
              <T>Do not show again</T>
            </small>
          </IonLabel>
        </IonItem>
      </>
    );

    alert({
      message,
      cssClass: 'updated-records-dialog',
      backdropDismiss: false,
      skipTranslation: true,
      buttons: [
        {
          text: t('OK'),
          handler: () => {
            isPopupVisible = false;
            appModel.save();
          },
        },
      ],
    });
  };

  useEffect(showAlert, [savedSamples.verified?.timestamp]);

  return null;
};

export default observer(UpdatedRecordsDialog);
