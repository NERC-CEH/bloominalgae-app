import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const MoreInformation = () => (
  <Page id="moreInformation">
    <Header title="Using the app" />
    <Main className="ion-padding">
      <Section>
        <P>
          For more information on using the app, including setting up a
          notification service for records submitted in your area, please see
          the section on “Using the app” on the{' '}
          <a href="https://www.ceh.ac.uk/algal-blooms/bloomin-algae">
            Bloomin’ Algae website
          </a>
          .
        </P>
      </Section>
    </Main>
  </Page>
);

export default MoreInformation;
