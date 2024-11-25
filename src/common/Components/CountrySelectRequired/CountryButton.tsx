import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel } from '@ionic/react';

type Props = { onSelect: any; country: any };

const CountryButton = ({ onSelect, country }: Props) => {
  const { flag, label, value } = country;

  const selectCountry = () => onSelect(value);

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
};

export default CountryButton;
