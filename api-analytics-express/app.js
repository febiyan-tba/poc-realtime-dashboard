// Import statements //
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require("lodash");
// Import: socket.io
const io = require("./app-io");
// Import: routes
const index = require('./routes/');
const transactions = require('./routes/transactions/');
// Config
const config = require('./app-config');

// Initialize Middlewares //
var app = express();
// Initialize: Basic stuffs
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Initialize: JWT Authentication
const auth = require("./app-auth");
app.use(auth.initialize());
// Initialize: Sockets
app.io = io;

// Initialize: Modify headers to allow cross origin request
// Initialize: attach socket IO in the request object to share it with route handlers
app.use(function(req, res, next) {
  // Allow cross origin request
  res.header("Access-Control-Allow-Origin", "*");
  // Allow bearer token in the Authorization
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Share socket io to routes
  req.io = io;
  next();
 });

// Routes and Handlers //no
app.use('/', index);
app.use('/transactions', transactions);

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
