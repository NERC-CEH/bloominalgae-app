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
    uploadIfLoggedIn(userModel.attrs.email);

    const listenToUserLogin = () => userModel.attrs.email;
    reaction(listenToUserLogin, uploadIfLoggedIn);
  };

  savedSamples.ready.then(uploadFinishedSurveysAndListenForLogin);
}
