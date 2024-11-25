import { observer } from 'mobx-react';
import { prettyPrintLocation } from '@flumens';
import { IonSpinner } from '@ionic/react';
import Sample from 'common/models/sample';
import './styles.scss';

function getValue(sample: Sample) {
  if (sample.isGPSRunning()) {
    return <IonSpinner />;
  }

  return prettyPrintLocation(sample.attrs.location);
}

type Props = {
  sample: Sample;
};

function GridRefValue({ sample }: Props) {
  const value = getValue(sample);

  return <div className="gridref-label">{value}</div>;
}

export default observer(GridRefValue);
