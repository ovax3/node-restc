RestC
=====

Install
-------

    npm install restc

Usage
-----

    var client = restc({ port: 1337 },
      {
        before: function (options, next) {
          /* ... */
          return next();
        },
        after: function (req, res, next) {
          /* ... */
          return next();
        }
      },
      /* other plugins */
    );

    client.get('/foo', function (err, req, res, data) {
      /* ... */
    });

Available Plugins
-----------------

* [restc-url](https://github.com/ovmjm/node-restc-url)
* [restc-log](https://github.com/ovmjm/node-restc-log)
* [restc-json](https://github.com/ovmjm/node-restc-json)

