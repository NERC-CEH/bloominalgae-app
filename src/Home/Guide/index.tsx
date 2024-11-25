import { informationCircle } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Page, InfoMessage } from '@flumens';
import { IonItemDivider, IonContent, IonIcon } from '@ionic/react';
import Header from 'Components/Header';
import Card from './Component/Card';
import img1 from './images/image1.jpg';
import img2 from './images/image2.jpg';
import img3 from './images/image3.jpg';
import img4 from './images/image4.jpg';
import img5 from './images/image5.jpg';
import img6 from './images/image6.jpg';
import img7 from './images/image7.jpg';
import img8 from './images/image8.jpg';
import './styles.scss';

const bgCards = [
  {
    text: 'Usually green or blue-green in colour',
    image: img1,
  },
  {
    text: 'Form paint-like surface scums often along shorelines',
    image: img2,
  },
  {
    text: 'Tiny irregular-shaped clumps (less than 3 mm) suspended in water. May be small and round or tiny grass like flakes',
    image: img3,
  },
  {
    text: 'Turquoise colour sometimes visible when decaying',
    image: img4,
  },
];

const nonBgCards = [
  {
    text: 'Plants that float but have solid structure such as leaves',
    image: img5,
  },
  {
    text: 'Others are long and tubular the size of a little finger',
    image: img6,
  },
  {
    text: 'Some have very stringy, long hair-like strands',
    image: img7,
  },
  {
    text: 'Or fine green hairs attached to rocks and pebbles',
    image: img8,
  },
];

const getCards = (data: any) => {
  const showCards = (card: any) => <Card key={card.text} card={card} />;

  return data.map(showCards);
};

function Guide() {
  return (
    <Page id="guide">
      <Header title="Identify" styleId="none" />
      <IonContent>
        <InfoMessage
          prefix={<IonIcon src={informationCircle} className="size-6" />}
          color="tertiary"
          className="m-2"
        >
          If you are still not sure after looking at this guide please submit
          the record anyway
        </InfoMessage>

        <IonItemDivider>
          <T>Examples of blue-green algae blooms</T>
        </IonItemDivider>

        {getCards(bgCards)}

        <IonItemDivider>
          <T>Not blue-green algae - duckweed and harmless green algae</T>
        </IonItemDivider>

        {getCards(nonBgCards)}
      </IonContent>
    </Page>
  );
}

export default Guide;
