const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');

const { error404Handler, errorHandler } = require('./middleware');
const indexRouter = require('./routes/index');
const routes = require('./routes');

const app = express();
app.use(logger(config.get('logger')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
  next();
});

app.use('/', indexRouter);
app.use('/v1', routes);
app.use(error404Handler);
app.use(errorHandler);

module.exports = app;