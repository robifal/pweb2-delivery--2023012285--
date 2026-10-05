// controller so pega do req e manda pro service
export class MotoristasController {
  constructor(service) {
    this.service = service;

    // precisa do bind se nao o this fica undefined no express
    this.listar = this.listar.bind(this);
    this.buscarPorId = this.buscarPorId.bind(this);
    this.criar = this.criar.bind(this);
    this.listarEntregas = this.listarEntregas.bind(this)
  }

  async listar(req, res, next) {
    try {
      const motoristas = await this.service.listar();
      res.json(motoristas);
    } catch (err) { next(err) }
  }

  async buscarPorId(req, res, next) {
    try {
      const motorista = await this.service.buscarPorId(Number(req.params.id));
      res.json(motorista);
    } catch (err) { next(err) }
  }

  async criar(req, res, next) {
    try {
      const novo = await this.service.criar(req.body || {});
      res.status(201).json(novo);
    } catch (err) { next(err) }
  }

  async listarEntregas(req, res, next) {
    try {
      const entregas = await this.service.listarEntregas(Number(req.params.id));
      res.json(entregas);
    } catch (err) { next(err) }
  }
}
