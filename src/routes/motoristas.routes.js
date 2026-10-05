import { Router } from 'express';
import { database } from '../database/database.js';
import { MotoristasRepository } from '../repositories/motoristas.repository.js';
import { EntregasRepository } from '../repositories/entregas.repository.js';
import { MotoristasService } from '../services/motoristas.service.js';
import { MotoristasController } from '../controllers/motoristas.controller.js';

// composition root - so aqui que tem new
const repository = new MotoristasRepository(database);
const entregasRepository = new EntregasRepository(database);
const service = new MotoristasService(repository, entregasRepository);
const controller = new MotoristasController(service);

const router = Router();

router.get('/', controller.listar);
router.post('/', controller.criar);
router.get('/:id', controller.buscarPorId);
router.get('/:id/entregas', controller.listarEntregas);

export default router;
