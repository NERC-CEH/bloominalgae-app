import { FC } from 'react';
import { observer } from 'mobx-react';
import {
  shareSocialOutline,
  flagOutline,
  languageOutline,
  personRemoveOutline,
  warningOutline,
  arrowUndoOutline,
} from 'ionicons/icons';
import { Trans as T, useTranslation } from 'react-i18next';
import {
  useAlert,
  Main,
  MenuAttrToggle,
  InfoMessage,
  MenuAttrItem,
} from '@flumens';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import countries from 'common/countries';
import languages from 'common/languages';
import './styles.scss';

function useUserDeleteDialog(deleteUser: any) {
  const alert = useAlert();

  const showUserDeleteDialog = () => {
    alert({
      header: 'Account delete',
      message: (
        <>
          <T>Are you sure you want to delete your account?</T>
          <InfoMessage
            color="danger"
            icon={warningOutline}
            className="destructive-warning"
          >
            This will remove your account on the iRecord website. You will lose
            access to any records that you have previously submitted using the
            app or website.
          </InfoMessage>
        </>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: deleteUser,
        },
      ],
    });
  };

  return showUserDeleteDialog;
}

const useResetDialog = (resetApp: any) => {
  const alert = useAlert();

  const showResetDialog = () => {
    alert({
      header: 'Reset',
      message: (
        <>
          <T>
            Are you sure you want to reset the application to its initial state?
            <p>
              <b>This will wipe all the locally stored app data!</b>
            </p>
          </T>
        </>
      ),
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Reset',
          cssClass: 'secondary',
          handler: resetApp,
        },
      ],
    });
  };
  return showResetDialog;
};

type Props = {
  deleteUser: any;
  isLoggedIn: boolean;
  resetApp: any;
  sendAnalytics: boolean;
  onToggle: any;
  language?: string;
  country?: string;
};

const MenuMain: FC<Props> = ({
  isLoggedIn,
  deleteUser,
  resetApp,
  language,
  country,
  sendAnalytics,
  onToggle,
}) => {
  const showUserDeleteDialog = useUserDeleteDialog(deleteUser);

  const showResetDialog = useResetDialog(resetApp);

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);
  const { t } = useTranslation();

  const countryNameByISO = ({ value }: any) => value === country;
  const selectedCountry = countries.find(countryNameByISO) || {};

  return (
    <Main className="app-settings">
      <IonList lines="full">
        <div className="rounded">
          <MenuAttrItem
            routerLink="/settings/language"
            routerOptions={{ unmount: true }} // Pick a new language on return
            value={(languages as any)[language as any]}
            label="Language"
            icon={languageOutline}
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink="/settings/country"
            routerOptions={{ unmount: true }}
            value={t((selectedCountry as any).label)}
            label="Country"
            icon={flagOutline}
            skipValueTranslation
          />

          <MenuAttrToggle
            label="Share App Analytics"
            icon={shareSocialOutline}
            onChange={onSendAnalyticsToggle}
            value={sendAnalytics}
          />
          <InfoMessage color="medium">
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </div>

        <div className="destructive-item rounded">
          <IonItem onClick={showResetDialog}>
            <IonIcon icon={arrowUndoOutline} size="small" slot="start" />
            <IonLabel>Reset app</IonLabel>
          </IonItem>
          <InfoMessage color="medium">
            You can reset the app data to its default settings.
          </InfoMessage>

          {isLoggedIn && (
            <>
              <IonItem onClick={showUserDeleteDialog}>
                <IonIcon icon={personRemoveOutline} size="small" slot="start" />
                <IonLabel>
                  <T>Delete account</T>
                </IonLabel>
              </IonItem>
              <InfoMessage color="medium">
                You can delete your user account from the system.
              </InfoMessage>
            </>
          )}
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuMain);
