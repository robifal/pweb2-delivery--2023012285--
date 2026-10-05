// aqui é so acesso aos dados, nada de regra
export class MotoristasRepository {
  constructor(database) {
    this.db = database;
  }

  async listarTodos() {
    return this.db.motoristas
  }

  async buscarPorId(id) {
    return this.db.motoristas.find((m) => m.id === id) ?? null;
  }

  async buscarPorCpf(cpf) {
    return this.db.motoristas.find((m) => m.cpf === cpf) ?? null;
  }

  async criar(dados) {
    const novo = { id: this.db.proximoIdMotorista++, ...dados };
    this.db.motoristas.push(novo);
    return novo;
  }
}
