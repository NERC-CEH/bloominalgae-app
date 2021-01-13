import React from 'react';
import PropTypes from 'prop-types';
import { IonItem, IonLabel } from '@ionic/react';

function LanguageItem(props) {
  const { flag, label, value } = props.language;

  const selectLanguage = () => {
    props.appModel.attrs.language = value; // eslint-disable-line no-param-reassign
    props.appModel.save();
  };

  return (
    <IonItem
      key={label}
      lines="none"
      className="first"
      onClick={selectLanguage}
    >
      <IonLabel>{label}</IonLabel>

      <div className="icon-wrapper">
        <img className="language-icons" src={flag} />
      </div>
    </IonItem>
  );
}

LanguageItem.propTypes = {
  language: PropTypes.object.isRequired,
  appModel: PropTypes.object.isRequired,
};

export default LanguageItem;
