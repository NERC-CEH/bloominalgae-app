import { observer } from 'mobx-react';
import { Trans as T, useTranslation } from 'react-i18next';
import { Main } from '@flumens';
import {
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
} from '@ionic/react';
import countries from 'common/countries';
import { AppModel } from 'common/models/app';

const getCountriesOptions = (t: any) => {
  const alphabetically = (country1: any, country2: any) =>
    country1.label === 'Other'
      ? 1
      : t(country1.label).localeCompare(t(country2.label));

  const getCountry = ({ value, label }: any) => (
    <IonItem key={value} className="rounded-list">
      <IonLabel>
        <T>{label}</T>
      </IonLabel>
      <IonRadio value={value} />
    </IonItem>
  );

  return countries.sort(alphabetically).map(getCountry);
};

type Props = {
  appModel: AppModel;
  onSelect: any;
};

function SelectCountryContainer({ appModel, onSelect }: Props) {
  const { t } = useTranslation();
  const currentValue = appModel.attrs.country;

  return (
    <Main>
      <IonList>
        <IonRadioGroup
          className="radio-input-attr"
          onIonChange={onSelect}
          value={currentValue}
        >
          {getCountriesOptions(t)}
        </IonRadioGroup>
      </IonList>
    </Main>
  );
}

export default observer(SelectCountryContainer);
