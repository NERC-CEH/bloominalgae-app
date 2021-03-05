import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const Record = () => (
  <Page id="record">
    <Header title="What do we use your records for?" />
    <Main className="ion-padding">
      <Section>
        <P>
          <ul>
            <li>
              Informing local authorities and landowners to help speed up the
              erection of public warning signs.
            </li>
            <br />
            <li>
              We use the data in scientific research to get a better
              understanding of the timing and location of algal blooms, to
              understand how climate change is impacting water quality now, and
              to predict future impacts.
            </li>
            <br />

            <li>
              We also use the data to support environment agencies and water
              companies in water quality risk management and prevention.
            </li>
          </ul>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Record;
