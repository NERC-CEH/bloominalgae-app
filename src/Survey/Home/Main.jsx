import { observer } from 'mobx-react';
import React from 'react';
import { Main, MenuAttrItemFromModel, MenuAttrItem, PhotoPicker } from '@apps';
import PropTypes from 'prop-types';
import image from 'common/models/media';
import { bicycleOutline, locationOutline } from 'ionicons/icons';
import { IonList, withIonLifeCycle } from '@ionic/react';
import GridRefValue from '../Components/GridRefValue';
import logo from './app_logo_dark.png';

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { sample, isDisabled, match } = this.props;

    const { activities } = sample.attrs;

    const prettyGridRef = <GridRefValue sample={sample} />;

    return (
      <Main>
        <IonList lines="full">
          <img src={logo} alt="" />

          <PhotoPicker
            model={sample}
            ImageClass={image}
            isDisabled={isDisabled}
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
          />

          <MenuAttrItemFromModel attr="comment" model={sample} />
        </IonList>
      </Main>
    );
  }
}

export default withIonLifeCycle(Component);
