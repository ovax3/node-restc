var contentMeter = function (config, next) {
  var body = config.body;
  var len = body === undefined ? 0 : body.length;
  config.headers['content-length'] = len;

  return next();
};

module.exports = function (handlers, next) {
  handlers.before.push(contentMeter);

  return next();
};


