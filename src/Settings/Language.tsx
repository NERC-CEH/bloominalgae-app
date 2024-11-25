import { useContext } from 'react';
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
import appModel from 'common/models/app';

function SelectLanguage() {
  const navigate = useContext(NavContext);

  const currentValue = appModel.attrs.language;

  function onSelect(e: any) {
    appModel.attrs.language = e.target.value; // eslint-disable-line no-param-reassign
    appModel.save();

    navigate.goBack();
  }

  const alphabetically = ([, l1]: any, [, l2]: any): any =>
    typeof l1 === 'string' && l1.localeCompare(l2);

  const languageEntries = ([value, language]: any) => {
    if (typeof language === 'object') return null;

    return (
      <IonItem key={value}>
        <IonLabel>{language}</IonLabel>
        <IonRadio value={value} />
      </IonItem>
    );
  };

  const languagesOptions = Object.entries(languages)
    .sort(alphabetically)
    .map(languageEntries);

  return (
    <Page id="language-options">
      <Header title="Language" />

      <Main>
        <IonList>
          <IonRadioGroup
            className="radio-input-attr"
            onIonChange={onSelect}
            value={currentValue}
          >
            {languagesOptions}
          </IonRadioGroup>
        </IonList>
      </Main>
    </Page>
  );
}

export default observer(SelectLanguage);
