import React from 'react';
import { observer } from 'mobx-react';
import { Main, alert } from '@apps';
import PropTypes from 'prop-types';
import { IonIcon, IonList, IonItemDivider, IonItem } from '@ionic/react';
import { arrowUndoSharp } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import './styles.scss';

function resetDialog(resetApp) {
  alert({
    header: 'Reset',
    skipTranslation: true,
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
  };

  render() {
    const { resetApp } = this.props;

    const showAlertDialog = () => resetDialog(resetApp);

    return (
      <Main className="app-settings">
        <IonList lines="full">
          <IonItemDivider mode="ios">
            <T>Application</T>
          </IonItemDivider>
          <IonItem id="app-reset-btn" onClick={showAlertDialog}>
            <IonIcon icon={arrowUndoSharp} size="small" slot="start" />
            <T>Reset App</T>
          </IonItem>
        </IonList>
      </Main>
    );
  }
}

export default Component;
