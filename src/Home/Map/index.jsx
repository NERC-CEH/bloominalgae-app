import React from 'react';
import Header from 'Components/Header';
import { observer } from 'mobx-react';
import { Page } from '@apps';
import Main from './Main';
import './styles.scss';

@observer
class Container extends React.Component {
  render() {
    return (
      <Page id="home-map">
        <Header title="All Records" styleId="none" />
        <Main />
      </Page>
    );
  }
}

export default Container;
