import { AppError } from '../utils/AppError.js';

export class MotoristasService {
  constructor(repository, entregasRepository) {
    this.repository = repository; // injetado
    this.entregasRepository = entregasRepository; // injetado, pra listar entregas do motorista
  }

  async listar() {
    return this.repository.listarTodos();
  }

  async buscarPorId(id) {
    const motorista = await this.repository.buscarPorId(id);
    if (!motorista) throw new AppError('Motorista não encontrado', 404);
    return motorista;
  }

  async criar({ nome, cpf }) {
    if (!nome || !cpf) {
      throw new AppError('nome e cpf são obrigatórios', 400);
    }

    const existente = await this.repository.buscarPorCpf(cpf);
    if (existente) throw new AppError('CPF já cadastrado', 409);

    return this.repository.criar({ nome, cpf, status: 'ATIVO' });
  }

  async listarEntregas(id) {
    await this.buscarPorId(id);
    return this.entregasRepository.listarPorMotorista(id);
  }
}
