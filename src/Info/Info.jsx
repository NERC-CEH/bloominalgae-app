import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const Info = () => (
  <Page id="info">
    <Header title="What are blue-green algae?" />
    <Main className="ion-padding">
      <Section>
        <P>
          Blue-green algae are actually a type of bacteria, known as
          cyanobacteria, which produce toxic chemicals that are very harmful to
          the health of people and animals. These algae naturally occur in all
          freshwaters, especially lakes, reservoirs, canals and slow-moving
          rivers. They are microscopic but clump together in visible colonies
          that can rise to the surface and form thin wispy blooms or thick
          paint-like scums on the water surface if they get very abundant.
          Shoreline scums and surface blooms (see ID guide in app) pose severe
          health risks, particularly to animals that swim or drink the water.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Info;
