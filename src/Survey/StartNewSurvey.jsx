import React, { useEffect, useContext } from 'react';
import appModel from 'appModel';
import PropTypes from 'prop-types';
import Sample from 'sample';
import savedSamples from 'savedSamples';
import { alert, Page } from '@apps';
import { NavContext } from '@ionic/react';
import { withRouter } from 'react-router';

async function showDraftAlert() {
  const alertWrap = resolve => {
    alert({
      header: 'Draft',
      message: 'Previous survey draft exists, would you like to continue it?',
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

async function getNewSample(survey) {
  const sample = await survey.create(Sample);
  await sample.save();

  savedSamples.push(sample);

  const draftIdKey = survey.getDraftIdKey();
  appModel.attrs[draftIdKey] = sample.cid;
  await appModel.save();

  return sample;
}

async function getDraft(survey) {
  const draftIdKey = survey.getDraftIdKey();
  const draftID = appModel.attrs[draftIdKey];
  if (draftID) {
    const byDraftId = ({ cid }) => cid === draftID;
    const draftSample = savedSamples.find(byDraftId);
    if (draftSample) {
      const continueDraftRecord = await showDraftAlert();
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

export default function StartNewSurvey({ match, survey }) {
  const { navigate } = useContext(NavContext);

  const pickDraftOrCreateSampleWrap = () => {
    const hasSurveyDraft = async () => {
      let sample = await getDraft(survey);
      if (!sample) {
        sample = await getNewSample(survey);
      }

      const url = `${match.url}/${sample.cid}`;

      navigate(url, 'none', 'replace');
    };

    hasSurveyDraft();
  };
  useEffect(pickDraftOrCreateSampleWrap, []);

  return <Page id="new-survey" />;
}

StartNewSurvey.propTypes = {
  match: PropTypes.object.isRequired,
  survey: PropTypes.object.isRequired,
};

// eslint-disable-next-line @getify/proper-arrows/name
StartNewSurvey.with = survey => {
  const StartNewSurveyWrap = params => (
    <StartNewSurvey survey={survey} {...params} />
  );

  return withRouter(StartNewSurveyWrap);
};
