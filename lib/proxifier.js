module.exports = function (config, next) {
  var proxy = config.proxy;
  if (proxy) {
    config.headers['Host'] = config.hostname;
    config.hostname = proxy.hostname;
    config.port = proxy.port;

    if (proxy.login && proxy.password) {
      var auth = new Buffer(proxy.login + ':' + proxy.password).toString('base64');
      config.headers['Proxy-Authorization'] = 'Basic ' + auth;
    }

    delete config.proxy;
  }

  return next();
};

