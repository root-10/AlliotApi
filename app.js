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

app.use('/', indexRouter);
app.use('/v1', routes);
app.use(error404Handler);
app.use(errorHandler);

module.exports = app;