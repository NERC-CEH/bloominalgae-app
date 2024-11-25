import { useTranslation } from 'react-i18next';
import { IonList } from '@ionic/react';
import countries from 'common/countries';
import CountryButton from './CountryButton';

type Props = { onChange: any };

const CountriesList = ({ onChange }: Props) => {
  const { t } = useTranslation();

  const countriesEntries = () => {
    const alphabetically = (country1: any, country2: any) =>
      country1.label === 'Other'
        ? 1
        : t(country1.label).localeCompare(t(country2.label));

    const getCountry = (country: any) => (
      <CountryButton
        key={country.label}
        country={country}
        onSelect={onChange}
      />
    );

    return countries.sort(alphabetically).map(getCountry);
  };

  return (
    <IonList className="w-full text-center rounded-[20px_20px_0_0]">
      {countriesEntries()}
    </IonList>
  );
};

export default CountriesList;
