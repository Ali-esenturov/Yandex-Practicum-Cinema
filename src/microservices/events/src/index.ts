import express from 'express';

import router from './routes.js';
import { connectKafka } from './kafka.js';
import { configs } from './config.js';


const PORT = configs.PORT;

const app = express();
app.use(express.json());
app.use('/api/events', router);

app.listen(PORT, async () => {
  console.log(`Events service running on port ${PORT}`);
  try {
    await connectKafka();
    console.log('Kafka producer & consumer connected');
  } catch (err) {
    console.error('Failed to connect Kafka:', err);
    process.exit(1);
  }
});
