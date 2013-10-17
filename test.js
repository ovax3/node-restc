var restc = require('./index');

var google = restc(
  {
    url: 'http://www.google.fr'
  },
  require('./plugins/url'),
  require('./plugins/raw'),
  require('./plugins/logger')
);

google.get('/', function (err, res) {
});

