module.exports = function (config, next) {
  var data = config.data;
  if (data) {
    config.body = JSON.stringify(data);
  }

  return next();
};

