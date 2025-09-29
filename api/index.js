import { createRequestHandler } from '@remix-run/vercel';

let handler;

export default async function (request, response) {
  if (!handler) {
    const build = await import('../build/server/index.js');
    handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV,
    });
  }
  return handler(request, response);
};