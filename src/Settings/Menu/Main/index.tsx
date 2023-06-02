import { FC } from 'react';
import { observer } from 'mobx-react';
import {
  shareSocialOutline,
  arrowUndoSharp,
  flagOutline,
  languageOutline,
} from 'ionicons/icons';
import { Trans as T, useTranslation } from 'react-i18next';
import {
  useAlert,
  Main,
  MenuAttrToggle,
  InfoMessage,
  MenuAttrItem,
} from '@flumens';
import { IonIcon, IonList, IonItem } from '@ionic/react';
import countries from 'common/countries';
import languages from 'common/languages';
import './styles.scss';

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
  resetApp: any;
  sendAnalytics: boolean;
  onToggle: any;
  language?: string;
  country?: string;
};

const MenuMain: FC<Props> = ({
  resetApp,
  language,
  country,
  sendAnalytics,
  onToggle,
}) => {
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

          <IonItem id="app-reset-btn" onClick={showResetDialog}>
            <IonIcon icon={arrowUndoSharp} size="small" slot="start" />
            <T>Reset App</T>
          </IonItem>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuMain);
