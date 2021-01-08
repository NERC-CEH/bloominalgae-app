import React from 'react';
import PropTypes from 'prop-types';
import { IonCard, IonLabel } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import './styles.scss';

function Card(props) {
  const { text, image } = props.card;

  return (
    <div id="card">
      <IonCard>
        <div className="card" style={{ backgroundImage: `url(${image})` }}>
          <div className="card-wrapper">
            <div className="card-blur-container">
              <IonLabel>
                <T>{text}</T>
              </IonLabel>
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
