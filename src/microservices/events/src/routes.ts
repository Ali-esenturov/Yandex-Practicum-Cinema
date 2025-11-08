import { Router } from 'express';

import { producer } from './kafka.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: true });
});

router.post('/movie', async (req, res) => {
  const event = req.body;
  await producer.send({ topic: 'movie-events', messages: [{ value: JSON.stringify(event) }] });
  res.status(201).json({ status: 'success' });
});

router.post('/user', async (req, res) => {
  const event = req.body;
  await producer.send({ topic: 'user-events', messages: [{ value: JSON.stringify(event) }] });
  res.status(201).json({ status: 'success' });
});

router.post('/payment', async (req, res) => {
  const event = req.body;
  await producer.send({ topic: 'payment-events', messages: [{ value: JSON.stringify(event) }] });
  res.status(201).json({ status: 'success' });
});

export default router;
