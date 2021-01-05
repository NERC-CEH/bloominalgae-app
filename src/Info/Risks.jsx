import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const Risks = () => (
  <Page id="risks">
    <Header title="Risks" />
    <Main className="ion-padding">
      <Section>
        <P>
          Blue-Green algae (also known as Cyanobacteria) can be harmful to the
          health of people and animals. Do NOT touch or ingest anything you
          suspect to be a bloom and do not allow pets or children to come into
          contact with, or swallow, the water
        </P>
      </Section>
    </Main>
  </Page>
);

export default Risks;
