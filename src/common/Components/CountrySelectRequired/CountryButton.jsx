import React from 'react';
import PropTypes from 'prop-types';
import { IonItem, IonLabel } from '@ionic/react';
import { Trans as T } from 'react-i18next';

function CountryButton({ appModel, country }) {
  const { flag, label, value } = country;

  const selectCountry = () => {
    appModel.attrs.country = value; // eslint-disable-line no-param-reassign
    appModel.save();
  };

  return (
    <IonItem key={label} lines="none" className="first" onClick={selectCountry}>
      <div className="icon-wrapper">
        {flag && <img className="language-icons" src={flag} />}
        {!flag && <div className="language-icon-default" />}
      </div>

      <IonLabel>
        <T>{label}</T>
      </IonLabel>
    </IonItem>
  );
}

CountryButton.propTypes = {
  country: PropTypes.object.isRequired,
  appModel: PropTypes.object.isRequired,
};

export default CountryButton;
