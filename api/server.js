const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');
const { notFound, errorHandling } = require('./middleware')
const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);
server.use("*", notFound)
server.use(errorHandling)
module.exports = server;