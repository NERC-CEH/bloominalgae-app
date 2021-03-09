import { observer } from 'mobx-react';
import config from 'config';
import React from 'react';
import {
  Main,
  MenuAttrItemFromModel,
  MenuAttrItem,
  PhotoPicker,
  InfoMessage,
} from '@apps';
import PropTypes from 'prop-types';
import image from 'common/models/media';
import {
  bicycleOutline,
  locationOutline,
  checkmarkCircle,
  helpCircle,
  closeCircle,
} from 'ionicons/icons';
import clsx from 'clsx';
import { IonList, withIonLifeCycle } from '@ionic/react';
import GridRefValue from '../Components/GridRefValue';
import logo from './app_logo_dark.png';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
    match: PropTypes.object.isRequired,
  };

  getVerificationMessage = () => {
    const { sample } = this.props;

    const { verification } = sample.metadata;
    if (!verification) {
      return null;
    }

    const icons = {
      V: checkmarkCircle,
      C: helpCircle,
      R: closeCircle,
    };

    const verificationTexts = {
      V: 'This record was verified as correct.',
      C: 'This record was verified as plausible.',
      R: 'This record was verified as incorrect.',
    };

    return (
      <InfoMessage
        className={clsx('verification-message', verification)}
        icon={icons[verification]}
      >
        {verificationTexts[verification]}
      </InfoMessage>
    );
  };

  render() {
    const { sample, isDisabled, match } = this.props;

    const { activities } = sample.attrs;
    const [occ] = sample.occurrences;

    const prettyGridRef = <GridRefValue sample={sample} />;

    return (
      <Main>
        <IonList lines="full">
          {!isDisabled && <img className="app-logo" src={logo} alt="logo" />}

          {this.getVerificationMessage()}

          <PhotoPicker
            model={occ}
            ImageClass={image}
            isDisabled={isDisabled}
            dataDirPath={config.dataPath}
          />

          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={prettyGridRef}
            icon={locationOutline}
            label="Location"
            skipValueTranslation
            disabled={isDisabled}
          />

          <MenuAttrItemFromModel attr="date" model={sample} />
          <MenuAttrItemFromModel attr="bloom-size" model={sample} />

          <MenuAttrItem
            routerLink={`${match.url}/activities`}
            value={activities.length}
            label="Activities"
            icon={bicycleOutline}
            skipValueTranslation
            disabled={isDisabled}
          />

          <MenuAttrItemFromModel attr="comment" model={sample} />
        </IonList>
      </Main>
    );
  }
}

export default withIonLifeCycle(Component);
