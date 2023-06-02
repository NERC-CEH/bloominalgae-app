import { AttrPage, RouteWithModels, ModelLocation } from '@flumens';
import config from 'common/config';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import userModel from 'models/user';
import Home from './Home';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';

const baseURL = `/survey/start`;

const { AttrPageFromRoute } = AttrPage;

const HomeWrap = (props: any) => (
  <Home appModel={appModel} userModel={userModel} {...props} />
);

// eslint-disable-next-line
const ModelLocationWrap = ({ sample }: any) => {
  const isInUK = appModel.attrs.country === 'UK';

  return (
    <ModelLocation
      model={sample}
      mapProviderOptions={config.map}
      useGridRef={isInUK}
      useGridMap={isInUK}
      onLocationNameChange={ModelLocation.utils.onLocationNameChange}
      namePlaceholder="Location name e.g. lake, reservoir or pond name"
      onGPSClick={ModelLocation.utils.onGPSClick}
    />
  );
};

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/`, HomeWrap],
  [`${baseURL}/:smpId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/:occId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/location`, ModelLocationWrap],
];

export default RouteWithModels.fromArray(savedSamples, routes);
