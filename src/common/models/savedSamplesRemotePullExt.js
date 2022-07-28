import axios from 'axios';
import i18n from 'i18next';
import { alert } from '@flumens';

async function fetchUpdatedRemoteSamples(userModel) {
  console.log('SavedSamples: pulling remote surveys');

  const options = {
    params: {
      survey: 'bloominAlgae',
      report: 'appUser',
      userID: userModel.attrs.indiciaUserId,
    },
  };

  const res = await axios.get(
    'https://eip.ceh.ac.uk/hydrology-ukscape/bloominAlgae',
    // 'http://localhost:3000/data',
    options
  );

  const updatedRecords = res.data || {};
  return updatedRecords.data || [];
}

function fetchUpdatedLocalSamples(savedSamples, updatedRemoteSamples) {
  const updatedSamples = [];

  if (updatedRemoteSamples.length <= 0) {
    return updatedSamples;
  }

  const normalizedResponse = {};
  const normalizeResponse = ({ id, ...rest }) => {
    normalizedResponse[id] = { ...rest };
  };
  updatedRemoteSamples.forEach(normalizeResponse);

  const findMatchingLocalSamples = sample => {
    const occ = sample.occurrences[0] || {};
    const updatedSample = normalizedResponse[occ.id];
    if (!updatedSample) {
      return;
    }

    const newVerificationStatus = updatedSample.verification.status_code;
    if (sample.metadata.verification === newVerificationStatus) {
      return;
    }

    // eslint-disable-next-line
    sample.metadata.verification = newVerificationStatus;
    // eslint-disable-next-line
    sample.metadata.verification_substatus =
      updatedSample.verification.substatus_code;

    sample.save();

    updatedSamples.push(sample);
  };

  savedSamples.forEach(findMatchingLocalSamples);

  return updatedSamples;
}

export default function init(savedSamples, userModel) {
  async function sync() {
    if (!userModel.attrs.indiciaUserId) {
      return;
    }

    const updatedRemoteSamples = await fetchUpdatedRemoteSamples(userModel);
    const updatedLocalSamples = await fetchUpdatedLocalSamples(
      savedSamples,
      updatedRemoteSamples
    );
    if (updatedLocalSamples.length) {
      alert({
        message: i18n.t(
          `Some of your records have been verified. Please check your records list.`
        ),
        buttons: [{ text: i18n.t('OK') }],
      });
    }
  }

  savedSamples._init.then(sync);
  // const period = 10 * 1000; // 10s
  const period = 10 * 60 * 1000; // 10mins
  setInterval(sync, period);
}
