import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Trans as T } from 'react-i18next';
import { useAlert } from '@flumens';
import { NavContext } from '@ionic/react';
import Occurrence from 'common/models/occurrence';
import Sample from 'common/models/sample';
import savedSamples from 'common/models/savedSamples';
import appModel from 'models/app';

async function showDraftAlert(alert) {
  const alertWrap = resolve => {
    alert({
      header: 'Draft',
      message: (
        <T>Previous record draft exists, would you like to continue it?</T>
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          cssClass: 'primary',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  };
  return new Promise(alertWrap);
}

async function getNewSample(survey, draftIdKey) {
  const sample = await survey.create(Sample, Occurrence);
  await sample.save();

  savedSamples.push(sample);
  appModel.attrs[draftIdKey] = sample.cid;
  await appModel.save();

  return sample;
}

async function getDraft(draftIdKey, alert) {
  const draftID = appModel.attrs[draftIdKey];

  if (draftID) {
    const byId = ({ cid }) => cid === draftID;
    const draftSample = savedSamples.find(byId);
    if (draftSample) {
      const continueDraftRecord = await showDraftAlert(alert);
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

function StartNewSurvey({ match, survey }) {
  const context = useContext(NavContext);
  const alert = useAlert();

  const draftIdKey = `draftId:${survey.name}`;

  const pickDraftOrCreateSampleWrap = () => {
    // eslint-disable-next-line
    (async () => {
      let sample = await getDraft(draftIdKey, alert);

      if (!sample) {
        sample = await getNewSample(survey, draftIdKey);
      }

      const url = `${match.url}/${sample.cid}`;
      context.navigate(url, 'none', 'replace');
    })();
  };

  useEffect(pickDraftOrCreateSampleWrap, [match.url]);

  return null;
}

StartNewSurvey.propTypes = exact({
  match: PropTypes.object.isRequired,
  survey: PropTypes.object.isRequired,
});

// eslint-disable-next-line @getify/proper-arrows/name
StartNewSurvey.with = survey => {
  const StartNewSurveyWrap = params => (
    <StartNewSurvey survey={survey} {...params} />
  );

  return StartNewSurveyWrap;
};

export default StartNewSurvey;
