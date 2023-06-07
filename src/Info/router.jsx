import { Route } from 'react-router-dom';
import About from './About';
import BRC from './BRC';
import Credits from './Credits';
import Info from './Info';
import MoreInformation from './MoreInformation';
import Record from './Record';
import Report from './Report';
import Risks from './Risks';

export default [
  <Route path="/info/about" key="/info/about" exact component={About} />,
  <Route
    path="/info/more-information"
    key="/info/more-information"
    exact
    component={MoreInformation}
  />,
  <Route
    path="/info/record-usage"
    key="/info/record-usage"
    exact
    component={Record}
  />,
  <Route path="/info/info" key="/info/info" exact component={Info} />,
  <Route path="/info/risks" key="/info/risks" exact component={Risks} />,
  <Route path="/info/report" key="/info/report" exact component={Report} />,
  <Route
    path="/info/brc-approved"
    key="/info/brc-approved"
    exact
    component={BRC}
  />,
  <Route path="/info/credits" key="/info/credits" exact component={Credits} />,
];
