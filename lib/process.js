var process = function (obj, processors, callback, i) {
  if (i == processors.length) return callback(null);

  var processor = processors[i];

  var next = function (err) {
    if (err) return callback(err);

    process(obj, processors, callback, i + 1);
  };

  processor(obj, next);
};

module.exports = function (obj, processors, callback) {
  if (!processors) return callback(null);

  return process(obj, processors, callback, 0);
};

