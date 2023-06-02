import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Page, Main } from '@flumens';
import { IonList } from '@ionic/react';
import countries from 'common/countries';
import appModel from 'models/app';
import CountryButton from './CountryButton';
import backgroundImage from './backgroundImage.jpg';
import './styles.scss';

const getCountry = country => (
  <CountryButton key={country.label} country={country} appModel={appModel} />
);

const countriesEntries = t => {
  const alphabetically = (country1, country2) =>
    country1.label === 'Other'
      ? 1
      : t(country1.label).localeCompare(t(country2.label));

  return countries.sort(alphabetically).map(getCountry);
};

function CountrySelect({ children }) {
  const { t } = useTranslation();

  if (appModel.attrs.country) {
    return children;
  }

  return (
    <Page id="country-select">
      <Main>
        <img
          className="background-image"
          src={backgroundImage}
          alt="background"
        />

        <div className="country-select-container">
          <div className="list-container">
            <IonList>{countriesEntries(t)}</IonList>
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
