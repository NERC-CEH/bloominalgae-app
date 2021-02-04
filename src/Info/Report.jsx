import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { P } = Section;

const Report = () => (
  <Page id="report">
    <Header title="Further action" />
    <Main className="ion-padding">
      <Section>
        <P>
          The responsibility to manage algal blooms lies with the owner of the
          water concerned. If a bloom is present and no warning signs are
          visible, we recommend you contact the environmental health department
          in your local authority. Environmental health will assess any action
          required against the relevant guidance and may contact the regulatory
          authority (EA, SEPA, NRW, NIEA) for further water tests. You may also
          directly report incidents of algal blooms or water pollution incidents
          to your environment regulatory authority:
        </P>

        <P>
          <ul>
            <li>
              <a href="http://www.sepa.org.uk/contact/">
                Scottish Environment Protection Agency (SEPA)
              </a>
            </li>
            <br />

            <li>
              <a href="https://www.daera-ni.gov.uk/articles/niea-and-water-pollution">
                Northern Ireland Environment Agency (NIEA)
              </a>
            </li>
            <br />

            <li>
              <a href="https://naturalresources.wales/about-us/contact-us/report-it/">
                Natural Resources Wales (NRW)
              </a>
            </li>
            <br />
            <li>
              <a href="http://apps.environment-agency.gov.uk/contact/">
                England: Environment Agency (EA)
              </a>
            </li>
          </ul>
        </P>

        <P>
          For more information and advice on algal blooms see:
          <br />
          <br />
          <a href="https://www.gov.uk/government/publications/algal-blooms-advice-for-the-public-and-landowners">
            England & Wales
          </a>
          <br />
          <br />
          <a href="https://www.gov.scot/publications/cyanobacteria-blue-green-algae-inland-inshore-waters-assessment-minimisation-risks-public-health/">
            Scotland
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Report;
