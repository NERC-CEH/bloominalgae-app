import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Page, Main } from '@apps';
import { IonList, IonIcon } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import languages from 'common/config/languages';
import appModel from 'appModel';
import backgroundImage from './backgroundImage.jpg';
import LanguageButton from './Component/LanguageButton';

import './styles.scss';

const alphabetically = (lng1, lng2) => lng1.label.localeCompare(lng2.label);

const showData = language => (
  <LanguageButton key={language.flag} language={language} appModel={appModel} />
);

const languagesOptions = () => languages.sort(alphabetically).map(showData);

function LanguageSelect({ children }) {
  if (appModel.attrs.language) {
    return children;
  }

  return (
    <Page id="language-select">
      <div className="header">
        <IonIcon icon={globeOutline} />
      </div>

      <Main>
        <img
          className="background-image"
          src={backgroundImage}
          alt="background"
        />

        <div className="language-select-container">
          <div className="list-container">
            <IonList>{languagesOptions()}</IonList>
          </div>
        </div>
      </Main>
    </Page>
  );
}

LanguageSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default observer(LanguageSelect);
