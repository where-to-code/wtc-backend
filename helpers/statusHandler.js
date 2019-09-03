module.exports = (res, status, data) => {
  const statusCodes = {
    200: 'data',
    201: 'data',
    400: 'message',
    401: 'message',
    404: 'message',
    403: 'message',
    500: 'error',
  };

  res.status(status).json({
    status,
    [statusCodes[status]]: data,
  });
};
