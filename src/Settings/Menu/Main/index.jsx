import * as React from 'react';
import { observer } from 'mobx-react';
import { alert, Main, Toggle, MenuNote, MenuAttrItem } from '@flumens';
import {
  shareSocialOutline,
  arrowUndoSharp,
  flagOutline,
  languageOutline,
} from 'ionicons/icons';
import PropTypes from 'prop-types';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import languages from 'common/languages';
import countries from 'common/countries';
import { Trans as T, withTranslation } from 'react-i18next';
import './styles.scss';

function resetDialog(resetApp) {
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
}

@observer
class Component extends React.Component {
  static propTypes = {
    resetApp: PropTypes.func.isRequired,
    sendAnalytics: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    language: PropTypes.string,
    country: PropTypes.string,
    t: PropTypes.func,
  };

  render() {
    const { resetApp, language, country, sendAnalytics, onToggle, t } =
      this.props;

    const showAlertDialog = () => resetDialog(resetApp);
    const onSendAnalyticsToggle = checked => onToggle('sendAnalytics', checked);

    const countryNameByISO = ({ value }) => value === country;
    const selectedCountry = countries.find(countryNameByISO) || {};

    return (
      <Main className="app-settings">
        <IonList lines="full">
          <MenuAttrItem
            routerLink="/settings/language"
            routerOptions={{ unmount: true }} // Pick a new language on return
            value={languages[language]}
            label="Language"
            icon={languageOutline}
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink="/settings/country"
            routerOptions={{ unmount: true }}
            value={t(selectedCountry.label)}
            label="Country"
            icon={flagOutline}
            skipValueTranslation
          />

          <IonItem>
            <IonIcon icon={shareSocialOutline} size="small" slot="start" />
            <IonLabel>
              <T>Share App Analytics</T>
            </IonLabel>
            <Toggle onToggle={onSendAnalyticsToggle} checked={sendAnalytics} />
          </IonItem>
          <MenuNote>
            Share app crash data so we can make the app more reliable.
          </MenuNote>

          <IonItem id="app-reset-btn" onClick={showAlertDialog}>
            <IonIcon icon={arrowUndoSharp} size="small" slot="start" />
            <T>Reset App</T>
          </IonItem>
        </IonList>
      </Main>
    );
  }
}

export default withTranslation()(Component);
