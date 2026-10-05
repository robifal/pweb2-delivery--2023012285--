import { Router } from 'express';
import entregasRoutes from './entregas.routes.js';
import motoristasRoutes from './motoristas.routes.js';

export function criarRotas() {
  const router = Router();
  router.use('/entregas', entregasRoutes);
  router.use('/motoristas', motoristasRoutes);
  return router
}
