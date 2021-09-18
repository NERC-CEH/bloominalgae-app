import { Filesystem, Directory } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';

const isTestEnv = process.env.NODE_ENV === 'test';

const backendUrl =
  process.env.APP_BACKEND_URL || 'https://www.brc.ac.uk/irecord';

const indiciaUrl =
  process.env.APP_BACKEND_INDICIA_URL || 'https://warehouse1.indicia.org.uk';

const CONFIG = {
  environment: process.env.NODE_ENV,
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,

  log: !isTestEnv,

  sentryDNS: !isTestEnv && process.env.APP_SENTRY_KEY,

  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY,
    mapboxOsmId: 'cehapps/ckghr3uxz01xb19udplq7wi6x',
    mapboxSatelliteId: 'cehapps/cipqvo0c0000jcknge1z28ejp',
  },

  backend: {
    url: backendUrl,
    mediaUrl: `${indiciaUrl}/upload/`,
    apiKey: process.env.APP_INDICIA_API_KEY,
  },
};

(async function getMediaDirectory() {
  if (isPlatform('hybrid')) {
    const { uri } = await Filesystem.getUri({
      path: '',
      directory: Directory.Data,
    });
    CONFIG.dataPath = uri;
  }
})();

export default CONFIG;
