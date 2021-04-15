const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');

module.exports = {
  init(app) {
    require('dotenv').config();
    app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS ',
      );
      res.header('Access-Control-Allow-Credentials', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,' +
          ' Content-Type, Accept,' +
          ' Authorization,' +
          ' Access-Control-Allow-Credentials',
      );
      next();
    });
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(
      session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
      }),
    );
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(flash());
    app.set('views', './src/views');
    app.set('view engine', 'ejs');
    app.use(express.static(`${__dirname}/../public`));
  },
};
