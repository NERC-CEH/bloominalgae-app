import { Trans as T } from 'react-i18next';
import { Page, Main, Header, Section, TLink } from '@flumens';
import './styles.scss';

const { P } = Section;

const About = () => (
  <Page id="about">
    <Header title="About Bloomin’ Algae" />
    <Main className="ion-padding">
      <Section>
        <P skipTranslation>
          <T components={{ url: <TLink /> }}>
            Bloomin’ Algae is a Citizen Science app for reporting the presence
            of harmful algal blooms of blue-green algae (also known as
            cyanobacteria). The records you send in help speed up warnings to
            minimise risks to public and animal health. You will receive
            feedback on the records you submit which can help you learn how to
            recognise the risks to you and pets.
          </T>
        </P>

        <P>
          As well as submitting a photo and location details, we ask you to
          confirm what general activities you, or others, are carrying out in,
          or around, the water (such as dog walking). This is because blue-green
          algae pose a greater risk to water-based activities, such as swimming
          or windsurfing, compared to non-contact activities such as walking.
          Blue-green algae can pose a very high risk to pets and livestock. By
          gathering details of activities undertaken we hope to gain a better
          understanding of how harmful algal blooms are impacting recreational
          use of freshwaters.
        </P>

        <P>
          When you submit a record the data is stored within the{' '}
          <a href="https://irecord.org.uk">iRecord website</a>, where it will be
          displayed to users and be examined and verified by an expert. Only
          your records are available publically, not your contact details. These
          records may be collated and disseminated for education, scientific
          research and other public benefit uses but contact details will not be
          shared.
        </P>

        <P>
          <a href="https://irecord.org.uk/privacy-notice">Privacy policy</a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
