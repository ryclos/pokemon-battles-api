import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  uri: process.env.MONGO_URL || 'mongodb://localhost:27017/pokemon-battles',
}));
