const http = require('http');
const fsExtra = require('fs-extra');
const cron = require('node-cron');
const events = require('./events');
const server = require('./server');

cron.schedule('*/5 * * * *', () => fsExtra.emptyDirSync('./src/public/store/'));

const port = server.get('port');

events.bind(http.createServer(server).listen(port), port);
