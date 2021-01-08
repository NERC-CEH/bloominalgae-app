require('dotenv').config({ silent: true });
const webpack = require('webpack');
const checkEnv = require('@flumens/has-env');
const appConfig = require('@flumens/webpack-config');

checkEnv({
  warn: ['APP_MANUAL_TESTING'],
  required: ['APP_SENTRY_KEY', 'APP_MAPBOX_MAP_KEY'],
});

appConfig.plugins.unshift(
  new webpack.DefinePlugin({
    'process.env': {
      APP_BUILD: JSON.stringify(
        process.env.BUILD_NUMBER || process.env.BITRISE_BUILD_NUMBER
      ),
      APP_MAPBOX_MAP_KEY: JSON.stringify(process.env.APP_MAPBOX_MAP_KEY || ''),
      APP_SENTRY_KEY: JSON.stringify(process.env.APP_SENTRY_KEY || ''),
    },
  })
);

module.exports = appConfig;
