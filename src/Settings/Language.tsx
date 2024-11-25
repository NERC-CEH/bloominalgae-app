import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Main, Header, RadioInput } from '@flumens';
import { IonList, NavContext } from '@ionic/react';
import languages from 'common/languages';
import appModel from 'common/models/app';

function SelectLanguage() {
  const navigate = useContext(NavContext);

  const currentValue = appModel.attrs.language;

  function onSelect(newLanguage: any) {
    appModel.attrs.language = newLanguage; // eslint-disable-line no-param-reassign
    appModel.save();

    navigate.goBack();
  }

  const alphabetically = ([, l1]: any, [, l2]: any): any =>
    typeof l1 === 'string' && l1.localeCompare(l2);

  const languageEntries = ([value, language]: any): any => {
    if (typeof language === 'object') return null;

    return { value, label: language };
  };

  const languagesOptions = Object.entries(languages)
    .sort(alphabetically)
    .map(languageEntries)
    .filter((o: any) => !!o);

  return (
    <Page id="language-options">
      <Header title="Language" />

      <Main>
        <IonList>
          <RadioInput
            onChange={onSelect}
            value={currentValue}
            options={languagesOptions}
            skipTranslation
            platform="ios"
          />
        </IonList>
      </Main>
    </Page>
  );
}

export default observer(SelectLanguage);
