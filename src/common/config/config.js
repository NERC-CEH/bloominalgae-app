const CONFIG = {
  environment: __ENV__,
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,

  log: !__TEST__,

  sentryDNS: !__TEST__ && process.env.APP_SENTRY_KEY,

  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY,
    mapboxOsmId: 'cehapps/ckghr3uxz01xb19udplq7wi6x',
    mapboxSatelliteId: 'cehapps/cipqvo0c0000jcknge1z28ejp',
  },
};

export default CONFIG;
