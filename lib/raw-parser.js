module.exports = function (res, next) {
  res.data = res.body;

  return next();
};

