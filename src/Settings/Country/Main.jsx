import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
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

const getCountriesOptions = t => {
  const alphabetically = (country1, country2) =>
    country1.label === 'Other'
      ? 1
      : t(country1.label).localeCompare(t(country2.label));

  const getCountry = ({ value, label }) => (
    <IonItem key={value} className="rounded">
      <IonLabel>
        <T>{label}</T>
      </IonLabel>
      <IonRadio value={value} />
    </IonItem>
  );

  return countries.sort(alphabetically).map(getCountry);
};

function SelectCountryContainer({ appModel, onSelect }) {
  const { t } = useTranslation();
  const currentValue = appModel.attrs.country;

  return (
    <Main>
      <IonList>
        <IonRadioGroup
          className="radio-input-attr "
          onIonChange={onSelect}
          value={currentValue}
        >
          {getCountriesOptions(t)}
        </IonRadioGroup>
      </IonList>
    </Main>
  );
}

SelectCountryContainer.propTypes = exact({
  appModel: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
});

export default observer(SelectCountryContainer);
