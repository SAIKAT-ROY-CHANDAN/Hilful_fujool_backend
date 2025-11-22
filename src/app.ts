import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './app/config';
import notFoundRoute from './app/middlewares/notFoundRoutes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import bodyParser from 'body-parser';
import router from './app/routes';
import { seedSuperAdmin } from './app/seed/seed-admin';

const app: Application = express();

// middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Hilful Fujool running successfully 🚀',
  });
});

// routes
app.use('/api/v1', router);

app.use(notFoundRoute);
app.use(globalErrorHandler);

app.listen(config.port, () => {
  seedSuperAdmin()
  console.log(`Server is running on http://localhost:${config.port}`);
});

