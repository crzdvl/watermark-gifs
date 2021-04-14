const express = require('express');

const Router = require('../component/router');

const { handleError } = require('../error/handleError');

module.exports = {
  init(app) {
    const router = express.Router();

    app.use('/v1/', Router);

    app.use((err, req, res, next) => {
      handleError(err, req, res);
    });

    app.use((req, res) => {
      res.render('error.ejs');
    });

    app.use(router);
  },
};
