import { reaction } from 'mobx';

export default function init(savedSamples, userModel) {
  function uploadAllFinished() {
    console.log('SavedSamples: uploading all surveys');

    const uploadIfFinished = sample => {
      const isAlreadyUploaded = !!sample.id;
      if (isAlreadyUploaded || !sample.metadata.saved) {
        return;
      }
      const invalids = sample.validateRemote();
      if (invalids) {
        return;
      }
      sample.saveRemote();
    };
    savedSamples.forEach(uploadIfFinished);
  }

  const uploadFinishedSurveysAndListenForLogin = () => {
    const uploadIfLoggedIn = isLoggedIn => isLoggedIn && uploadAllFinished();
    uploadIfLoggedIn(userModel.attrs.id);

    const listenToUserLogin = () => userModel.attrs.id;
    reaction(listenToUserLogin, uploadIfLoggedIn);
  };

  savedSamples._init.then(uploadFinishedSurveysAndListenForLogin);
}