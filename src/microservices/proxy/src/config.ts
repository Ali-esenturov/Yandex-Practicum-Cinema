import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  GRADUAL_MIGRATION: z.coerce.boolean().default(false),
  MOVIES_MIGRATION_PERCENT: z.coerce.number().default(50),

  MONOLITH_URL: z.string().nonempty(),
  MOVIES_SERVICE_URL: z.string().nonempty(),
  EVENTS_SERVICE_URL: z.string().nonempty(),
});

const parsedConfigs = envSchema.parse(process.env);

console.log(`parsed configs: ${JSON.stringify(parsedConfigs)}`);

export const configs = parsedConfigs;
