var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Router = require('./routes/router');
var logger = require('morgan');

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(logger("dev"), function (req, res, next) {
  next();
});
app.use(logger(":remote-addr"));

app.use('/', Router);

app.listen(process.env.PORT||3000, function () {
  console.log('app listening on port 3000!')
});

