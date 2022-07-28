import { InfoBackgroundMessage } from '@flumens';
import appModel from 'models/app';

export default props => (
  <InfoBackgroundMessage appModel={appModel} {...props} />
);
