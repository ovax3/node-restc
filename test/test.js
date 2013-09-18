var restc = require('../lib/index');

var google = restc(
  {
    url: 'http://www.google.fr'
  },
  require('../lib/url'),
  require('../lib/raw'),
  require('../lib/logger')
);

google.get('/', function (err, res) {
});

