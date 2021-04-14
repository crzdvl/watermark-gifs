const handleError = (error, req, res) =>
  res.status(500).json({
    message: error.name,
    details: error.message,
  });

module.exports = {
  handleError,
};
