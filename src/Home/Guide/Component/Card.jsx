import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IonCard, IonLabel } from '@ionic/react';
import './styles.scss';

function Card(props) {
  const { t } = useTranslation();

  const { text, image } = props.card;

  return (
    <div id="card">
      <IonCard>
        <div className="card" style={{ backgroundImage: `url(${image})` }}>
          <div className="card-wrapper">
            <div className="card-blur-container">
              <IonLabel>{t(text)}</IonLabel>
            </div>
          </div>
        </div>
      </IonCard>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
