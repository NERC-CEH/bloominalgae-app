import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const OccurOfAlgae = () => (
  <Page id="occurOfAlgae">
    <Header title="When do they occur?" />
    <Main className="ion-padding">
      <Section>
        <P>
          Blooms of blue-green algae are most commonly seen during summer
          months, particularly in calm and sunny conditions, but they can linger
          in freshwaters into the autumn. They occasionally occur in winter and
          spring months.
        </P>
      </Section>
    </Main>
  </Page>
);

export default OccurOfAlgae;
