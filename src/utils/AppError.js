// erro personalizado pra mandar o status junto
export class AppError extends Error {
  constructor(mensagem, status = 400) {
    super(mensagem)
    this.status = status;
  }
}
