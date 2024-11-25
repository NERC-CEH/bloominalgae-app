import { AttrPage, RouteWithModels } from '@flumens';
import savedSamples from 'models/collections/samples';
import Home from './Home';
import Location from './Location';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';

const baseURL = `/survey/${survey.name}`;

const { AttrPageFromRoute } = AttrPage;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/`, Home],
  [`${baseURL}/:smpId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/:occId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/location`, Location],
];

export default RouteWithModels.fromArray(savedSamples, routes);
