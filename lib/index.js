var http = require('http');
var process = require('./process');

var noop = function () {};

var Client = function (defaults, plugins) {
  this.defaults = defaults || {};
  this.defaults.headers = this.defaults.headers || {};

  this.handlers = { setup: [], before: [], after: [] };
  process(this.handlers, plugins, noop);

  process(this.defaults, this.handlers.setup, noop);
};

Client.prototype.post = function (path, data, callback) {
  return this.request({ method: 'POST', path: path, data: data }, callback);
};

Client.prototype.put = function (path, data, callback) {
  return this.request({ method: 'PUT', data: data, path: path }, callback);
};

Client.prototype.get = function (path, callback) {
  return this.request({ method: 'GET', path: path }, callback);
};

Client.prototype.del = function (path, callback) {
  return this.request({ method: 'DELETE', path: path }, callback);
};

Client.prototype.request = function (config, callback) { var self = this;
  config.path = this.defaults.path + config.path;
  config.headers = config.headers || {};
  for (var k in this.defaults.headers) {
    if (!config.headers.hasOwnProperty(k)) config.headers[k] = this.defaults.headers[k];
  };
  config.__proto__ = this.defaults;
  process(config, this.handlers.before, function (err) {
    if (err) return callback(err);

    var req = http.request(config, function(res) {
      res.config = config;
      res.req = req;
      res.setEncoding('utf8');
      var body = '';
      res.on('data', function (chunck) {
        body += chunck;
      });
      res.on('end', function () {
        res.body = body;
        process(res, self.handlers.after, function (err) {
          if (err) return callback(err);

          return callback(null, res);
        });
      });
    });

    req.on('error', function (err) {
      return callback(err);
    });

    if (config.body) {
      req.write(config.body);
    }
    req.end();
  });
};

module.exports = function (defaults) {
  var plugins = Array.prototype.slice.call(arguments);
  plugins.shift();

  return new Client(defaults, plugins);
};

