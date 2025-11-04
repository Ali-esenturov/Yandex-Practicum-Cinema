import express from "express";

import { configs } from './config.js';
import { moviesProxyHandler } from './proxy-router.js';

const app = express();
const port = configs.PORT;

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use(moviesProxyHandler);

app.listen(port, () => {
  console.log(`Proxy service running on port ${port}`);
});
