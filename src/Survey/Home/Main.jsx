import { observer } from 'mobx-react';
import React from 'react';
import {
  Main,
  MenuAttrItemFromModel,
  MenuAttrItem,
  InfoMessage,
  InfoButton,
} from '@apps';
import PropTypes from 'prop-types';
import {
  bicycleOutline,
  locationOutline,
  checkmarkCircle,
  helpCircle,
  closeCircle,
} from 'ionicons/icons';
import clsx from 'clsx';
import { IonList } from '@ionic/react';
import PhotoPicker from 'Components/PhotoPicker';
import GridRefValue from '../Components/GridRefValue';
import logo from './app_logo_dark.png';
import './styles.scss';

const verificationTexts = {
  verified: (
    <>
      <p>
        Thanks so much for sending your record in - this looks very much like a
        bloom of blue-green algae (also known as cyanobacteria), so we have
        verified your record as “considered correct”.
      </p>

      <InfoButton label="READ MORE" header="Info">
        <p>
          These surface accumulations constitute a high risk to public and
          animal health – particularly to dogs. If this is a public place, then
          please check that warning signs are posted. If not, please contact
          your local authority environmental health officer or environment
          protection agency who can advise the landowner on an appropriate
          warning sign.
        </p>

        <p>
          Finally, please avoid contact with the water or any shoreline scum. If
          you, or your pet, become unwell after any contact with the water, we’d
          recommend you seek immediate medical or veterinary advice.
        </p>

        <p>Thanks again for using the app!</p>

        <p>The Bloomin'Algae team at the UK Centre for Ecology & Hydrology</p>
      </InfoButton>
    </>
  ),
  plausible: (
    <>
      <p>
        Thanks for sending in your record using the Bloomin'Algae app. Your
        photo is unfortunately not clear enough to make a decision.
      </p>

      <p>
        Please could you send in a new record with a closer photo of the water
        (if possible, about 30-50 cm from the water surface and/or any surface
        scums).
      </p>
      <InfoButton label="READ MORE" header="Info">
        <p>
          Please see our website for further help with identifying blooms of
          blue-green algae : https://www.ceh.ac.uk/algal-blooms/bloomin-algae
        </p>

        <p>
          If you do suspect a bloom at any site, please avoid contact with the
          water or any shoreline scum. If you, or your pet, become unwell after
          contact with water that may be contaminated with blue-green algae,
          we’d recommend you seek immediate medical or veterinary advice.
        </p>

        <p>Thanks again for using the app!</p>

        <p>The Bloomin'Algae team at the UK Centre for Ecology & Hydrology</p>
      </InfoButton>
    </>
  ),
  // unable to verify
  rejected4: (
    <>
      <p>Thanks for sending in your record using the Bloomin'Algae app.</p>

      <p>
        We have rejected this record as we think the location is incorrect.
        Please could you check your record and send in a new record with the
        correct location.
      </p>
      <InfoButton label="READ MORE" header="Info">
        <p>
          Please see our website for further help with using the app and
          identifying blooms of blue-green algae :
          https://www.ceh.ac.uk/algal-blooms/bloomin-algae
        </p>

        <p>
          If you do suspect a bloom at any site, please avoid contact with the
          water or any shoreline scum. If you, or your pet, become unwell after
          contact with water that may be contaminated with blue-green algae,
          we’d recommend you seek immediate medical or veterinary advice.
        </p>

        <p>Thanks again for using the app!</p>

        <p>The Bloomin'Algae team at the UK Centre for Ecology & Hydrology</p>
      </InfoButton>
    </>
  ),
  // incorrect
  rejected5: (
    <>
      <p>Thanks for sending in your record using the Bloomin'Algae app. </p>

      <p>
        From your photos, we do not think this is blue-green algae
        (cyanobacteria).
      </p>
      <InfoButton label="READ MORE" header="Info">
        <p>
          We cannot of course be certain that blue-green algae are not present
          at all at this site, but they are not clearly visible in the photo.
        </p>

        <p>
          Our algal guide in the app has photos to help with identification. Our
          website also has a description of a simple stick test you can use to
          help eliminate duckweed and blanket weed, which are commonly
          misidentified as blue-green algae:
          https://www.ceh.ac.uk/algal-blooms/bloomin-algae
        </p>

        <p>
          If you do suspect a bloom at any site, please avoid contact with the
          water or any shoreline scum. If you, or your pet, become unwell after
          contact with water that may be contaminated with blue-green algae,
          we’d recommend you seek immediate medical or veterinary advice.
        </p>

        <p>Thanks again for using the app!</p>

        <p>The Bloomin'Algae team at the UK Centre for Ecology & Hydrology</p>
      </InfoButton>
    </>
  ),
};

@observer
class Component extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool,
    match: PropTypes.object.isRequired,
  };

  getVerificationMessage = () => {
    const { sample } = this.props;

    const status = sample.getVerificationStatus();
    if (!status) {
      return null;
    }

    const icons = {
      verified: checkmarkCircle,
      plausible: helpCircle,
      rejected: closeCircle,
    };

    let textCode = status;
    const substatus = sample.metadata.verification_substatus;
    if (status === 'rejected' && substatus) {
      textCode = `${status}${substatus}`;
      if (!verificationTexts[textCode]) {
        // in case new code is issued that isn't supported default to `incorrect`
        textCode = `${status}${5}`;
      }
    }

    const text = verificationTexts[textCode];
    if (!text) {
      return null;
    }

    return (
      <InfoMessage
        className={clsx('verification-message', status)}
        icon={icons[status]}
      >
        {text}
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

          {isDisabled && (
            <InfoMessage className="uploaded-message">
              This record has been uploaded and can not be edited.
            </InfoMessage>
          )}

          <PhotoPicker model={occ} />

          <MenuAttrItem
            routerLink={`${match.url}/location`}
            value={prettyGridRef}
            icon={locationOutline}
            label="Location"
            skipValueTranslation
            disabled={isDisabled}
          />

          <MenuAttrItemFromModel attr="date" model={sample} />
          <MenuAttrItemFromModel attr="size" model={sample} />

          <MenuAttrItem
            routerLink={`${match.url}/activities`}
            value={activities.length}
            label="Activities"
            icon={bicycleOutline}
            skipValueTranslation
            disabled={isDisabled}
          />

          <MenuAttrItemFromModel
            attr="comment"
            model={occ}
            routerLink={`${match.url}/${occ.cid}/comment`}
          />
        </IonList>
      </Main>
    );
  }
}

export default Component;
