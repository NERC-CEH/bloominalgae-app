import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const Record = () => (
  <Page id="record">
    <Header title="What do we use your records for?" />
    <Main className="ion-padding">
      <Section>
        <P>
          By recording blue-green algal blooms through this app, we hope to
          rapidly inform local authorities and landowners and speed up the
          erection of public warning signs. We use the data in scientific
          research to get a better understanding of the timing and location of
          algal blooms across the UK, to understand how climate change is
          impacting water quality now, and predicting the future. We also use
          the data to support the UK environment agencies and water companies in
          risk management and prevention.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Record;
