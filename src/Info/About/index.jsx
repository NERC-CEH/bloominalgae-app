import React from 'react';
import { Page, Main, Header, Section } from '@apps';
import './styles.scss';

const { P } = Section;

const About = () => (
  <Page id="about">
    <Header title="About" />
    <Main className="ion-padding">
      <Section>
        <P>
          Both the Environment Agency (EA) and the Scottish Environment
          Protection Agency (SEPA) provide a blue-green algae analytical service
          and advice to local authorities, water body owners, managers etc.
          However there is no routine national algal bloom monitoring system,
          and so records of past bloom events are patchy. By recording
          blue-green algal blooms through this app, we hope to get a better
          overall picture of the timing and location of algal blooms across the
          UK, to help inform local authorities and relevant health agencies of
          potential public health risks and aid the EA & SEPA in bloom
          management and prevention in the future.
        </P>

        <P>
          The app also asks you for details of what activities you are carrying
          out in or around the water, as blue-green algal blooms pose a greater
          risk to water-based activities, such as swimming or windsurfing,
          compared to non-contact activities such as walking. By gathering
          details of activities undertaken we hope to gain a better
          understanding of how algal blooms are impacting recreational use of
          freshwaters in the UK.
        </P>

        <P>
          When you submit a record the data is stored within the iRecord
          website, where it will be displayed to users and be examined and
          verified by an expert. Only your records are available publically, not
          your contact details. These records may be collated and disseminated
          for environmental decision-making, education, scientific research and
          other public benefit uses. Many thanks for taking part!
        </P>

        <P>
          For more information and advice on algal blooms see:
          <br />
          <br />
          <a href="http://www.gov.uk/government/publications/algal-blooms-advice-for-the-public-and-landowners">
            England & Wales
          </a>
          <br />
          <br />
          <a href="http://www.gov.scot/Resource/0039/00391470.pdf">Scotland</a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
