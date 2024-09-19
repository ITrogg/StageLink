const AbstractRepository = require("./AbstractRepository");

class TagRepository extends AbstractRepository {
  constructor() {
    super({ table: "tag" });
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async readByArtist(artistId) {
    const [rows] = await this.database.query(
      `SELECT t.label, t.id FROM ${this.table} AS t JOIN artist_Tag AS a ON t.id = a.tag_id WHERE a.artist_id=?`,
      [artistId]
    );
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(label) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (label) VALUES (?)`,
      [label]
    );
    return result.insertId;
  }
}

module.exports = TagRepository;
