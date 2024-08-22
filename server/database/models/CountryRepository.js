const AbstractRepository = require("./AbstractRepository");

class CountryRepository extends AbstractRepository {
  constructor() {
    super({ table: "Country" });
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async create(label) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (label) VALUES (?)`,
      [label]
    );
    return result.insertId;
  }
}

module.exports = CountryRepository;
