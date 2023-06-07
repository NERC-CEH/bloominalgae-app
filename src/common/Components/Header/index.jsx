import PropTypes from 'prop-types';
import { Trans as T } from 'react-i18next';
import {
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonHeader,
  IonTitle,
} from '@ionic/react';
import './styles.scss';

const Header = ({ title: titleProp, styleId: styleIdProp, rightSlot }) => {
  const title = titleProp || '';

  const styleId = styleIdProp || 'custom-header';

  return (
    <IonHeader className="ion-no-border" id={styleId}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          <T>{title}</T>
        </IonTitle>

        {rightSlot && <IonButtons slot="end">{rightSlot}</IonButtons>}
      </IonToolbar>
    </IonHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  styleId: PropTypes.string,
  rightSlot: PropTypes.any,
};

export default Header;
