import axios from 'axios';
import i18n from 'i18next';
import { alert } from '@apps';

export default function init(savedSamples, userModel) {
  async function _fetchUpdatedSamples() {
    const options = {
      params: {
        survey: 'bloominAlgae',
        report: 'appUser',
        userID: userModel.attrs.indiciaUserId,
      },
    };

    const req = await axios.get(
      'https://eip.ceh.ac.uk/hydrology-ukscape/bloominAlgae',
      // 'http://localhost:3000/data',
      options
    );

    const response = req.data || { data: {} };

    const updatedSamples = [];

    if (response.data.length <= 0) {
      return updatedSamples;
    }

    const normalizedResponse = {};
    const normalizeResponse = ({ id, ...rest }) => {
      normalizedResponse[id] = { ...rest };
    };
    response.data.forEach(normalizeResponse);

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

  async function syncRemoteSamples() {
    if (!userModel.attrs.indiciaUserId) {
      return;
    }

    console.log('SavedSamples: pulling remote surveys');

    const updatedSamples = await _fetchUpdatedSamples();
    if (updatedSamples.length) {
      alert({
        message: i18n.t(
          `Some of your records have been verified. Please check your records list.`
        ),
        buttons: [{ text: i18n.t('OK') }],
      });
    }
  }

  savedSamples._init.then(syncRemoteSamples);
  const period = 10 * 60 * 1000; // 10mins
  setInterval(syncRemoteSamples, period);
}