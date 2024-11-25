import { Trans as T } from 'react-i18next';
import {
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonHeader,
  IonTitle,
} from '@ionic/react';
import './styles.scss';

type Props = {
  title?: string;
  styleId?: string;
  rightSlot?: any;
};

const Header = ({
  title: titleProp,
  styleId: styleIdProp,
  rightSlot,
}: Props) => {
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

export default Header;
