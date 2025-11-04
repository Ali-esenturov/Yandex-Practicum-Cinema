import type { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { configs } from './config.js';

const monolithProxy = createProxyMiddleware({
  target: configs.MONOLITH_URL,
  changeOrigin: true,
});

const moviesProxy = createProxyMiddleware({
  target: configs.MOVIES_SERVICE_URL,
  changeOrigin: true,
});

export const moviesProxyHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.path.startsWith('/api/movies')) {
    return monolithProxy(req, res, next);
  }

  if (!configs.GRADUAL_MIGRATION) {
    return monolithProxy(req, res, next);
  }

  const random = Math.random() * 100;
  const goToMicroservice = random < configs.MOVIES_MIGRATION_PERCENT;

  if (goToMicroservice) {
    console.log(`Routed to movies service (${random.toFixed(1)}%)`);
    return moviesProxy(req, res, next);
  }

  console.log(`Routed to monolith (${random.toFixed(1)}%)`);
  return monolithProxy(req, res, next);
};
