RestC
=====

Install
-------

    npm install restc

Usage
-----

    var client = restc({ port: 1337 },
      pluginA,
      pluginB,
      pluginC
    );

    client.get('/foo', function (err, req, res, data) {
      /* ... */
    });

Plugin Structure
----------------

* `setup` : invoked once when initializing a client to shape the default request options
* `before` : invoked before issuing a request
* `after` : invoked after a response has been received

example

    {
      setup: function (options, next) { /* ... */ },
      before: function (options, next) { /* ... */ },
      after: function (req, res, next) { /* ... */ }
    }

Available Plugins
-----------------

* [restc-url](https://github.com/ovmjm/node-restc-url)
* [restc-log](https://github.com/ovmjm/node-restc-log)
* [restc-json](https://github.com/ovmjm/node-restc-json)

