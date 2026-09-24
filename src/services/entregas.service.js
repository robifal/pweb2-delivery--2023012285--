import { AppError } from '../utils/AppError.js';

// ordem dos status pra avançar
const PROXIMO_STATUS = {
  CRIADA: 'EM_TRANSITO',
  EM_TRANSITO: 'ENTREGUE'
}

export class EntregasService {
  constructor(repository) {
    this.repository = repository; // injetado
  }

  async listar(status) {
    if (status) return this.repository.listarPorStatus(status);
    return this.repository.listarTodos();
  }

  async buscarPorId(id) {
    const entrega = await this.repository.buscarPorId(id);
    if (!entrega) throw new AppError('Entrega não encontrada', 404);
    return entrega;
  }

  async criar({ descricao, origem, destino }) {
    if (!descricao || !origem || !destino) {
      throw new AppError('descricao, origem e destino são obrigatórios', 400);
    }

    if (origem === destino) {
      throw new AppError('Origem e destino não podem ser iguais', 400)
    }

    // nao pode ter duas iguais ativas
    const iguais = await this.repository.buscarPorDados(descricao, origem, destino);
    const temAtiva = iguais.some((e) => e.status !== 'ENTREGUE' && e.status !== 'CANCELADA');
    if (temAtiva) throw new AppError('Já existe uma entrega ativa com esses dados', 409);

    return this.repository.criar({
      descricao,
      origem,
      destino,
      status: 'CRIADA',
      motoristaId: null,
      historico: [{ data: new Date().toISOString(), descricao: 'Entrega criada' }]
    });
  }

  async avancar(id) {
    const entrega = await this.buscarPorId(id);

    const novoStatus = PROXIMO_STATUS[entrega.status];
    if (!novoStatus) {
      throw new AppError(`Não é possível avançar uma entrega ${entrega.status}`, 422);
    }

    const historico = [...entrega.historico, {
      data: new Date().toISOString(),
      descricao: `Status alterado para ${novoStatus}`
    }];

    return this.repository.atualizar(id, { status: novoStatus, historico });
  }

  async cancelar(id) {
    const entrega = await this.buscarPorId(id);

    if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
      throw new AppError(`Não é possível cancelar uma entrega ${entrega.status}`, 422)
    }

    const historico = [...entrega.historico, {
      data: new Date().toISOString(),
      descricao: 'Entrega cancelada'
    }];

    return this.repository.atualizar(id, { status: 'CANCELADA', historico });
  }

  async historico(id) {
    const entrega = await this.buscarPorId(id);
    return entrega.historico;
  }
}
