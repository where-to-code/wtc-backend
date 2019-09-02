const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const locationRouter = require('../locations/index');
const userRouter = require('../users/index');

const server = express();
server.use(express.json());
server.use(cors({ origin: [`${process.env.FRONT_URL}`,'http://localhost:3000' ,'https://wheretocode-frontend.herokuapp.com'], credentials: true }));
server.use(cookieParser());
server.use(helmet());
server.use(express.urlencoded({ extended: true }));

server.use(compression());
server.use(logger('dev'));

server.get('/', (req, res) =>
  res.status(200).json({
    status: 200,
    message: 'The Where-to-Code Server is up!',
  }),
);

server.use('/api', locationRouter);
server.use('/api', userRouter);

server.use('*', (req, res) =>
  res.status(404).json({
    status: 404,
    message: 'No endpoint matches that URL.',
  }),
);

module.exports = server;
