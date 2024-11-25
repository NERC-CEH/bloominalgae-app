import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Header, Main } from '@flumens';
import { NavContext } from '@ionic/react';
import CountriesList from 'common/Components/CountriesList';
import appModel from 'common/models/app';

function SelectCountry() {
  const navigate = useContext(NavContext);

  const onSelect = (newCountry: string) => {
    appModel.attrs.country = newCountry; // eslint-disable-line no-param-reassign
    appModel.save();
    navigate.goBack();
  };

  return (
    <Page id="country-select">
      <Header title="Country" />
      <Main>
        <CountriesList onChange={onSelect} />
      </Main>
    </Page>
  );
}

export default observer(SelectCountry);
