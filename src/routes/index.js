import { Router } from 'express';
import entregasRoutes from './entregas.routes.js';

export function criarRotas() {
  const router = Router();
  router.use('/entregas', entregasRoutes);
  return router
}
