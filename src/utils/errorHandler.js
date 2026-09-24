import { AppError } from './AppError.js';

// middleware de erro, tem que ter os 4 parametros
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ erro: err.message });
  }

  // json mal formatado no body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido' })
  }

  console.log(err);
  res.status(500).json({ erro: 'Erro interno no servidor' });
}
