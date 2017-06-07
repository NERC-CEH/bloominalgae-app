/** ****************************************************************************
 * Main app configuration file.
 *****************************************************************************/
import $ from 'jquery';
import Indicia from 'indicia';
import DateHelp from 'helpers/date';
import LocHelp from 'helpers/location';

const HOST = 'https://www.brc.ac.uk/irecord/';

const CONFIG = {
  // variables replaced on build
  /* global APP_VERSION, APP_BUILD, APP_NAME, REGISTER_URL, API_KEY, API_SECRET,
   REPORT_URL, STATISTICS_URL, RECORD_URL, APP_SECRET */
  version: APP_VERSION,
  build: APP_BUILD,
  name: APP_NAME,

  gps_accuracy_limit: 100,

  site_url: HOST,

  // logging
  log: true,

  // google analytics
  ga: {
    status: true,
    ID: 'UA-58378803-10',
  },

  // error analytics
  sentry: {
    key: 'e21406f3ee734ca0a27fc5e48c68903b',
    project: '152363',
  },

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER + Indicia.API_REPORTS_PATH}`,
    timeout: 80000,
  },

  // mapping
  map: {
    os_api_key: '28994B5673A86451E0530C6CA40A91A5',
    mapbox_api_key: 'pk.eyJ1IjoiY2VoYXBwcyIsImEiOiJjaXBxdTZyOWYwMDZoaWVuYjI3Y3Z0a2x5In0.YXrZA_DgWCdjyE0vnTCrmw',
    mapbox_osm_id: 'cehapps.0fenl1fe',
    mapbox_satellite_id: 'cehapps.0femh3mh',
  },

  // indicia configuration
  indicia: {
    host: HOST,
    api_key: API_KEY,
    website_id: 23,
    survey_id: 445,
    input_form: 'enter-app-record',

    sample: {
      location: {
        values(location, submission) {
          // convert accuracy for map and gridref sources
          let accuracy = location.accuracy;
          if (location.source !== 'gps') {
            if (location.source === 'map') {
              accuracy = LocHelp.mapZoom2meters(location.accuracy);
            } else {
              accuracy = null;
            }
          }

          const attributes = {};
          const keys = CONFIG.indicia.sample;
          attributes.location_name = location.name; // this is a native indicia attr
          attributes[keys.location_source.id] = location.source;
          attributes[keys.location_gridref.id] = location.gridref;
          attributes[keys.location_altitude.id] = location.altitude;
          attributes[keys.location_altitude_accuracy.id] = location.altitudeAccuracy;
          attributes[keys.location_accuracy.id] = accuracy;

          // add other location related attributes
          $.extend(submission.fields, attributes);

          return `${location.latitude}, ${location.longitude}`;
        },
      },
      location_accuracy: { id: 282 },
      location_altitude: { id: 283 },
      location_altitude_accuracy: { id: 284 },
      location_source: { id: 760 },
      location_gridref: { id: 335 },

      device: {
        id: 273,
        values: {
          iOS: 2398,
          Android: 2399,
        },
      },

      device_version: { id: 759 },

      date: {
        values(date) {
          return DateHelp.print(date);
        },
      },
      size: {
        id: 1014,
        default: 'Doormat',
        values: {
          Doormat: 10634,
          'Parking space': 10635,
          'Tennis court': 10636,
          'Even bigger': 10637,
        },
      },
      activities: {
        id: 1016,
        id_user: 1015,
        values(value, submission) {
          const that = this;
          let values = [];

          // personal
          value.personal.forEach((option) => {
            values.push(that._values[option]);
          });
          submission.fields[that.id_user] = values; // eslint-disable-line

          // others
          values = [];
          value.others.forEach((option) => {
            values.push(that._values[option]);
          });
          return values;
        },
        _values: {
          'Walking / Running': 10638,
          'Dog-walking': 10639,
          Cycling: 10640,
          Birdwatching: 10641,
          Fishing: 10642,
          Swimming: 10643,
          'Boats / Watersports': 10644,
          Other: 10645,
        },
      },
    },
    occurrence: {
      training: {
        id: 'training',
      },
      taxon: {
        values() {
          return 400349; // Cyanobacteria
        },
      },
    },
  },
};

export default CONFIG;
