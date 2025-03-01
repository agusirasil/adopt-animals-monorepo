import { Application } from 'express';
import animalRouter from './api/controllers/animal/router';
export default function routes(app: Application): void {
  app.use('/api/v1/animals', animalRouter);
};