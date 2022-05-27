import React from 'react';
import { Page, Main, Header, Section } from '@apps';
import appModel from 'appModel';

const { P } = Section;

const Risks = () => {
  const isInNorway = appModel.attrs.country === 'NO';

  return (
    <Page id="risks">
      <Header title="Health risks" />
      <Main className="ion-padding">
        <Section>
          <P>
            Blue-Green algae (also known as cyanobacteria) can be harmful to the
            health of people and animals. Do NOT touch or ingest anything you
            suspect to be a bloom and do not allow pets or children to come into
            contact with, or swallow, the water.
          </P>

          <P>
            The toxins that blue-green algae produce can result in a range of
            health effects in people and animals. They cause skin rashes and
            much more severe symptoms if swallowed (fever, vomiting, liver
            damage).
          </P>

          <P>
            Dogs are especially at risk if they drink contaminated water, or
            lick their coat after swimming, with severe symptoms requiring very
            rapid vet treatment to avoid death. Blue-green algae have also
            caused the deaths of horses, cattle, birds and fish.
          </P>

          <P>
            If you are a pet owner you can find further information from the{' '}
            <a
              href={
                isInNorway
                  ? 'https://www.vetinst.no'
                  : 'https://www.bluecross.org.uk/pet-advice/blue-green-algae-and-its-dangers-dogs'
              }
            >
              Blue Cross
            </a>
            .
          </P>

          <P>
            <b>
              If you, or your pet, become unwell after contact with water that
              may be contaminated with blue-green algae, we’d recommend you seek
              immediate medical or veterinary advice.
            </b>
          </P>
        </Section>
      </Main>
    </Page>
  );
};

export default Risks;
