// @ts-nocheck
import { createRequestHandler } from '@netlify/remix-edge-adapter';
// @ts-ignore
import * as build from '../../build/server/index.js';

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export const config = { path: '/*' };
