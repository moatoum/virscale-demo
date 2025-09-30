const { createRequestHandler } = require('@netlify/remix-adapter');

exports.handler = createRequestHandler({
  build: require('../../build/server'),
  mode: process.env.NODE_ENV || 'production',
});
