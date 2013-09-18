module.exports = function (config, next) {
  var body = config.body;
  var len = body === undefined ? 0 : body.length;
  config.headers['content-length'] = len;

  return next();
};

