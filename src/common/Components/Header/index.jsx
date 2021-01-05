import React from 'react';
import PropTypes from 'prop-types';
import {
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonHeader,
  IonTitle,
} from '@ionic/react';
import './styles.scss';

const Header = props => {
  const title = props.title || '';

  const styleId = props.styleId || 'custom-header';

  return (
    <IonHeader className="ion-no-border" id={styleId}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
          <IonTitle>{title}</IonTitle>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  styleId: PropTypes.string,
};

export default Header;
