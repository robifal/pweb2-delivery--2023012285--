// "banco" em memoria, quando reiniciar o servidor perde tudo
export class Database {
   constructor() {
      this.entregas = [];
      this.proximoIdEntrega = 1
   }
}
