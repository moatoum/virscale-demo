// @ts-ignore
import { createRequestHandler } from '@netlify/remix-adapter';
// @ts-ignore
import * as build from '../../build/server/index.js';

export const handler = createRequestHandler({
  build,
  getLoadContext: async () => ({}),
});
