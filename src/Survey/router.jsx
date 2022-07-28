import { AttrPage as Attr, RouteWithModels, ModelLocation } from '@flumens';
import appModel from 'models/app';
import userModel from 'models/user';
import config from 'common/config';
import savedSamples from 'models/savedSamples';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';
import Home from './Home';

const baseURL = `/survey/start`;

const HomeWrap = props => (
  <Home appModel={appModel} userModel={userModel} {...props} />
);

// eslint-disable-next-line
const ModelLocationWrap = ({ sample }) => {
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
  [`${baseURL}/:smpId/:attr`, Attr],
  [`${baseURL}/:smpId/:occId/:attr`, Attr],
  [`${baseURL}/:smpId/location`, ModelLocationWrap],
];

export default RouteWithModels.fromArray(savedSamples, routes);
