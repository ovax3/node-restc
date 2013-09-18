var formatter = function (config, next) {
  var data = config.data;
  if (data) {
    config.body = JSON.stringify(data);
  }

  return next();
};

var parser = function (res, next) {
  var body = res.body;
  if (body) {
    try {
      res.data = JSON.parse(res.body);
    } catch (e) { }
  }
  if (res.data == undefined) {
    res.data = res.body;
  }

  return next();
};

module.exports = function (handlers, next) {
  handlers.before.push(formatter);
  handlers.after.push(parser);

  return next();
};

