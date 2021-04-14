function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bindPort = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bindPort} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bindPort} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = this.address();
  const bindPort =
    typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${bindPort}`);
}

function bind(Server, port) {
  Server.on('error', (error) => this.onError(error, port));
  Server.on('listening', this.onListening.bind(Server));
}

module.exports = {
  onError,
  onListening,
  bind,
};
