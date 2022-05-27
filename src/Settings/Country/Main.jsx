import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import {
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
} from '@ionic/react';
import { Main } from '@apps';
import { Trans as T } from 'react-i18next';
import countries from 'common/countries';

const getCountriesOptions = () => {
  const alphabetically = (country1, country2) =>
    country1.label.localeCompare(country2.label);

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
  const currentValue = appModel.attrs.country;

  return (
    <Main>
      <IonList>
        <IonRadioGroup onIonChange={onSelect} value={currentValue}>
          {getCountriesOptions()}
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
