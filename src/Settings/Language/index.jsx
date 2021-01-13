import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Page, Main, Header } from '@apps';
import {
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  NavContext,
} from '@ionic/react';
import languages from 'common/config/languages';

function SelectLanguage({ appModel }) {
  const navigate = useContext(NavContext);

  const currentValue = appModel.attrs.language;

  function onSelect(e) {
    appModel.attrs.language = e.target.value; // eslint-disable-line no-param-reassign
    appModel.save();

    navigate.goBack();
  }

  const alphabetically = (lng1, lng2) => lng1.label.localeCompare(lng2.label);

  const languageEntries = ({ value, label }) => (
    <IonItem key={value}>
      <IonLabel>{label}</IonLabel>
      <IonRadio value={value} />
    </IonItem>
  );

  const languagesOptions = languages.sort(alphabetically).map(languageEntries);

  return (
    <Page id="language-options">
      <Header title="Language" />

      <Main>
        <IonList>
          <IonRadioGroup onIonChange={onSelect} value={currentValue}>
            {languagesOptions}
          </IonRadioGroup>
        </IonList>
      </Main>
    </Page>
  );
}

SelectLanguage.propTypes = {
  appModel: PropTypes.object.isRequired,
};

export default observer(withRouter(SelectLanguage));
