import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Trans as T, useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { Page, Header, useAlert } from '@flumens';
import { IonButton, NavContext } from '@ionic/react';
import appModel from 'common/models/app';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import LocationPanel from './LocationPanel';
import Main from './Main';
import './styles.scss';

type Props = {
  sample: Sample;
};

const SurveyHome = ({ sample }: Props) => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch();
  const { t } = useTranslation();
  const alert = useAlert();
  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  const askToVerifyLocation = () => {
    const askToVerifyLocationWrap = (resolve: any) => {
      const latitude = parseFloat(sample.attrs.location?.latitude || '');
      const longitude = parseFloat(sample.attrs.location?.longitude || '');

      alert({
        header: 'Location',
        cssClass: 'location-map',
        message: (
          <>
            <p>
              <T>Please confirm this is your correct location.</T>
            </p>
            <br />
            <LocationPanel latitude={latitude} longitude={longitude} />
          </>
        ),
        buttons: [
          {
            text: 'Incorrect',
            role: 'blue',
            cssClass: 'primary',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'Correct',
            cssClass: 'primary',
            handler: () => resolve(true),
          },
        ],
      });
    };

    return new Promise(askToVerifyLocationWrap);
  };

  const onFinish = async () => {
    const isValid = checkSampleStatus();
    if (!isValid) return;

    const isDraft = !sample.metadata.saved;
    if (isDraft) {
      const isLocationValid = await askToVerifyLocation();
      if (!isLocationValid) {
        navigate(`${match.url}/location`);
        return;
      }

      (appModel.attrs as any)['draftId:survey'] = null;
      await appModel.save();

      // eslint-disable-next-line no-param-reassign
      sample.metadata.saved = true;
      sample.save();
    }

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    sample.saveRemote();

    navigate(`/home/surveys`, 'root');
  };

  const isEditing = sample.metadata.saved;

  const isDisabled = sample.isUploaded();

  const finishButton = isDisabled ? null : (
    <IonButton onClick={onFinish}>
      {isEditing ? t('Upload') : t('Finish')}
    </IonButton>
  );

  return (
    <Page id="survey-edit">
      <Header title="Record" rightSlot={finishButton} />
      <Main sample={sample} />
    </Page>
  );
};

export default observer(SurveyHome);
