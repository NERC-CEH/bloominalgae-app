import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Page, Header } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'common/models/app';
import Main from './Main';

function SelectCountry() {
  const navigate = useContext(NavContext);

  const onSelect = (e: any) => {
    appModel.attrs.country = e.target.value; // eslint-disable-line no-param-reassign
    appModel.save();
    navigate.goBack();
  };

  return (
    <Page id="country-select">
      <Header title="Country" />
      <Main appModel={appModel} onSelect={onSelect} />
    </Page>
  );
}

export default observer(SelectCountry);
