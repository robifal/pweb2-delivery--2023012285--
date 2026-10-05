// "banco" em memoria, quando reiniciar o servidor perde tudo
export class Database {
   constructor() {
      this.entregas = [];
      this.proximoIdEntrega = 1
      this.motoristas = [];
      this.proximoIdMotorista = 1
   }
}

// singleton - entregas e motoristas tem que compartilhar o mesmo "banco"
export const database = new Database();
