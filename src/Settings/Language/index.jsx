import { useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import { Page, Main, Header } from '@flumens';
import {
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  NavContext,
} from '@ionic/react';
import languages from 'common/languages';

function SelectLanguage({ appModel }) {
  const navigate = useContext(NavContext);

  const currentValue = appModel.attrs.language;

  function onSelect(e) {
    appModel.attrs.language = e.target.value; // eslint-disable-line no-param-reassign
    appModel.save();

    navigate.goBack();
  }

  const alphabetically = ([, l1], [, l2]) => l1.localeCompare(l2);

  const languageEntries = ([value, language]) => (
    <IonItem key={value}>
      <IonLabel>{language}</IonLabel>
      <IonRadio value={value} />
    </IonItem>
  );

  const languagesOptions = Object.entries(languages)
    .sort(alphabetically)
    .map(languageEntries);

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

SelectLanguage.propTypes = exact({
  appModel: PropTypes.object.isRequired,
});

export default observer(SelectLanguage);
