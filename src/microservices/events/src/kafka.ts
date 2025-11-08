import { Kafka, logLevel } from 'kafkajs';

import { configs } from './config.js';

const brokers = configs.KAFKA_BROKERS?.split(',') || ['localhost:9092'];
const kafka = new Kafka({ clientId: 'events-service', brokers, logLevel: logLevel.INFO });

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'events-service-group' });

export async function connectKafka() {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: /^.*$/, fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Consumed message from ${topic}: ${message.value?.toString()}`);
    },
  });
}
