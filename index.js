var http = require('http');
var process = require('./process');

var noop = function () {};

var Client = function (defaults, plugins) {
  this.defaults = defaults || { };
  this.defaults.path = this.defaults.path || '';
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

Client.prototype.request = function (options, callback) { var self = this;
  options.path = this.defaults.path + options.path;
  options.headers = options.headers || {};
  for (var k in this.defaults.headers) {
    if (!options.headers.hasOwnProperty(k)) options.headers[k] = this.defaults.headers[k];
  };
  options.__proto__ = this.defaults;
  process(options, this.handlers.before, function (err) {
    if (err) return callback(err);

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      var body = '';
      res.on('data', function (chunck) {
        body += chunck;
      });
      res.on('end', function () {
        res.body = body;
        process(res, self.handlers.after, function (err) {
          if (err) return callback(err);

          return callback(null, req, res);
        });
      });
    });

    req.on('error', function (err) {
      return callback(err);
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
};

module.exports = function (defaults) {
  var plugins = Array.prototype.slice.call(arguments);
  plugins.shift();

  return new Client(defaults, plugins);
};

