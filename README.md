# Delivery Tracker API

Atividade 05 - Programação Web II (IFAL Maceió)

API pra rastrear entregas, feita em camadas (controller -> service -> repository). Os dados ficam em memória, então quando reinicia o servidor apaga tudo.

## Como rodar

```bash
npm install
npm start
```

Sobe em http://localhost:3000 (ou na porta do `PORT` se tiver definida).

Pra rodar o autograder, com o servidor ligado, em outro terminal:

```bash
npm run check
```

## Estrutura

```
src/
├── controllers/   entregas.controller.js  -> recebe req e chama o service
├── services/      entregas.service.js     -> regras de negocio
├── repositories/  entregas.repository.js  -> acesso aos dados
├── database/      Database.js             -> arrays em memoria
├── routes/        entregas.routes.js      -> composição (injeção de dependencia)
└── utils/         AppError.js, errorHandler.js
```

## Exemplos (curl)

Health check
```bash
curl http://localhost:3000/api/health
```

Criar entrega
```bash
curl -X POST http://localhost:3000/api/entregas \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Caixa de livros", "origem": "Maceió", "destino": "Arapiraca"}'
```

Listar todas / filtrar por status
```bash
curl http://localhost:3000/api/entregas
curl "http://localhost:3000/api/entregas?status=EM_TRANSITO"
```

Buscar por id
```bash
curl http://localhost:3000/api/entregas/1
```

Avançar status (CRIADA -> EM_TRANSITO -> ENTREGUE)
```bash
curl -X PATCH http://localhost:3000/api/entregas/1/avancar
```

Cancelar
```bash
curl -X PATCH http://localhost:3000/api/entregas/1/cancelar
```

Ver histórico
```bash
curl http://localhost:3000/api/entregas/1/historico
```

## Erros

Sempre volta `{ "erro": "mensagem" }`:
- 400 campo faltando ou origem igual ao destino
- 404 entrega não existe
- 409 ja tem uma entrega ativa igual
- 422 transição de status invalida
