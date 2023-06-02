import { FC } from 'react';
import { observer } from 'mobx-react';
import { AppModel } from 'models/app';
import OnboardingScreens from './OnBoardingScreens';

interface Props {
  appModel: AppModel;
}

const onBoardingScreens: FC<Props> = ({ appModel, children }) => {
  const { showedWelcome } = appModel.attrs;

  if (showedWelcome) {
    return <>{children}</>;
  }

  function onExit() {
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }

  return <OnboardingScreens onExit={onExit} />;
};

export default observer(onBoardingScreens);
