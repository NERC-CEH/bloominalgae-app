import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const Info = () => (
  <Page id="info">
    <Header title="What are blue-green algae?" />
    <Main className="ion-padding">
      <Section>
        <P>
          Blue-green algae are a type of bacteria, known as cyanobacteria, which
          can produce toxic chemicals that are very harmful to the health of
          people and animals. These algae naturally occur in all freshwaters,
          especially lakes, reservoirs, canals and slow-moving rivers. They are
          microscopic but, when abundant, grow to be visible small green
          particles or flakes. In calm sunny weather, they can rise to the
          surface and form thin wispy streaks, or thick paint-like scums on the
          water surface if they get very abundant. Shoreline scums and surface
          blooms (see ID guide in app) pose severe health risks, particularly to
          animals that swim or drink the affected water.
        </P>

        <P>
          Blooms of blue-green algae are most commonly seen during summer and
          early autumn months, particularly in calm and sunny weather, but they
          can linger in freshwaters into late autumn. They occasionally occur in
          winter and spring months. Most blooms are green but sometimes
          turquoise blue patches are seen on the water or along shorelines when
          the blooms start to decay. Some blooms are coloured red, dark brown or
          black.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Info;
