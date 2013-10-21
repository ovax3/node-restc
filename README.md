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

