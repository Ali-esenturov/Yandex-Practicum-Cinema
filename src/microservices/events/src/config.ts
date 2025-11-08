import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8082),
  KAFKA_BROKERS: z.string().nonempty(),
});

const parsedConfigs = envSchema.parse(process.env);

console.log(`parsed configs: ${JSON.stringify(parsedConfigs)}`);

export const configs = parsedConfigs;
