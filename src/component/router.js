const { Router } = require('express');
const joiMiddleware = require('../config/joiMiddleware');
const schemas = require('./schemas');
const Component = require('.');

const router = Router();

router.get(
  '/searchGiphs',
  joiMiddleware(schemas.formValidation),
  Component.getGiphs,
);

router.get('/searchGiphsPage', Component.getGiphsPage);

module.exports = router;
