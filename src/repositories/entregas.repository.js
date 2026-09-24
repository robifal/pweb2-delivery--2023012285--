// aqui é so acesso aos dados, nada de regra
export class EntregasRepository {
  constructor(database) {
    this.db = database;
  }

  async listarTodos() {
    return this.db.entregas
  }

  async listarPorStatus(status) {
    return this.db.entregas.filter((e) => e.status === status);
  }

  async buscarPorId(id) {
    return this.db.entregas.find((e) => e.id === id) ?? null;
  }

  async buscarPorDados(descricao, origem, destino) {
    return this.db.entregas.filter((e) =>
      e.descricao === descricao && e.origem === origem && e.destino === destino
    );
  }

  async criar(dados) {
    const nova = { id: this.db.proximoIdEntrega++, ...dados };
    this.db.entregas.push(nova);
    return nova;
  }

  async atualizar(id, dados) {
    const i = this.db.entregas.findIndex((e) => e.id === id);
    if (i === -1) return null;
    this.db.entregas[i] = { ...this.db.entregas[i], ...dados, id };
    return this.db.entregas[i]
  }
}
