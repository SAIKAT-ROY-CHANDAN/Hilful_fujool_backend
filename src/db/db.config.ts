import { PrismaClient } from '@prisma/client';
import config from '../app/config';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.databaseUrl,
    },
  },
});

export default prisma;

