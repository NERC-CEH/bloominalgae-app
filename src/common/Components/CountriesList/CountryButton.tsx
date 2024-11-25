import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel } from '@ionic/react';

type Props = { onSelect: any; country: any };

// .list-container p {
//   @apply text-[color:var(--ion-color-dark)] font-[bold];
// }

const CountryButton = ({ onSelect, country }: Props) => {
  const { flag, label, value } = country;

  const selectCountry = () => onSelect(value);

  return (
    <IonItem
      key={label}
      lines="none"
      className="max-w-[85%] border text-[color:var(--ion-color-dark)] text-[1.2em] mx-auto my-[30px] rounded-[20px] border-solid border-[#d2d2d2] [--background: white]"
      onClick={selectCountry}
    >
      <div className="flex">
        {flag && (
          <img
            className="bg-[rgb(233,233,233)] w-10 h-10 ml-0 mr-5 my-2.5 rounded-[50%]"
            src={flag}
          />
        )}
        {!flag && (
          <div className="bg-[rgb(233,233,233)] w-10 h-10 ml-0 mr-5 my-2.5 rounded-[50%]" />
        )}
      </div>

      <IonLabel>
        <T>{label}</T>
      </IonLabel>
    </IonItem>
  );
};

export default CountryButton;
