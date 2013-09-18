var url = require('url');

module.exports = function (config, next) {
  var url_ = config.url;
  if (url_) {
    var infos = url.parse(url_);

    config.hostname = infos.hostname;
    config.port = (infos.port ? parseInt(infos.port) : 80);
    config.path = infos.pathname == '/' ? '' : infos.pathname;
    if (infos.auth) config.auth = infos.auth;

    delete config.url;
  }

  return next();
};

