import { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Page, Main } from '@flumens';
import appModel from 'models/app';
import CountriesList from '../CountriesList';
import backgroundImage from './backgroundImage.jpg';

type Props = { children: ReactNode };

const CountrySelect = ({ children }: Props) => {
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

  return (
    <Page id="country-select">
      <Main className="[--padding-top:0] [--padding-bottom:0]">
        <div className="relative backdrop-blur-[0.5px] bg-[rgba(0,0,0,0.3)] h-full">
          <img
            className="absolute brightness-90 w-screen h-full"
            src={backgroundImage}
            alt="background"
          />

          <div className="w-full max-h-screen overflow-x-scroll">
            <CountriesList onChange={selectCountry} />
          </div>
        </div>
      </Main>
    </Page>
  );
};

export default observer(CountrySelect);
