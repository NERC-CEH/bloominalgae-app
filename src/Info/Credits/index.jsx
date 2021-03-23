import React from 'react';
import { Header, Page, Main, Section } from '@apps';
import cehLogo from './ceh_logo.png';
import './styles.scss';

const { H, P } = Section;

const Credits = () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main className="ion-padding">
      <Section>
        <P>
          The project would like to thank UKCEH, NERC and the Scottish
          Government for funding the app development and staff in the Scottish
          Environment Protection Agency, Health Protection Scotland, Environment
          Agency and Public Health England for their support, advice and
          guidance during the development of the app.
        </P>
        <P>
          We are grateful for all the people that helped to create this app:
        </P>
        <P skipTranslation>
          <ul>
            <li>Laurence Carvalho (UKCEH)</li>
            <li>Anne Dobel (UKCEH)</li>
            <li>Gemma Nash (UKCEH)</li>
            <li>Eleanor Mackay (UKCEH)</li>
            <li>David Roy (UKCEH)</li>
            <li>Philip Taylor (UKCEH)</li>
            <li>Helen Woods (UKCEH)</li>
            <li>Karolis Kazlauskis (Flumens)</li>
            <li>Vilius Stankaitis (Flumens)</li>
            <li>Jan Krokowski (SEPA)</li>
            <li>Jeroen Van Wichelen (INBO)</li>
          </ul>
        </P>
        <P>
          Thanks also to Julia Ferguson for the logo design. Julia can be
          contacted at:
          <br />
          <br />
          <a href="http://www.paintingbiology.com">
            www.paintingbiology.com
            <br />
          </a>{' '}
          <br />
          Twitter: @JuliaFpaintsbio
          <br />
          email: paintingbiology@gmail.com
        </P>
      </Section>

      <H skipTranslation lines="none">
        <a href="https://www.ceh.ac.uk/">
          <img src={cehLogo} alt="sponsor-logo" />
        </a>
      </H>
    </Main>
  </Page>
);

export default Credits;
