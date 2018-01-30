// Import statements //
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require("lodash");
// Import: routes
const index = require('./routes/');
const users = require('./routes/users/');
const tokens = require('./routes/tokens/');

// Initialize Middlewares //
const app = express();
// Initialize: Basic stuffs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Initialize: JWT Authentication
const auth = require("./app-auth");
app.use(auth.initialize());
// Initialize: Modify headers to allow cross origin request
app.use(function(req, res, next) {
  // Allow cross origin request
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Bearer");
  next();
 });

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/tokens', tokens)

/** Error Handling */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  // render the error page
  res.status(err.status || 501);
  res.send(err);
});

module.exports = app;
