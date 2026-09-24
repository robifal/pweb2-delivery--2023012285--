import { Router } from 'express';
import { Database } from '../database/database.js';
import { EntregasRepository } from '../repositories/entregas.repository.js';
import { EntregasService } from '../services/entregas.service.js';
import { EntregasController } from '../controllers/entregas.controller.js';

// composition root - so aqui que tem new
const database = new Database();
const repository = new EntregasRepository(database);
const service = new EntregasService(repository);
const controller = new EntregasController(service);

const router = Router();

router.get('/', controller.listar);
router.post('/', controller.criar);
router.get('/:id', controller.buscarPorId);
router.get('/:id/historico', controller.historico);
router.patch('/:id/avancar', controller.avancar);
router.patch('/:id/cancelar', controller.cancelar);

export default router;
