// controller so pega do req e manda pro service
export class EntregasController {
  constructor(service) {
    this.service = service;

    // precisa do bind se nao o this fica undefined no express
    this.listar = this.listar.bind(this);
    this.buscarPorId = this.buscarPorId.bind(this);
    this.criar = this.criar.bind(this);
    this.avancar = this.avancar.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.historico = this.historico.bind(this)
  }

  async listar(req, res, next) {
    try {
      const entregas = await this.service.listar(req.query.status);
      res.json(entregas);
    } catch (err) { next(err) }
  }

  async buscarPorId(req, res, next) {
    try {
      const entrega = await this.service.buscarPorId(Number(req.params.id));
      res.json(entrega);
    } catch (err) { next(err) }
  }

  async criar(req, res, next) {
    try {
      const nova = await this.service.criar(req.body || {});
      res.status(201).json(nova);
    } catch (err) { next(err) }
  }

  async avancar(req, res, next) {
    try {
      const entrega = await this.service.avancar(Number(req.params.id));
      res.json(entrega);
    } catch (err) { next(err) }
  }

  async cancelar(req, res, next) {
    try {
      const entrega = await this.service.cancelar(Number(req.params.id));
      res.json(entrega);
    } catch (err) { next(err) }
  }

  async historico(req, res, next) {
    try {
      const eventos = await this.service.historico(Number(req.params.id));
      res.json(eventos);
    } catch (err) { next(err) }
  }
}
