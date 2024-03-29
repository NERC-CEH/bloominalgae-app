import { Trans as T } from 'react-i18next';
import { Page, Main, Header, Section, TLink } from '@flumens';
import appModel from 'models/app';
import './styles.scss';

const { P } = Section;

const getOrganizationsLinkByLanguage = () => {
  const isInNorway = appModel.attrs.country === 'NO';
  // TODO: make country specific
  const isLanguageFrenchBelgium = appModel.attrs.language === 'fr-BE';
  const isLanguageFrenchLux = appModel.attrs.language === 'fr-LU';
  const isLanguageDutch = appModel.attrs.language === 'nl-NL';

  if (isLanguageDutch) {
    return (
      <>
        <li>
          <a href="https://www.vmm.be/water/kwaliteit-waterlopen/blauwalgen">
            Vlaanderen
          </a>
        </li>

        <li>
          <a href="https://environnement.brussels/thematiques/eau/leau-bruxelles/etangs-et-cours-deau/les-algues-bleues-cyanobacteries">
            Brussel
          </a>
        </li>

        <li>
          <a href="http://environnement.sante.wallonie.be/home/slide/les-sites-de-baignade-wallons-sous-haute-surveillance-bacteriologique.html">
            Wallonië
          </a>
        </li>

        <li>
          <a href="https://www.wur.nl/nl/Dossiers/dossier/Blauwalg.htm">
            Nederland
          </a>
        </li>
      </>
    );
  }

  if (isLanguageFrenchLux) {
    return (
      <>
        <li>
          <a href="https://eau.gouvernement.lu/fr/services-aux-citoyens/eauxbaignade.html">
            Administration de la Gestion de l’Eau
          </a>
          <div>Email : baignade@eau.etat.lu</div>
        </li>

        <li>
          <a href="https://cyanowatch.lu">
            Luxembourg Institute for Science and Technology (LIST) Surveillance
            des cyanobactéries
          </a>
          <div>Email: baignade@list.lu</div>
        </li>
      </>
    );
  }

  if (isLanguageFrenchBelgium) {
    return (
      <>
        <li>
          <a href="http://environnement.sante.wallonie.be/home/slide/les-sites-de-baignade-wallons-sous-haute-surveillance-bacteriologique.html">
            Wallonie
          </a>
        </li>

        <li>
          <a href="https://environnement.brussels/thematiques/eau/leau-bruxelles/etangs-et-cours-deau/les-algues-bleues-cyanobacteries">
            Bruxelles
          </a>
        </li>

        <li>
          <a href="https://www.vmm.be/water/kwaliteit-waterlopen/blauwalgen">
            Flandres
          </a>
        </li>

        <li>
          <a href="https://www.wur.nl/nl/Dossiers/dossier/Blauwalg.htm">
            Pays-Bas
          </a>
        </li>
      </>
    );
  }

  if (isInNorway) {
    return (
      <>
        <li>
          <a href="https://www.niva.no/forskning/ferskvannsokologi/cyanobakterier">
            NIVA
          </a>
        </li>
        <li>
          <a href="https://www.fhi.no/ml/badevann/algeoppblomstring-i-vann">
            Folkehelseinstituttet
          </a>
        </li>
        <li>
          <a href="https://www.vetinst.no/sykdom-og-agens/cyanotoksiner-mikrocystiner">
            Veterinærinstituttet
          </a>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <a href="http://www.sepa.org.uk/contact/">
          Scottish Environment Protection Agency (SEPA)
        </a>
      </li>

      <li>
        <a href="https://www.daera-ni.gov.uk/articles/niea-and-water-pollution">
          Northern Ireland Environment Agency (NIEA)
        </a>
      </li>

      <li>
        <a href="https://naturalresources.wales/about-us/contact-us/report-an-environmental-incident/?lang=en">
          Natural Resources Wales (NRW)
        </a>
      </li>

      <li>
        <a href="http://apps.environment-agency.gov.uk/contact/">
          England: Environment Agency (EA)
        </a>
      </li>
    </>
  );
};

const Report = () => (
  <Page id="report">
    <Header title="Further action" />
    <Main className="ion-padding">
      <Section>
        <P skipTranslation>
          <T components={{ url: <TLink /> }}>
            The responsibility to manage algal blooms lies with the owner of the
            water concerned. If a bloom is present and no warning signs are
            visible, we recommend you contact the environmental health
            department in your local authority. Environmental health will assess
            any action required against the relevant guidance and may contact
            the regulatory authority (EA, SEPA, NRW, NIEA) for further water
            tests. You may also directly report incidents of algal blooms or
            water pollution incidents to your environment regulatory authority:
          </T>
        </P>

        <P skipTranslation>
          <ul>{getOrganizationsLinkByLanguage()}</ul>
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
