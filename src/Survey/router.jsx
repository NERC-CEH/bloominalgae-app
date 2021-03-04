import React from 'react';
import { AttrPage as Attr, RouteWithModels, ModelLocation } from '@apps';
import appModel from 'appModel';
import userModel from 'userModel';
import config from 'config';
import savedSamples from 'savedSamples';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';
import Home from './Home';

const baseURL = `/survey/start`;

const HomeWrap = props => (
  <Home appModel={appModel} userModel={userModel} {...props} />
);

const ModelLocationWrap = props => (
  <ModelLocation
    mapProviderOptions={config.map}
    useGridRef
    useGridMap
    onLocationNameChange={ModelLocation.utils.onLocationNameChange}
    placeholder="Location name e.g. lake, reservoir or pond name"
    onGPSClick={ModelLocation.utils.onGPSClick}
    {...props}
  />
);

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/`, HomeWrap],
  [`${baseURL}/:smpId/:attr`, Attr],
  [`${baseURL}/:smpId/location`, ModelLocationWrap],
];

export default RouteWithModels.fromArray(savedSamples, routes);
