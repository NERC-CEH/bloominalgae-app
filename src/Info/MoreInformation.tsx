import { Trans as T } from 'react-i18next';
import { Page, Main, Header, Section } from '@flumens';

const { P } = Section;

const MoreInformation = () => (
  <Page id="moreInformation">
    <Header title="Using the app" />
    <Main className="ion-padding">
      <Section>
        <P skipTranslation>
          <T>
            For more information on using the app, including setting up a
            notification service for records submitted in your area, please see
            the section on “Using the app” on the{' '}
            <a href="https://www.ceh.ac.uk/our-science/projects/bloomin-algae">
              Bloomin’ Algae website
            </a>
            .
          </T>
        </P>
      </Section>
    </Main>
  </Page>
);

export default MoreInformation;
