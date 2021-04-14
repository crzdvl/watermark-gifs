const express = require('express');
const middleware = require('../config/middleware');
const routes = require('../config/router');

const app = express();

middleware.init(app);

routes.init(app);

app.set('port', 3000);

module.exports = app;
