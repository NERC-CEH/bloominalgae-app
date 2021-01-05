import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Info from './Info';
import Credits from './Credits';
import Risks from './Risks';
import Report from './Report';
import BRC from './BRC';

export default [
  <Route path="/info/about" key="/info/about" exact component={About} />,
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
