const createError = require('http-errors');

module.exports.error404Handler = (req, res, next) => {
  next(createError(404));
};

module.exports.errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.status(err.status || 500);
  res.send({ message: err.message });
};