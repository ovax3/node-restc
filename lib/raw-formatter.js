module.exports = function (config, next) {
  if (config.body === undefined) {
    config.body = config.data;
  }

  return next();
};

