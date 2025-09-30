const path = require('path');
const { createRequestHandler } = require('@netlify/remix-adapter');

const BUILD_PATH = path.resolve(__dirname, '../../build/server');

function getBuild() {
  return require(BUILD_PATH);
}

exports.handler = createRequestHandler({
  build: getBuild,
  mode: process.env.NODE_ENV || 'production',
});
