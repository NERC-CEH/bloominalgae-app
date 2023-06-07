import { useContext } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Header } from '@flumens';
import { NavContext } from '@ionic/react';
import Main from './Main';

function SelectCountry({ appModel }) {
  const navigate = useContext(NavContext);

  const onSelect = e => {
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

SelectCountry.propTypes = exact({
  appModel: PropTypes.object.isRequired,
});

export default observer(SelectCountry);
