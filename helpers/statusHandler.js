const statusHandler = (res, status, data) =>
  res.status(status).json({
    status,
    info: data,
  });

module.exports = statusHandler;
