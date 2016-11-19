var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.set('env', process.env.NODE_ENV || "development");
console.log('server environment: ' + app.get('env') )

