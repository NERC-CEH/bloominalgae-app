import React from 'react';
import { Page, Main, Header, Section } from '@apps';

const { H, P } = Section;

const Report = () => (
  <Page id="report">
    <Header title="Report" />
    <Main className="ion-padding">
      <Section>
        <H>Further action</H>
        <P>
          The responsibility to manage algal blooms lies with the owner of the
          water concerned. However, for enquiries relating to Blue-Green Algae
          (cyanobacteria), please contact the Environmental Health department in
          your local authority. Environmental Health will assess any action
          required against the relevant guidance and may contact the regulatory
          authority (EA, SEPA, NRW, EANI) for further water tests. You may also
          report incidents of algal blooms or water pollution incidents to your
          environment regulatory authority.
        </P>

        <H>Reporting algal blooms and water pollution incidents</H>

        <P>
          <a href="http://www.sepa.org.uk/contact/">
            Scottish Environment Protection Agency (SEPA)
          </a>
          <a href="https://www.daera-ni.gov.uk/articles/niea-and-water-pollution">
            Northern Ireland Environment Agency
          </a>
          <a href="https://naturalresources.wales/about-us/contact-us/report-it/">
            Natural Resources Wales
          </a>
          <a href="http://apps.environment-agency.gov.uk/contact/">
            England: Environment Agency (EA)
          </a>
          <a href="http://www.gov.scot/Resource/0039/00391470.pdf">
            Scottish Government Guidance (based on World Health Authority
            guidance)
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Report;
