module.exports = function (res, next) {
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

