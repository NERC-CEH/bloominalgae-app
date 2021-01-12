import React from 'react';
import { Header, Page, Main, Section } from '@apps';
import sponsorLogo from './sponsorLogo.png';
import './styles.scss';

const { H, P } = Section;

const Credits = () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main className="ion-padding">
      <Section>
        <H skipTranslation>
          <img src={sponsorLogo} alt="sponsor-logo" />
        </H>
        <P>
          We are grateful for all the people that helped to create this app:
        </P>
        <P skipTranslation>
          <ul>
            <li>Laurence Carvalho (CEH)</li>
            <li>Karolis Kazlauskis (Flumens)</li>
            <li>Vilius Stankaitis (Flumens)</li>
            <li>Phil Taylor (CEH)</li>
            <li>Helen Woods (CEH)</li>
          </ul>
        </P>
        <P>
          <ul>
            <li>
              Thanks to Julia Ferguson for the logo design. Julia can be
              contacted at: www.paintingbiology.com Twitter: @JuliaFpaintsbio
              email: paintingbiology@gmail.com
            </li>
          </ul>
        </P>
        <P>
          The project would like to thank staff in the Environment Agency,
          Scottish Environment Protection Agency, Public Health England & Health
          Protection Scotland for their support, advice and guidance during the
          development of this app.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Credits;
