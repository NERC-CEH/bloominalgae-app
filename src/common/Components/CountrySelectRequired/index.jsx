import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Main } from '@apps';
import { IonList, IonIcon } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import countries from 'common/countries';
import appModel from 'appModel';
import backgroundImage from './backgroundImage.jpg';
import CountryButton from './CountryButton';
import './styles.scss';

const alphabetically = (country1, country2) =>
  country1.label.localeCompare(country2.label);

const getCountry = country => (
  <CountryButton key={country.label} country={country} appModel={appModel} />
);

const countriesEntries = () => countries.sort(alphabetically).map(getCountry);

function CountrySelect({ children }) {
  if (appModel.attrs.country) {
    return children;
  }

  return (
    <Page id="country-select">
      <div className="header">
        <IonIcon icon={globeOutline} />
      </div>

      <Main>
        <img
          className="background-image"
          src={backgroundImage}
          alt="background"
        />

        <div className="country-select-container">
          <div className="list-container">
            <IonList>{countriesEntries()}</IonList>
          </div>
        </div>
      </Main>
    </Page>
  );
}

CountrySelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default observer(CountrySelect);
