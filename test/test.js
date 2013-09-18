var restc = require('../lib/index');

var google = restc({
  defaults: {
    url: 'http://www.google.fr',
    headers: {
    }
  },
  setup: [
    require('../lib/url-parser')
  ],
  before: [
    require('../lib/request-logger'),
    require('../lib/raw-formatter')
  ],
  after: [
    require('../lib/raw-parser'),
    require('../lib/response-logger')
  ]
});

google.get('/', function (err, res) {
});

