import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Page, Main } from '@flumens';
import { IonList } from '@ionic/react';
import countries from 'common/countries';
import appModel from 'models/app';
import CountryButton from './CountryButton';
import backgroundImage from './backgroundImage.jpg';
import './styles.scss';

type Props = { children: ReactNode };

const CountrySelect = ({ children }: Props) => {
  const { t } = useTranslation();

  if (appModel.attrs.country) return children;

  const selectCountry = (country: string) => {
    const currentLanguage = appModel.attrs.language;

    if (country === 'LU' && currentLanguage === 'fr-BE') {
      appModel.attrs.language = 'fr-LU';
    }

    if (country === 'BE' && currentLanguage === 'fr-LU') {
      appModel.attrs.language = 'fr-BE';
    }

    appModel.attrs.country = country; // eslint-disable-line no-param-reassign
    appModel.save();
  };

  const countriesEntries = () => {
    const alphabetically = (country1: any, country2: any) =>
      country1.label === 'Other'
        ? 1
        : t(country1.label).localeCompare(t(country2.label));

    const getCountry = (country: any) => (
      <CountryButton
        key={country.label}
        country={country}
        onSelect={selectCountry}
      />
    );

    return countries.sort(alphabetically).map(getCountry);
  };

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
            <IonList>{countriesEntries()}</IonList>
          </div>
        </div>
      </Main>
    </Page>
  );
};

export default observer(CountrySelect);
