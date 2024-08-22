const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "User" });
  }

  // Nouvel·le utilisateur·ice
  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, password) values (?, ?, ?)`,
      [user.username, user.email, user.password]
    );
    return result.insertId;
  }

  // Recherche selon email
  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }
}

module.exports = UserRepository;
