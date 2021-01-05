import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const Info = () => (
  <Page id="info">
    <Header title="About B-G Algae" />
    <Main className="ion-padding">
      <Section>
        <P>
          Blue-green algae naturally occur in lakes, ponds, canals, rivers and
          reservoirs around the world. However they can produce toxins that are
          harmful to the health of people and animals. These algae are most
          commonly seen during the summer months, particularly in calm warm
          conditions. They are microscopic but clump together in visible
          colonies up to a few millimetres in size that can rise to the surface
          and form thin wispy blooms or thick paint-like scums if the numbers
          are very large.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Info;
